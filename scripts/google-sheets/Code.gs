/**
 * ЗІРКА · таблиця заявок (Google Apps Script, привʼязаний до Google Таблиці).
 *
 * setup()  — один раз будує аркуші «Заявки», «Звіт», «Довідники».
 * doPost() — вебхук, який викликає сайт (src/lib/googleSheets.ts) на кожну заявку.
 *
 * Секрет зберігається у Script Properties під ключем LEADS_SECRET
 * і має збігатися з GOOGLE_SHEETS_SECRET на сайті.
 */

const LEADS = 'Заявки';
const REPORT = 'Звіт';
const LISTS_SHEET = 'Довідники';
const LIST_ROWS = 30;

const NAVY = '#1f2a44';
const GOLD = '#c9a227';

const LISTS = {
  Статуси: [
    'Нова',
    'В роботі',
    'Не додзвонились',
    'Показ призначено',
    'Бронювання',
    'Угода',
    'Відмова',
  ],
  Джерела: [
    'Сайт — форма',
    'Дзвінок',
    'Instagram',
    'Facebook',
    'Рекомендація',
    'Офіс продажів',
    'Інше',
  ],
  Проєкти: ['ЖК на Вишневій', 'ЖК на Хотинській', 'Ще не визначився'],
  'Що цікавить': [
    '1-кімнатна',
    '2-кімнатна',
    '3-кімнатна',
    '4+ кімнат',
    'Паркомісце',
    'Комерційне приміщення',
  ],
  Менеджери: ['Менеджер 1', 'Менеджер 2', 'Менеджер 3'],
  'Причини відмови': [
    'Дорого',
    'Не підійшло планування',
    'Не підійшла локація',
    'Купили в іншому місці',
    'Відклали покупку',
    'Не виходять на звʼязок',
    'Інше',
  ],
};
const LIST_NAMES = Object.keys(LISTS);

// [header, width, kind]; kind "list:<name>" → dropdown from Довідники.
const COLUMNS = [
  ['№', 50, 'num'],
  ['Дата заявки', 130, 'datetime'],
  ['Імʼя *', 120, 'text'],
  ['Прізвище', 120, 'text'],
  ['Телефон *', 140, 'text'],
  ['Email', 180, 'text'],
  ['Повідомлення з форми', 280, 'wrap'],
  ['Джерело', 130, 'list:Джерела'],
  ['Проєкт', 150, 'list:Проєкти'],
  ['Що цікавить', 160, 'list:Що цікавить'],
  ['Бюджет, $', 100, 'money'],
  ['Статус', 150, 'list:Статуси'],
  ['Менеджер', 120, 'list:Менеджери'],
  ['Наступний контакт', 120, 'date'],
  ['Дата угоди', 100, 'date'],
  ['Сума угоди, $', 110, 'money'],
  ['Причина відмови', 170, 'list:Причини відмови'],
  ['Коментар менеджера', 300, 'wrap'],
];
const C = {
  num: 1,
  date: 2,
  first: 3,
  last: 4,
  phone: 5,
  email: 6,
  msg: 7,
  source: 8,
  project: 9,
  rooms: 10,
  budget: 11,
  status: 12,
  manager: 13,
  next: 14,
  dealDate: 15,
  dealSum: 16,
};

// ---------------------------------------------------------------- webhook

// Bump on every change: GET <web app URL> shows which version is actually deployed.
const VERSION = 3;

function doGet() {
  return json({ ok: true, version: VERSION });
}

function doPost(e) {
  let lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad json' });
  }

  const secret = PropertiesService.getScriptProperties().getProperty('LEADS_SECRET');
  if (!secret || lead.secret !== secret) {
    return json({ ok: false, error: 'unauthorized' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActive().getSheetByName(LEADS);
    if (!sheet) return json({ ok: false, error: 'run setup() first' });
    const row = firstEmptyRow(sheet);
    // Leading apostrophe keeps a visitor's "=..." as text instead of a live formula.
    const text = [lead.firstName, lead.lastName, lead.phone, lead.email, lead.message]
      .map(clean)
      .map((v) => (v.startsWith('=') ? "'" + v : v));

    sheet.getRange(row, C.first, 1, 5).setNumberFormat('@').setValues([text]);
    sheet
      .getRange(row, C.date)
      .setValue(lead.submittedAt ? new Date(lead.submittedAt) : new Date());
    sheet.getRange(row, C.source).setValue(clean(lead.source) || 'Сайт — форма');
    sheet.getRange(row, C.status).setValue('Нова');
    sheet.getRange(row, C.num).setValue(nextNumber(sheet));
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true, version: VERSION });
}

function clean(value) {
  return typeof value === 'string' ? value.trim().slice(0, 2000) : '';
}

/** Next lead number: max existing № + 1, so numbers survive sorting and deletions. */
function nextNumber(sheet) {
  const values = sheet.getRange(2, C.num, sheet.getMaxRows() - 1, 1).getValues();
  return values.reduce((max, [v]) => (typeof v === 'number' && v > max ? v : max), 0) + 1;
}

/** Simple trigger: numbers leads typed in by hand (script writes don't fire it). */
function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== LEADS) return;
  const first = Math.max(2, e.range.getRow());
  const last = e.range.getLastRow();
  if (last < first) return;
  const rows = sheet.getRange(first, 1, last - first + 1, C.phone).getValues();
  let next = null;
  rows.forEach((r, i) => {
    if (r[C.num - 1] === '' && (r[C.first - 1] !== '' || r[C.phone - 1] !== '')) {
      next = next ?? nextNumber(sheet);
      sheet.getRange(first + i, C.num).setValue(next++);
    }
  });
}

/** Rebuilds «Звіт» and the highlight rules without touching the leads themselves. */
function repair() {
  const ss = SpreadsheetApp.getActive();
  detectSeparator(ss);
  step(ss, 'Перебудовую звіт…');
  buildReport(ss);
  applyLeadRules(ss.getSheetByName(LEADS));
  ss.setActiveSheet(ss.getSheetByName(LEADS));
  fixNumbers();
  step(ss, 'Готово ✅ Звіт і підсвітка оновлені');
}

/** Renumbers all existing leads 1..N top to bottom (replaces the old № formula). */
function fixNumbers() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(LEADS);
  const n = sheet.getMaxRows() - 1;
  const rows = sheet.getRange(2, 1, n, C.phone).getValues();
  let k = 0;
  const nums = rows.map((r) => [r[C.first - 1] !== '' || r[C.phone - 1] !== '' ? ++k : '']);
  sheet.getRange(2, C.num, n, 1).clearContent().setValues(nums);
  step(ss, `Пронумеровано заявок: ${String(k)}`);
}

/** First row with empty Імʼя and Телефон, growing the sheet when it is full. */
function firstEmptyRow(sheet) {
  const max = sheet.getMaxRows();
  const values = sheet.getRange(2, C.first, max - 1, 3).getValues();
  const idx = values.findIndex((r) => r[0] === '' && r[2] === '');
  if (idx !== -1) return idx + 2;
  sheet.insertRowsAfter(max, 500);
  return max + 1;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// ---------------------------------------------------------------- setup

// Argument separator the spreadsheet expects: "," (en) or ";" (uk, de, …).
let SEP = ',';

/** Finds the separator by test-evaluating =SUM(1,2) on a scratch sheet. */
function detectSeparator(ss) {
  const tmp = ss.insertSheet('_sep_test');
  tmp.getRange('A1').setFormula('=SUM(1,2)');
  SpreadsheetApp.flush();
  SEP = tmp.getRange('A1').getValue() === 3 ? ',' : ';';
  ss.deleteSheet(tmp);
  Logger.log('Роздільник аргументів формул: ' + SEP);
}

/** Rewrites a formula written with "," for the detected separator (quoted text untouched). */
function fx(formula) {
  if (SEP === ',') return formula;
  let out = '';
  let quoted = false;
  for (const ch of formula) {
    if (ch === '"') quoted = !quoted;
    out += !quoted && ch === ',' ? SEP : ch;
  }
  return out;
}

/** Adds a «Зірка» menu so setup can be run straight from the spreadsheet. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Зірка')
    .addItem('Налаштувати таблицю', 'setup')
    .addItem('Виправити звіт і підсвітку', 'repair')
    .addItem('Перенумерувати заявки', 'fixNumbers')
    .addItem('Показати секрет для сайту', 'showSecret')
    .addToUi();
}

function showSecret() {
  const secret = PropertiesService.getScriptProperties().getProperty('LEADS_SECRET');
  SpreadsheetApp.getUi().alert(
    secret ? 'GOOGLE_SHEETS_SECRET=' + secret : 'Секрету ще немає — спочатку запустіть setup.',
  );
}

function step(ss, message) {
  Logger.log(message);
  ss.toast(message, 'Зірка', 5);
  SpreadsheetApp.flush();
}

function setup() {
  const ss = SpreadsheetApp.getActive();
  if (!ss) {
    throw new Error(
      'Скрипт не привʼязаний до таблиці. Відкрийте таблицю → Розширення → Apps Script і вставте код там.',
    );
  }
  ss.setSpreadsheetTimeZone('Europe/Kyiv');
  detectSeparator(ss);

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('LEADS_SECRET')) {
    props.setProperty('LEADS_SECRET', Utilities.getUuid().replace(/-/g, ''));
  }

  step(ss, '1/3 Довідники…');
  const lists = buildLists(ss);
  step(ss, '2/3 Заявки…');
  const leads = buildLeads(ss, lists);
  step(ss, '3/3 Звіт…');
  buildReport(ss);

  ss.setActiveSheet(leads);
  ss.moveActiveSheet(1);
  ss.getSheets()
    .filter((s) => ![LEADS, REPORT, LISTS_SHEET].includes(s.getName()) && s.getLastRow() === 0)
    .forEach((s) => ss.deleteSheet(s));

  step(ss, 'Готово ✅');
  Logger.log('GOOGLE_SHEETS_SECRET = ' + props.getProperty('LEADS_SECRET'));
}

function recreate(ss, name) {
  const old = ss.getSheetByName(name);
  if (old) {
    if (
      name === LEADS &&
      old
        .getRange('C2:C')
        .getValues()
        .some((r) => r[0] !== '')
    ) {
      throw new Error('Аркуш «Заявки» вже містить дані — setup() не буде його перезаписувати.');
    }
    ss.deleteSheet(old);
  }
  return ss.insertSheet(name);
}

function buildLists(ss) {
  const sh = recreate(ss, LISTS_SHEET);
  sh.setTabColor('#9aa0aa');
  sh.getRange('A1')
    .setValue(
      'Списки для випадаючих меню. Додавайте або перейменовуйте значення тут — вони одразу зʼявляться в «Заявках» і «Звіті».',
    )
    .setFontStyle('italic')
    .setFontColor('#7a8190');
  sh.getRange(3, 1, 1, LIST_NAMES.length)
    .setValues([LIST_NAMES])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground(NAVY);
  const longest = Math.max(...LIST_NAMES.map((n) => LISTS[n].length));
  const grid = [];
  for (let r = 0; r < longest; r++) grid.push(LIST_NAMES.map((n) => LISTS[n][r] ?? ''));
  sh.getRange(4, 1, longest, LIST_NAMES.length).setValues(grid);
  sh.setColumnWidths(1, LIST_NAMES.length, 200);
  sh.getRange(4, 1, LIST_ROWS, LIST_NAMES.length).setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    '#d9dde3',
    null,
  );
  sh.setFrozenRows(3);
  return sh;
}

function listRange(lists, name) {
  return lists.getRange(4, LIST_NAMES.indexOf(name) + 1, LIST_ROWS, 1);
}

function buildLeads(ss, lists) {
  const sh = recreate(ss, LEADS);
  sh.setTabColor(NAVY);
  const rows = 1000;
  if (sh.getMaxRows() < rows + 1) sh.insertRowsAfter(sh.getMaxRows(), rows + 1 - sh.getMaxRows());
  if (sh.getMaxColumns() > COLUMNS.length)
    sh.deleteColumns(COLUMNS.length + 1, sh.getMaxColumns() - COLUMNS.length);

  const header = sh.getRange(1, 1, 1, COLUMNS.length);
  header
    .setValues([COLUMNS.map((c) => c[0])])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground(NAVY)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sh.setRowHeight(1, 40);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(5);

  const body = (col) => sh.getRange(2, col, sh.getMaxRows() - 1, 1);
  const dropdown = (range) =>
    SpreadsheetApp.newDataValidation()
      .requireValueInRange(range, true)
      .setAllowInvalid(true)
      .setHelpText('Оберіть зі списку або додайте варіант на аркуші «Довідники».')
      .build();

  COLUMNS.forEach(([, width, kind], i) => {
    const col = i + 1;
    sh.setColumnWidth(col, width);
    const r = body(col).setVerticalAlignment('top');
    if (kind === 'datetime') r.setNumberFormat('dd.MM.yyyy HH:mm');
    if (kind === 'date') {
      r.setNumberFormat('dd.MM.yyyy').setDataValidation(
        SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build(),
      );
    }
    if (kind === 'money') {
      r.setNumberFormat('#,##0 "$"').setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireNumberGreaterThanOrEqualTo(0)
          .setAllowInvalid(false)
          .build(),
      );
    }
    if (kind === 'text') r.setNumberFormat('@');
    if (kind === 'wrap') r.setNumberFormat('@').setWrap(true);
    if (kind.startsWith('list:')) r.setDataValidation(dropdown(listRange(lists, kind.slice(5))));
  });

  sh.getRange('A1').setValue('№');
  body(C.num).setHorizontalAlignment('center').setFontColor('#7a8190');

  sh.getRange(1, 1, sh.getMaxRows(), COLUMNS.length).setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    '#d9dde3',
    null,
  );
  sh.getRange(1, 1, sh.getMaxRows(), COLUMNS.length).createFilter();

  applyLeadRules(sh);
  return sh;
}

function applyLeadRules(sh) {
  const body = (col) => sh.getRange(2, col, sh.getMaxRows() - 1, 1);
  const L = (c) => sh.getRange(2, c).getA1Notation().replace(/\d+$/, '');
  const S = `$${L(C.status)}2`;
  const N = `$${L(C.next)}2`;
  const open = `AND(${S}<>"Угода",${S}<>"Відмова")`;
  const all = sh.getRange(2, 1, sh.getMaxRows() - 1, COLUMNS.length);
  const rule = () => SpreadsheetApp.newConditionalFormatRule();

  const statusColors = {
    Нова: ['#dce8fb', '#1a4fa0'],
    'В роботі': ['#fff3c4', '#7a5b00'],
    'Не додзвонились': ['#ffe0c2', '#9a4a00'],
    'Показ призначено': ['#e9defa', '#5b2c9e'],
    Бронювання: ['#d3f1ee', '#0f6b63'],
    Угода: ['#cfefd6', '#1c6b30'],
    Відмова: ['#e6e7ea', '#5a5f6a'],
  };
  const rules = [
    rule()
      .whenFormulaSatisfied(fx(`=AND(${N}<>"",${N}<TODAY(),${open})`))
      .setBackground('#f8c9c9')
      .setFontColor('#9b1c1c')
      .setBold(true)
      .setRanges([body(C.next)])
      .build(),
    rule()
      .whenFormulaSatisfied(fx(`=AND(${N}<>"",${N}=TODAY(),${open})`))
      .setBackground('#ffe8a3')
      .setFontColor('#7a5b00')
      .setBold(true)
      .setRanges([body(C.next)])
      .build(),
    rule()
      .whenFormulaSatisfied(fx(`=AND($${L(C.manager)}2="",$C2<>"")`))
      .setBackground('#fde2e2')
      .setRanges([body(C.manager)])
      .build(),
    rule()
      .whenFormulaSatisfied(fx(`=AND($E2<>"",COUNTIF($E$2:$E,$E2)>1)`))
      .setBackground('#fbd5d5')
      .setFontColor('#9b1c1c')
      .setRanges([body(C.phone)])
      .build(),
    ...Object.entries(statusColors).map(([status, [bg, fg]]) =>
      rule()
        .whenTextEqualTo(status)
        .setBackground(bg)
        .setFontColor(fg)
        .setBold(true)
        .setRanges([body(C.status)])
        .build(),
    ),
    rule()
      .whenFormulaSatisfied(fx(`=${S}="Відмова"`))
      .setFontColor('#9aa0aa')
      .setRanges([all])
      .build(),
  ];
  sh.setConditionalFormatRules(rules);
}

function buildReport(ss) {
  const sh = recreate(ss, REPORT);
  sh.setTabColor(GOLD);
  sh.setHiddenGridlines(true);
  [230, 100, 90, 20, 190, 90, 90, 110].forEach((w, i) => sh.setColumnWidth(i + 1, w));

  const col = (c) => {
    const letter = String.fromCharCode(64 + c);
    return `'${LEADS}'!$${letter}$2:$${letter}`;
  };
  const listCell = (name, i) =>
    `'${LISTS_SHEET}'!$${String.fromCharCode(65 + LIST_NAMES.indexOf(name))}$${4 + i}`;
  const section = (a1, title, span) => {
    const r = sh.getRange(a1);
    sh.getRange(r.getRow(), r.getColumn(), 1, span).setBackground(NAVY);
    r.setValue(title).setFontWeight('bold').setFontColor('#ffffff');
  };
  const muted = (range) => range.setFontWeight('bold').setFontColor('#7a8190');

  sh.getRange('A1')
    .setValue('ЗІРКА · Звіт по заявках')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(NAVY);
  sh.getRange('A2')
    .setValue('Оновлюється автоматично з аркуша «Заявки»')
    .setFontStyle('italic')
    .setFontColor('#7a8190');

  const st = col(C.status);
  section('A4', 'Загалом', 2);
  const summary = [
    ['Всього заявок', `=COUNTA(${col(C.first)})`, '0'],
    ['Сьогодні', `=COUNTIFS(${col(C.date)},">="&TODAY(),${col(C.date)},"<"&TODAY()+1)`, '0'],
    ['Цього місяця', `=COUNTIFS(${col(C.date)},">="&EOMONTH(TODAY(),-1)+1)`, '0'],
    ['Без менеджера', `=COUNTIFS(${col(C.first)},"<>",${col(C.manager)},"")`, '0'],
    [
      'Прострочені контакти',
      `=COUNTIFS(${col(C.next)},"<"&TODAY(),${st},"<>Угода",${st},"<>Відмова")`,
      '0',
    ],
    ['Угод', `=COUNTIF(${st},"Угода")`, '0'],
    ['Конверсія в угоду', '=IFERROR(B10/B5,0)', '0.0%'],
    ['Сума угод, $', `=SUM(${col(C.dealSum)})`, '#,##0 "$"'],
    ['Середній чек, $', '=IFERROR(B12/B10,0)', '#,##0 "$"'],
  ];
  sh.getRange(5, 1, summary.length, 1).setValues(summary.map((r) => [r[0]]));
  sh.getRange(5, 2, summary.length, 1)
    .setFormulas(summary.map((r) => [fx(r[1])]))
    .setNumberFormats(summary.map((r) => [r[2]]));
  sh.getRangeList(['A5:B5', 'A10:B12']).setFontWeight('bold');
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground('#f8c9c9')
      .setFontColor('#9b1c1c')
      .setRanges([sh.getRange('B8:B9')])
      .build(),
  ]);

  const breakdown = (top, c, title, listName, dataCol) => {
    const L = String.fromCharCode(64 + c);
    const N = String.fromCharCode(65 + c);
    section(`${L}${top}`, title, 3);
    muted(sh.getRange(top + 1, c + 1, 1, 2).setValues([['Кількість', 'Частка']]));
    const n = LISTS[listName].length + 2;
    const formulas = [];
    for (let i = 0; i < n; i++) {
      const r = top + 2 + i;
      formulas.push([
        `=IF(${listCell(listName, i)}="","",${listCell(listName, i)})`,
        `=IF(${L}${r}="","",COUNTIF(${col(dataCol)},${L}${r}))`,
        `=IF(${L}${r}="","",IFERROR(${N}${r}/$B$5,0))`,
      ]);
    }
    sh.getRange(top + 2, c, n, 3).setFormulas(formulas.map((r) => r.map(fx)));
    sh.getRange(top + 2, c + 2, n, 1).setNumberFormat('0%');
    return top + 1 + n;
  };

  const endStatus = breakdown(15, 1, 'За статусом', 'Статуси', C.status);
  breakdown(4, 5, 'За джерелом', 'Джерела', C.source);
  breakdown(endStatus + 2, 1, 'За проєктом', 'Проєкти', C.project);
  breakdown(15, 5, 'Що цікавить', 'Що цікавить', C.rooms);

  const mtop = 27;
  section(`E${mtop}`, 'По місяцях', 4);
  sh.getRange(`E${mtop + 1}`)
    .setValue('Рік:')
    .setFontWeight('bold');
  sh.getRange(`F${mtop + 1}`)
    .setFormula('=YEAR(TODAY())')
    .setBackground('#fff3c4')
    .setFontWeight('bold');
  sh.getRange(`G${mtop + 1}`)
    .setValue('← можна змінити')
    .setFontStyle('italic')
    .setFontColor('#7a8190');
  muted(sh.getRange(mtop + 2, 5, 1, 4).setValues([['Місяць', 'Заявок', 'Угод', 'Сума, $']]));
  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  const y = `$F$${mtop + 1}`;
  const dd = col(C.dealDate);
  const monthRows = months.map((m, i) => {
    const from = `DATE(${y},${i + 1},1)`;
    const to = `DATE(${y},${i + 2},1)`;
    return [
      m,
      `=COUNTIFS(${col(C.date)},">="&${from},${col(C.date)},"<"&${to})`,
      `=COUNTIFS(${dd},">="&${from},${dd},"<"&${to},${st},"Угода")`,
      `=SUMIFS(${col(C.dealSum)},${dd},">="&${from},${dd},"<"&${to},${st},"Угода")`,
    ];
  });
  sh.getRange(mtop + 3, 5, 12, 4).setValues(monthRows.map((r) => r.map(fx)));
  sh.getRange(mtop + 3, 8, 12, 1).setNumberFormat('#,##0 "$"');
  const tr = mtop + 15;
  sh.getRange(tr, 5, 1, 4)
    .setValues([
      [
        'Разом',
        `=SUM(F${mtop + 3}:F${mtop + 14})`,
        `=SUM(G${mtop + 3}:G${mtop + 14})`,
        `=SUM(H${mtop + 3}:H${mtop + 14})`,
      ],
    ])
    .setFontWeight('bold')
    .setBorder(true, null, null, null, null, null, NAVY, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  sh.getRange(tr, 8).setNumberFormat('#,##0 "$"');

  const top = mtop + 17;
  section(`E${top}`, 'Менеджери', 4);
  muted(sh.getRange(top + 1, 6, 1, 3).setValues([['Заявок', 'Угод', 'Конверсія']]));
  const managerRows = [];
  for (let i = 0; i < LISTS['Менеджери'].length + 3; i++) {
    const r = top + 2 + i;
    managerRows.push([
      `=IF(${listCell('Менеджери', i)}="","",${listCell('Менеджери', i)})`,
      `=IF(E${r}="","",COUNTIF(${col(C.manager)},E${r}))`,
      `=IF(E${r}="","",COUNTIFS(${col(C.manager)},E${r},${st},"Угода"))`,
      `=IF(E${r}="","",IFERROR(G${r}/F${r},0))`,
    ]);
  }
  sh.getRange(top + 2, 5, managerRows.length, 4).setFormulas(managerRows.map((r) => r.map(fx)));
  sh.getRange(top + 2, 8, managerRows.length, 1).setNumberFormat('0%');
}

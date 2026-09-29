'use server';

import { appendLeadToSheet } from '@/lib/googleSheets';
import { escapeHtml, sendTelegramMessage } from '@/lib/telegram';

export interface LeadFormState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

const MAX_FIELD = 120;
const MAX_MESSAGE = 2000;

function field(formData: FormData, name: string, max = MAX_FIELD): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// Hidden `origin` field → where the form lives; unknown values fall back to the home form.
const FORM_ORIGINS = {
  home: 'Форма «Готові до нової квартири?» · головна',
  contacts: 'Форма «Залиште номер — передзвонимо» · контакти',
} as const;
type FormOrigin = keyof typeof FORM_ORIGINS;

function formOrigin(value: string): FormOrigin {
  return Object.hasOwn(FORM_ORIGINS, value) ? (value as FormOrigin) : 'home';
}

function formatLead(lead: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  origin: FormOrigin;
}): string {
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ');
  const submittedAt = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  const lines = [
    '🏠 <b>НОВА ЗАЯВКА · ЗІРКА</b>',
    '━━━━━━━━━━━━━━━━━━',
    '',
    `👤 <b>Імʼя:</b> ${escapeHtml(fullName)}`,
    `📞 <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>`,
  ];
  if (lead.email) lines.push(`✉️ <b>Email:</b> ${escapeHtml(lead.email)}`);
  if (lead.interest) lines.push(`🎯 <b>Цікавить:</b> ${escapeHtml(lead.interest)}`);
  if (lead.message) {
    lines.push(
      '',
      '💬 <b>Повідомлення:</b>',
      `<blockquote>${escapeHtml(lead.message)}</blockquote>`,
    );
  }
  lines.push(
    '',
    '━━━━━━━━━━━━━━━━━━',
    `🕒 ${escapeHtml(submittedAt)}`,
    `📍 ${FORM_ORIGINS[lead.origin]}`,
  );
  return lines.join('\n');
}

export async function sendLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Honeypot: hidden field humans never fill. Pretend success so bots don't retry.
  if (field(formData, 'company')) {
    return { status: 'success', message: 'Дякуємо! Ми звʼяжемося з вами найближчим часом.' };
  }

  const lead = {
    firstName: field(formData, 'firstName'),
    lastName: field(formData, 'lastName'),
    phone: field(formData, 'phone', 32),
    email: field(formData, 'email'),
    interest: field(formData, 'interest'),
    message: field(formData, 'message', MAX_MESSAGE),
    origin: formOrigin(field(formData, 'origin')),
  };

  if (!lead.firstName) {
    return { status: 'error', message: 'Вкажіть, будь ласка, імʼя.' };
  }
  if (lead.phone.replace(/\D/g, '').length < 10) {
    return { status: 'error', message: 'Вкажіть коректний номер телефону.' };
  }
  if (formData.get('consent') !== 'on') {
    return { status: 'error', message: 'Потрібна згода з політикою конфіденційності.' };
  }

  // Telegram and the sheet are independent channels: the lead counts as received
  // if at least one of them got it.
  const [telegram, sheet] = await Promise.allSettled([
    sendTelegramMessage(formatLead(lead)),
    appendLeadToSheet({
      ...lead,
      // The sheet has no column for the form's topic list, so it leads the message.
      message: [lead.interest && `Цікавить: ${lead.interest}`, lead.message]
        .filter(Boolean)
        .join('\n'),
    }),
  ]);
  if (telegram.status === 'rejected') console.error('sendLead: Telegram failed', telegram.reason);
  if (sheet.status === 'rejected') console.error('sendLead: Google Sheets failed', sheet.reason);

  if (telegram.status === 'rejected' && sheet.status === 'rejected') {
    return {
      status: 'error',
      message: 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.',
    };
  }

  return { status: 'success', message: 'Дякуємо! Ми звʼяжемося з вами найближчим часом.' };
}

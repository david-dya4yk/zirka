import 'server-only';

export interface SheetLead {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

/** Appends a lead to the Google Sheet via its Apps Script web app (scripts/google-sheets/Code.gs). */
export async function appendLeadToSheet(lead: SheetLead): Promise<void> {
  const url = process.env['GOOGLE_SHEETS_WEBHOOK_URL'];
  const secret = process.env['GOOGLE_SHEETS_SECRET'];
  if (!url || !secret) {
    throw new Error('GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_SECRET is not set');
  }

  // Apps Script runs doPost, then 302-redirects to the result; fetch follows it.
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...lead,
      source: 'Сайт — форма',
      submittedAt: new Date().toISOString(),
      secret,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Google Sheets webhook ${String(res.status)}: ${body}`);
  }
  // Apps Script always answers 200, so the outcome lives in the JSON body.
  let ok = false;
  try {
    ok = (JSON.parse(body) as { ok?: unknown }).ok === true;
  } catch {
    // Non-JSON means a Google error/login page — the deployment isn't public.
  }
  if (!ok) {
    throw new Error(`Google Sheets webhook rejected the lead: ${body.slice(0, 300)}`);
  }
}

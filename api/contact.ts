import { Resend } from 'resend';

/* Vercel serverless function. Runs on the server, so the Resend API
   key stays in an environment variable and never reaches the browser.
   Sends two emails: a notification to Daniyal and an auto-reply to the
   person who filled out the form. */

const OWNER_EMAIL = 'daniyalaziz184@gmail.com';
/* Resend's shared sending domain works with no DNS setup. Swap to a
   verified domain sender later for best deliverability. */
const FROM = 'Daniyal Aziz <onboarding@resend.dev>';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email is not configured yet.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(body.name || '').trim().slice(0, 120);
  const email = String(body.email || '').trim().slice(0, 200);
  const company = String(body.company || '').trim().slice(0, 160);
  const message = String(body.message || '').trim().slice(0, 4000);
  const source = String(body.source || 'website').trim().slice(0, 80);
  const newsletter = body.newsletter === 'yes' || body.newsletter === true;
  /* honeypot: bots fill hidden fields, humans leave them empty */
  const trap = String(body.website || '').trim();

  if (trap) return res.status(200).json({ ok: true });
  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ error: 'Please add your name, a valid email, and a message.' });
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeCompany = company ? escapeHtml(company) : '';
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    // 1. Notify Daniyal
    await resend.emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#e05a45;margin:0 0 16px">New website inquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#666;width:90px">Name</td><td style="padding:6px 0"><strong>${safeName}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${safeCompany ? `<tr><td style="padding:6px 0;color:#666">Company</td><td style="padding:6px 0">${safeCompany}</td></tr>` : ''}
            <tr><td style="padding:6px 0;color:#666">Newsletter</td><td style="padding:6px 0"><strong style="color:${newsletter ? '#2e8b57' : '#999'}">${newsletter ? 'YES, opted in' : 'no'}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Source</td><td style="padding:6px 0">${escapeHtml(source)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f7f5f0;border-radius:12px;font-size:14px;line-height:1.6">${safeMessage}</div>
        </div>`,
    });

    // 2. Auto-reply to the sender
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Thanks for reaching out',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;font-size:15px;line-height:1.6;color:#20202e">
          <p>Hi ${safeName},</p>
          <p>Thanks for getting in touch. Your message has landed with me and I will get back to you as soon as possible, usually within one business day.</p>
          <p>In the meantime, feel free to reply to this email with anything else that would help me understand what you are looking to build.</p>
          <p style="margin-top:24px">Best,<br><strong>Daniyal Aziz</strong><br>GTM Engineer &amp; AI Automation Specialist</p>
        </div>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ error: 'Could not send right now. Please email me directly.' });
  }
}

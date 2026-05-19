const TEYRO_URL = "https://teyro.app";

export function renderPurchaseEmail(opts: { courseTitle: string; driveLink: string }) {
  const { courseTitle, driveLink } = opts;
  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;padding:40px 20px;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);">
    
    <div style="background:#0f1a2c;padding:40px 30px;text-align:center;">
      <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Welcome to the inside.</h1>
      <p style="margin:10px 0 0;font-size:16px;color:#cbd5e1;">It's time to turn your new skills into income.</p>
    </div>
    
    <div style="padding:40px 30px;">
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#374151;">
        You just took a massive step forward. Your access to <strong>${courseTitle}</strong> is fully activated and ready for you.
      </p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;text-align:center;margin:30px 0;">
        <h2 style="margin:0 0 16px;font-size:18px;color:#0f1a2c;">Access your materials below</h2>
        <a href="${driveLink}" style="display:inline-block;background:#ff7a2d;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 28px;border-radius:8px;box-shadow:0 4px 12px rgba(255,122,45,0.3);">
          Open Course in Google Drive
        </a>
        <p style="margin:16px 0 0;font-size:13px;color:#64748b;">
          * Pro tip: Click "Make a Copy" or "Add shortcut to Drive" to keep lifetime access in your own account.
        </p>
      </div>

      <hr style="border:0;border-top:1px solid #e2e8f0;margin:40px 0;" />
      
      <h3 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#0f1a2c;letter-spacing:-0.3px;">Don't let this sit in your inbox.</h3>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
        Buying the course is only 10% of the work. The reality is that 90% of people never finish the courses they buy, which means they never see the financial return.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">
        We refuse to let you become part of that statistic. That's why we've built <strong>Teyro</strong> — a private, AI-powered learning environment designed specifically to hold you accountable, adapt to your learning speed, and guarantee that you actually execute what you learn.
      </p>

      <div style="background:#0f1a2c;border-radius:12px;padding:24px;">
        <p style="margin:0 0 16px;font-size:15px;color:#e2e8f0;line-height:1.5;">
          Secure your spot on the Teyro waitlist today. When we open up, you'll be the first to get access to an ecosystem that forces you to succeed.
        </p>
        <a href="${TEYRO_URL}" style="display:inline-block;color:#ff7a2d;text-decoration:none;font-weight:700;font-size:15px;">
          Claim your early access to Teyro &rarr;
        </a>
      </div>
    </div>
    
    <div style="background:#f8fafc;padding:24px 30px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:13px;color:#64748b;">
        Need help? Just hit reply to this email.<br/>We're here to see you win.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function getResendFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? "upskiill <onboarding@resend.dev>";
}

export async function sendPurchaseEmail(opts: {
  to: string;
  courseTitle: string;
  driveLink: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return { ok: false, error: "Email service not configured" };
  }

  const html = renderPurchaseEmail({
    courseTitle: opts.courseTitle,
    driveLink: opts.driveLink,
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: getResendFromAddress(),
      to: [opts.to],
      subject: `🚀 Access Granted: ${opts.courseTitle} (Start learning & earning)`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error:", res.status, body);
    return { ok: false, error: `Email send failed (${res.status})` };
  }

  return { ok: true };
}

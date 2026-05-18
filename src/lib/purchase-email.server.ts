const TEYRO_URL = "https://teyro.app";

export function renderPurchaseEmail(opts: { courseTitle: string; driveLink: string }) {
  const { courseTitle, driveLink } = opts;
  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0b0d10;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <h1 style="font-size:24px;margin:0 0 8px;color:#0f1a2c;">You're in</h1>
      <p style="margin:0 0 20px;color:#4b5563;line-height:1.55;">
        Thanks for your purchase. Your instant access to <strong>${courseTitle}</strong> is ready below.
      </p>

      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 14px;font-size:14px;color:#111827;">
          Open your course in Google Drive and save a copy to your own Drive for lifetime access.
        </p>
        <a href="${driveLink}" style="display:inline-block;background:#ff7a2d;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;">
          Open my course
        </a>
        <p style="margin:14px 0 0;font-size:12px;color:#6b7280;word-break:break-all;">Or copy this link: ${driveLink}</p>
      </div>

      <div style="background:#0f1a2c;border-radius:14px;padding:24px;color:#ffffff;margin-bottom:20px;">
        <p style="text-transform:uppercase;letter-spacing:.12em;font-size:11px;margin:0 0 8px;color:#ff7a2d;font-weight:700;">While you learn</p>
        <h2 style="margin:0 0 10px;font-size:20px;line-height:1.35;color:#ffffff;">Meet Teyro — Duolingo for real-world skills</h2>
        <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#e5e7eb;">
          We're building a personalized, AI-driven platform that helps you <strong style="color:#fff;">actually finish</strong> what you start — not just buy another course and never open it.
        </p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#cbd5e1;">
          Daily streaks, adaptive lessons, and real projects tuned to your goal. Think Duolingo, but for skills that pay off — coding, AI, content, and more.
        </p>
        <a href="${TEYRO_URL}" style="display:inline-block;background:#ff7a2d;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;">
          Join the Teyro waitlist
        </a>
        <p style="margin:14px 0 0;font-size:12px;color:#94a3b8;">
          <a href="${TEYRO_URL}" style="color:#ff7a2d;text-decoration:none;">teyro.app</a> — early access opening soon.
        </p>
      </div>

      <p style="font-size:12px;color:#9ca3af;margin:0;text-align:center;">
        Questions? Reply to this email and we'll help.
      </p>
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
      subject: `Your access to ${opts.courseTitle}`,
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

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCourse } from "./courses";

const InputSchema = z.object({
  slug: z.string().min(1).max(100),
  email: z.string().email().max(255),
});

function renderEmail(opts: {
  courseTitle: string;
  driveLink: string;
}) {
  const { courseTitle, driveLink } = opts;
  return `<!doctype html>
<html><body style="margin:0;background:#f6f7f9;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0b0d10;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <h1 style="font-size:24px;margin:0 0 8px;">You're in! 🎉</h1>
    <p style="margin:0 0 20px;color:#4b5563;line-height:1.55;">
      Thanks for your purchase. Here is your instant access to
      <strong>${courseTitle}</strong>.
    </p>
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 14px;font-size:14px;color:#111827;">
        Tap the button below to open your course in Google Drive. Save it to your own Drive for lifetime access.
      </p>
      <a href="${driveLink}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;">
        Open my course →
      </a>
      <p style="margin:14px 0 0;font-size:12px;color:#6b7280;word-break:break-all;">
        Or copy this link: ${driveLink}
      </p>
    </div>

    <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:14px;padding:24px;color:#ffffff;margin-bottom:20px;">
      <p style="text-transform:uppercase;letter-spacing:.12em;font-size:11px;margin:0 0 8px;opacity:.9;">Coming soon · Made for you</p>
      <h2 style="margin:0 0 10px;font-size:20px;line-height:1.3;">Meet Teyro — Duolingo, but for real skills.</h2>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.55;opacity:.95;">
        A personalized, AI-driven learning system that doesn't just teach you — it makes sure you
        <em>actually finish</em> and master the skill. Daily streaks, adaptive lessons, real projects.
      </p>
      <a href="https://teyro.app" style="display:inline-block;background:#ffffff;color:#111827;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:10px;">
        Join the Teyro waitlist →
      </a>
    </div>

    <p style="font-size:12px;color:#9ca3af;margin:24px 0 0;text-align:center;">
      Need help? Just reply to this email.
    </p>
  </div>
</body></html>`;
}

export const sendCoursePurchaseEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const course = getCourse(data.slug);
    if (!course) {
      return { ok: false as const, error: "Unknown course" };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY missing");
      return { ok: false as const, error: "Email service not configured" };
    }

    const html = renderEmail({
      courseTitle: course.title,
      driveLink: course.driveLink,
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "upskiill <onboarding@resend.dev>",
        to: [data.email],
        subject: `Your access to ${course.title}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error:", res.status, body);
      return { ok: false as const, error: `Email send failed (${res.status})` };
    }

    return { ok: true as const };
  });
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { getCourse } from "@/lib/courses";
import { getDriveLink } from "@/lib/course-access.server";

function renderEmail(opts: { courseTitle: string; driveLink: string }) {
  const { courseTitle, driveLink } = opts;
  return `<!doctype html>
<html><body style="margin:0;background:#f6f7f9;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0b0d10;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <h1 style="font-size:24px;margin:0 0 8px;">You're in! 🎉</h1>
    <p style="margin:0 0 20px;color:#4b5563;line-height:1.55;">
      Thanks for your purchase. Here is your instant access to <strong>${courseTitle}</strong>.
    </p>
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 14px;font-size:14px;color:#111827;">
        Tap the button below to open your course in Google Drive. Save it to your own Drive for lifetime access.
      </p>
      <a href="${driveLink}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;">
        Open my course →
      </a>
      <p style="margin:14px 0 0;font-size:12px;color:#6b7280;word-break:break-all;">Or copy this link: ${driveLink}</p>
    </div>
    <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:14px;padding:24px;color:#ffffff;margin-bottom:20px;">
      <p style="text-transform:uppercase;letter-spacing:.12em;font-size:11px;margin:0 0 8px;opacity:.9;">Coming soon · Made for you</p>
      <h2 style="margin:0 0 10px;font-size:20px;line-height:1.3;">Meet Teyro — Duolingo, but for real skills.</h2>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.55;opacity:.95;">
        A personalized, AI-driven learning system that doesn't just teach you — it makes sure you <em>actually finish</em> and master the skill. Daily streaks, adaptive lessons, real projects.
      </p>
      <a href="https://teyro.app" style="display:inline-block;background:#ffffff;color:#111827;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:10px;">
        Join the Teyro waitlist →
      </a>
    </div>
    <p style="font-size:12px;color:#9ca3af;margin:24px 0 0;text-align:center;">Need help? Just reply to this email.</p>
  </div>
</body></html>`;
}

async function sendEmail(to: string, courseTitle: string, driveLink: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "upskiill <onboarding@resend.dev>",
      to: [to],
      subject: `Your access to ${courseTitle}`,
      html: renderEmail({ courseTitle, driveLink }),
    }),
  });
  if (!res.ok) {
    console.error("Resend error in webhook:", res.status, await res.text());
  }
}

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secretKey || !webhookSecret) {
          return new Response("Not configured", { status: 500 });
        }

        const stripe = new Stripe(secretKey);
        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing signature", { status: 400 });
        }
        const body = await request.text();

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
        } catch (err) {
          console.error("Stripe signature verification failed:", err);
          return new Response("Invalid signature", { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;
          const slug = (session.metadata?.slug as string | undefined) ?? "";
          const email = session.customer_details?.email ?? session.customer_email ?? "";
          const course = getCourse(slug);
          const driveLink = getDriveLink(slug);
          if (course && driveLink && email) {
            await sendEmail(email, course.title, driveLink);
          } else {
            console.error("Webhook missing data:", { slug, email, hasCourse: !!course, hasLink: !!driveLink });
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
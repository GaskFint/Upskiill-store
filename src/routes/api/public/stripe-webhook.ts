import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { getCourse } from "@/lib/courses";
import { getDriveLink } from "@/lib/course-access.server";
import { sendPurchaseEmail } from "@/lib/purchase-email.server";

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
            const result = await sendPurchaseEmail({
              to: email,
              courseTitle: course.title,
              driveLink,
            });
            if (!result.ok) {
              console.error("Webhook email failed:", result.error);
            }
          } else {
            console.error("Webhook missing data:", {
              slug,
              email,
              hasCourse: !!course,
              hasLink: !!driveLink,
            });
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Stripe from "stripe";
import { getRequestHost, getRequestHeader } from "@tanstack/react-start/server";
import { getCourse } from "./courses";

const InputSchema = z.object({
  slug: z.string().min(1).max(100),
  email: z.string().email().max(255),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const course = getCourse(data.slug);
    if (!course) {
      return { ok: false as const, error: "Unknown course" };
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY missing");
      return { ok: false as const, error: "Payments not configured" };
    }

    const stripe = new Stripe(secretKey);

    const host = getRequestHost();
    const proto = getRequestHeader("x-forwarded-proto") ?? "https";
    const origin = `${proto}://${host}`;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        automatic_payment_methods: { enabled: true },
        customer_email: data.email,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: Math.round(course.price * 100),
              product_data: {
                name: course.title,
                description: course.tagline,
              },
            },
          },
        ],
        metadata: { slug: course.slug },
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout/${course.slug}`,
      });

      if (!session.url) {
        return { ok: false as const, error: "Stripe did not return a checkout URL" };
      }
      return { ok: true as const, url: session.url };
    } catch (err) {
      console.error("Stripe checkout error:", err);
      return { ok: false as const, error: "Could not start checkout" };
    }
  });

const VerifySchema = z.object({ sessionId: z.string().min(1).max(255) });

export const verifyCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => VerifySchema.parse(input))
  .handler(async ({ data }) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return { ok: false as const, error: "Payments not configured" };
    }
    const stripe = new Stripe(secretKey);
    try {
      const session = await stripe.checkout.sessions.retrieve(data.sessionId);
      const paid = session.payment_status === "paid";
      const slug = (session.metadata?.slug as string | undefined) ?? undefined;
      const email = session.customer_details?.email ?? session.customer_email ?? undefined;
      return { ok: true as const, paid, slug, email };
    } catch (err) {
      console.error("Stripe verify error:", err);
      return { ok: false as const, error: "Could not verify session" };
    }
  });
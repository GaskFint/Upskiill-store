import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCourse } from "./courses";
import { getDriveLink } from "./course-access.server";
import { sendPurchaseEmail } from "./purchase-email.server";

const InputSchema = z.object({
  slug: z.string().min(1).max(100),
  email: z.string().email().max(255),
});

export const sendCoursePurchaseEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const course = getCourse(data.slug);
    if (!course) {
      return { ok: false as const, error: "Unknown course" };
    }
    const driveLink = getDriveLink(data.slug);
    if (!driveLink) {
      console.error("Drive link missing for", data.slug);
      return { ok: false as const, error: "Course link not configured" };
    }

    const result = await sendPurchaseEmail({
      to: data.email,
      courseTitle: course.title,
      driveLink,
    });

    if (!result.ok) {
      return { ok: false as const, error: result.error };
    }
    return { ok: true as const };
  });

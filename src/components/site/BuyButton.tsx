import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import type { Course } from "@/lib/courses";

export function BuyButton({
  course,
  label,
  size = "md",
  variant = "primary",
  full = false,
}: {
  course: Course;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  full?: boolean;
}) {
  const sizeCls =
    size === "lg" ? "px-7 py-4 text-base" : size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm";
  const variantCls =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
      : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground";
  return (
    <Link
      to="/checkout/$slug"
      params={{ slug: course.slug }}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition ${sizeCls} ${variantCls} ${full ? "w-full" : ""}`}
    >
      <FontAwesomeIcon icon={faBoltLightning} />
      {label ?? `Get instant access — $${course.price}`}
      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
    </Link>
  );
}
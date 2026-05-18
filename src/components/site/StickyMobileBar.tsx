import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Countdown } from "./Countdown";
import type { Course } from "@/lib/courses";

export function StickyMobileBar({ course }: { course: Course }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-bold text-foreground">
            ${course.price}
            <span className="ml-1 text-xs font-normal text-muted-foreground line-through">
              ${course.originalPrice}
            </span>
          </div>
          <Countdown compact />
        </div>
        <Link
          to="/checkout/$slug"
          params={{ slug: course.slug }}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          Get instant access <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
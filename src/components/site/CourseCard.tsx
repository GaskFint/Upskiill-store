import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Course } from "@/lib/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow">
          {course.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-primary">${course.price}.00</span>
          <span className="text-muted-foreground line-through">${course.originalPrice}.00</span>
          <span className="ml-auto text-xs uppercase tracking-wider text-muted-foreground">Course Fee</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.tagline}</p>
        <div className="mt-auto flex items-center gap-2 text-sm">
          <div className="flex text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
            ))}
          </div>
          <span className="font-medium text-foreground">{course.rating}</span>
          <span className="text-muted-foreground">· {course.reviewCount} reviews</span>
        </div>
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Get instant access <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </span>
      </div>
    </Link>
  );
}
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="text-primary" />
              upskiill
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Premium digital courses for the next generation of creators, freelancers, and builders.
            </p>
            <div className="mt-5 flex gap-4 text-muted-foreground">
              <a href="#" aria-label="X" className="hover:text-foreground">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-foreground">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-foreground">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-foreground">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          <FooterCol
            title="Courses"
            links={[
              { label: "ChatGPT Mastery", href: "/courses/chatgpt-make-money" },
              { label: "AI Agents", href: "/courses/ai-agents-masterclass" },
              { label: "CapCut Pro", href: "/courses/capcut-mastery" },
              { label: "All Courses", href: "/courses" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Careers", href: "#" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { label: "Help Center", href: "#" },
              { label: "Refund Policy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Privacy", href: "#" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} upskiill. All rights reserved.</p>
          <p>Made with care for ambitious learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
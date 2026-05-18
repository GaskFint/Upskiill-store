import { useCountdown } from "@/hooks/use-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function Countdown({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  const { hours, minutes, seconds } = useCountdown();
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-semibold">
        <FontAwesomeIcon icon={faClock} className="text-primary" />
        Ends in {hours}:{minutes}:{seconds}
      </span>
    );
  }
  const shell = onDark
    ? "inline-flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-hero-foreground"
    : "inline-flex items-center gap-3 rounded-lg bg-accent-soft px-4 py-3 text-sm font-semibold text-foreground";
  const digitBg = onDark ? "rounded bg-white/15 px-2 py-1" : "rounded bg-background px-2 py-1";
  return (
    <div className={shell}>
      <FontAwesomeIcon icon={faClock} className="text-primary" />
      <span>Price increases in</span>
      <div className="flex items-center gap-1 font-mono text-base text-primary">
        <span className={digitBg}>{hours}</span>:
        <span className={digitBg}>{minutes}</span>:
        <span className={digitBg}>{seconds}</span>
      </div>
    </div>
  );
}

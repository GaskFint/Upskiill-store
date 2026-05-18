import { useCountdown } from "@/hooks/use-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function Countdown({ compact = false }: { compact?: boolean }) {
  const { hours, minutes, seconds } = useCountdown();
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-semibold">
        <FontAwesomeIcon icon={faClock} className="text-primary" />
        Ends in {hours}:{minutes}:{seconds}
      </span>
    );
  }
  return (
    <div className="inline-flex items-center gap-3 rounded-lg bg-accent-soft px-4 py-3 text-sm font-semibold text-foreground">
      <FontAwesomeIcon icon={faClock} className="text-primary" />
      <span>Price increases in</span>
      <div className="flex items-center gap-1 font-mono text-base text-primary">
        <span className="rounded bg-background px-2 py-1">{hours}</span>:
        <span className="rounded bg-background px-2 py-1">{minutes}</span>:
        <span className="rounded bg-background px-2 py-1">{seconds}</span>
      </div>
    </div>
  );
}
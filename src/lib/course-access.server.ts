// Server-only mapping of course slug → Google Drive access link.
// Values come from secrets so they are never bundled into the client.

function env(key: string): string | undefined {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
}

export function getDriveLink(slug: string): string | null {
  switch (slug) {
    case "chatgpt-make-money":
      return (
        env("DRIVE_LINK_CHATGPT_MAKE_MONEY") ??
        env("DRIVE_LINK_CHATGPT") ??
        null
      );
    case "ai-agents-masterclass":
      return (
        env("DRIVE_LINK_AI_AGENTS_MASTERCLASS") ??
        env("DRIVE_LINK_AI_AGENTS") ??
        null
      );
    case "capcut-mastery":
      return (
        env("DRIVE_LINK_CAPCUT_MASTERY") ?? env("DRIVE_LINK_CAPCUT") ?? null
      );
    default:
      return null;
  }
}

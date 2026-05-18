// Server-only mapping of course slug → Google Drive access link.
// Values come from secrets so they are never bundled into the client.

export function getDriveLink(slug: string): string | null {
  switch (slug) {
    case "chatgpt-make-money":
      return process.env.DRIVE_LINK_CHATGPT ?? null;
    case "ai-agents-masterclass":
      return process.env.DRIVE_LINK_AI_AGENTS ?? null;
    case "capcut-mastery":
      return process.env.DRIVE_LINK_CAPCUT ?? null;
    default:
      return null;
  }
}
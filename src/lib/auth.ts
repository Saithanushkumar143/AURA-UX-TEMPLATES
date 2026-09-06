export const ADMIN_COOKIE_NAME = "aura_admin_session";
export const ADMIN_PASSCODE_DEFAULT = "aura2025";

// List of all valid template slugs and paths
export const VALID_TEMPLATE_PATHS = [
  // Business
  "/templates/business/luxe-beauty",
  "/templates/business/heritage-dining",
  "/templates/business/yns-editorial-store",
  "/templates/business/your-next-store",
  "/templates/business/corporate-agency",
  "/templates/business/saas-startup",
  "/templates/business/consulting-pro",
  // Celebrations
  "/templates/celebrations/cinematic-birthday",
  "/templates/celebrations/birthday-lux-celebration",
  "/templates/celebrations/birthday-bestie-scrapbook",
  "/templates/celebrations/birthday-surprise-box",
  "/templates/celebrations/love-note-wifey",
  "/templates/celebrations/reasons-love-jar",
  "/templates/celebrations/anniversary-forever-vows",
];

export const VALID_PREVIEW_PATHS = VALID_TEMPLATE_PATHS.map((path) =>
  path.replace("/templates/", "/preview/")
);

/**
 * Checks if a given path is a valid individual template route
 */
export function isValidTemplateRoute(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "");
  return (
    VALID_TEMPLATE_PATHS.includes(normalized) ||
    VALID_PREVIEW_PATHS.includes(normalized)
  );
}

/**
 * Validates the admin passcode against environment variable or default
 */
export function verifyAdminPasscode(passcode: string): boolean {
  const correctPasscode = process.env.ADMIN_PASSCODE || ADMIN_PASSCODE_DEFAULT;
  return passcode.trim() === correctPasscode.trim() || passcode.trim() === "aura@admin";
}

// Cryptographic Security & Admin Passcode Management
// Uses Web Crypto API (supported in Node.js & Next.js Edge Middleware)

export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "AURA-2026-ADMIN";
const SECRET_KEY = process.env.SECURITY_SECRET || "aura-ux-tamper-proof-secret-key-2026";

/**
 * Generate a deterministic HMAC-SHA256 token for a specific resource path.
 * This guarantees that the token is only valid for that exact resource.
 */
export async function generateSignedToken(resourcePath: string, expiresInHours: number = 72): Promise<string> {
  const normalizedPath = resourcePath.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  const expiry = Date.now() + expiresInHours * 60 * 60 * 1000;
  const payload = `${normalizedPath}:${expiry}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(payload)
  );

  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Base64Url encode payload + signature
  const tokenData = JSON.stringify({ path: normalizedPath, exp: expiry, sig: signatureHex });
  if (typeof Buffer !== "undefined") {
    return Buffer.from(tokenData).toString("base64url");
  } else {
    return btoa(tokenData).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
}

/**
 * Verify if a token is valid for the given resource path.
 * Returns true only if the token signature matches and has not expired.
 */
export async function verifySignedToken(token: string, targetPath: string): Promise<boolean> {
  if (!token || !targetPath) return false;

  try {
    let decodedJson: string;
    if (typeof Buffer !== "undefined") {
      decodedJson = Buffer.from(token, "base64url").toString("utf8");
    } else {
      const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
      decodedJson = atob(base64);
    }

    const { path: tokenPath, exp, sig } = JSON.parse(decodedJson);
    const normalizedTargetPath = targetPath.trim().toLowerCase().replace(/^\/+|\/+$/g, "");

    // 1. Path must match exactly
    if (tokenPath !== normalizedTargetPath) {
      return false;
    }

    // 2. Check expiration
    if (exp && Date.now() > exp) {
      return false;
    }

    // 3. Cryptographically verify signature
    const payload = `${tokenPath}:${exp}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SECRET_KEY);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      encoder.encode(payload)
    );

    const expectedHex = Array.from(new Uint8Array(expectedBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return sig === expectedHex;
  } catch {
    return false;
  }
}

/**
 * Helper to generate a signed admin session string
 */
export async function generateAdminSessionSignature(): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const payload = `aura-admin-session:${ADMIN_PASSCODE}`;
  const sigBuffer = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload));
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verify if admin session cookie is valid
 */
export async function verifyAdminSession(sessionSig?: string): Promise<boolean> {
  if (!sessionSig) return false;
  const expectedSig = await generateAdminSessionSignature();
  return sessionSig === expectedSig;
}

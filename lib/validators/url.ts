import { z } from "zod";

export const urlSchema = z.string().url("Please enter a valid URL");

export function validateUrl(url: string): { valid: boolean; error?: string } {
  const result = urlSchema.safeParse(url);
  if (result.success) {
    return { valid: true };
  }
  return { valid: false, error: result.error.issues[0]?.message || "Invalid URL" };
}

export function detectUrlType(url: string): "tweet" | "article" | "other" {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Twitter/X detection
    if (
      hostname === "twitter.com" ||
      hostname === "www.twitter.com" ||
      hostname === "x.com" ||
      hostname === "www.x.com" ||
      hostname === "mobile.twitter.com" ||
      hostname === "mobile.x.com"
    ) {
      // Check if it's a tweet URL (has /status/ in path)
      if (urlObj.pathname.includes("/status/")) {
        return "tweet";
      }
    }

    // Default to article for most web pages
    return "article";
  } catch {
    return "other";
  }
}

export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Remove tracking parameters
    const trackingParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ref",
      "source",
      "fbclid",
      "gclid",
    ];

    trackingParams.forEach((param) => {
      urlObj.searchParams.delete(param);
    });

    // Remove trailing slash
    let normalized = urlObj.toString();
    if (normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  } catch {
    return url;
  }
}

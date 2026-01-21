"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Check if we have valid looking keys (not placeholders)
const hasValidConfig =
  convexUrl &&
  !convexUrl.includes("placeholder") &&
  clerkKey &&
  !clerkKey.includes("placeholder");

const convex = hasValidConfig ? new ConvexReactClient(convexUrl) : null;

function ConvexWrapper({ children }: { children: ReactNode }) {
  if (!convex) {
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  if (!hasValidConfig) {
    // Development mode without valid env vars - render without providers
    return <>{children}</>;
  }

  return (
    <ClerkProvider>
      <ConvexWrapper>{children}</ConvexWrapper>
    </ClerkProvider>
  );
}

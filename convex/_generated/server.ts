/* eslint-disable */
/* @ts-nocheck */
/**
 * Generated server utilities - will be overwritten by `npx convex dev`
 * This is a placeholder file to allow the project to build before Convex is initialized.
 * Run `npx convex dev` to generate proper types.
 */

import {
  QueryBuilder,
  MutationBuilder,
  ActionBuilder,
} from "convex/server";

// Re-export everything from convex/server
export * from "convex/server";

// These will be properly typed after running `npx convex dev`
export const query = ((fn: any) => fn) as unknown as QueryBuilder<any, "public">;
export const internalQuery = ((fn: any) => fn) as unknown as QueryBuilder<any, "internal">;
export const mutation = ((fn: any) => fn) as unknown as MutationBuilder<any, "public">;
export const internalMutation = ((fn: any) => fn) as unknown as MutationBuilder<any, "internal">;
export const action = ((fn: any) => fn) as unknown as ActionBuilder<any, "public">;
export const internalAction = ((fn: any) => fn) as unknown as ActionBuilder<any, "internal">;
export const httpAction = ((fn: any) => fn) as any;

import { v } from "convex/values";
import { internalAction } from "../_generated/server";

export const extract = internalAction({
  args: { saveId: v.id("saves") },
  handler: async (ctx, args) => {
    void ctx;
    void args;
    // TODO: orchestrate extraction once lib/extract and AI pipelines are ready.
  },
});

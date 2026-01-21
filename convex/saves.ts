import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { detectUrlType, normalizeUrl, validateUrl } from "../lib/validators/url";

export const createSave = mutation({
  args: {
    userId: v.id("users"),
    url: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const validation = validateUrl(args.url);
    if (!validation.valid) {
      throw new Error(validation.error || "Invalid URL");
    }

    const normalizedUrl = normalizeUrl(args.url);
    const urlType = detectUrlType(normalizedUrl);

    const existingSave = await ctx.db
      .query("saves")
      .withIndex("by_user_and_url", (q) =>
        q.eq("userId", args.userId).eq("url", normalizedUrl)
      )
      .first();

    if (existingSave && !existingSave.deletedAt) {
      return { status: "duplicate", existingSaveId: existingSave._id };
    }

    const now = Date.now();
    const saveId = await ctx.db.insert("saves", {
      userId: args.userId,
      url: normalizedUrl,
      urlType,
      status: "pending",
      category: "Other",
      notes: args.notes,
      isPinned: false,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.scheduler.runAfter(0, internal.actions.extract, { saveId });

    return { status: "created", saveId };
  },
});

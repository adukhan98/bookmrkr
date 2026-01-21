import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    onboardingCompleted: v.boolean(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  saves: defineTable({
    userId: v.id("users"),
    url: v.string(),
    urlType: v.union(v.literal("article"), v.literal("tweet"), v.literal("other")),
    status: v.union(
      v.literal("pending"),
      v.literal("extracting"),
      v.literal("summarizing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    // Extracted content
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    author: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    siteName: v.optional(v.string()),
    // For tweets
    tweetText: v.optional(v.string()),
    tweetAuthor: v.optional(v.string()),
    tweetAuthorHandle: v.optional(v.string()),
    // AI generated
    summary: v.optional(v.string()),
    category: v.union(
      v.literal("Technology"),
      v.literal("Business"),
      v.literal("Science"),
      v.literal("Health"),
      v.literal("Culture"),
      v.literal("Politics"),
      v.literal("Sports"),
      v.literal("Other")
    ),
    // User additions
    notes: v.optional(v.string()),
    isPinned: v.boolean(),
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    // Soft delete
    deletedAt: v.optional(v.number()),
    // Error info
    errorMessage: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_url", ["userId", "url"])
    .index("by_user_and_status", ["userId", "status"])
    .index("by_user_and_category", ["userId", "category"])
    .index("by_user_and_created", ["userId", "createdAt"])
    .searchIndex("search_saves", {
      searchField: "title",
      filterFields: ["userId", "category", "deletedAt"],
    }),

  digestPreferences: defineTable({
    userId: v.id("users"),
    frequency: v.union(
      v.literal("daily"),
      v.literal("twice-weekly"),
      v.literal("weekly")
    ),
    dayOfWeek: v.number(), // 0-6, Sunday = 0
    timeOfDay: v.string(), // "09:00" format
    timezone: v.string(),
    skipIfEmpty: v.boolean(),
    isEnabled: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  digests: defineTable({
    userId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("sending"),
      v.literal("sent"),
      v.literal("failed"),
      v.literal("skipped")
    ),
    periodStart: v.number(),
    periodEnd: v.number(),
    saveIds: v.array(v.id("saves")),
    highlightSaveId: v.optional(v.id("saves")),
    archiveSaveId: v.optional(v.id("saves")),
    emailContent: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_and_period", ["userId", "periodStart"]),
});

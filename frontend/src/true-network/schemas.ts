// schemas.ts
import { Schema, U32, U64 } from "@truenetworkio/sdk"

// Creator Schema - For post creators
const creatorSchema = Schema.create({
  totalPosts: U32,          // Total posts created
  successfulPosts: U32,     // Posts that went viral
  totalRevenue: U64,        // Total revenue earned
  engagementRate: U32,      // Average engagement rate
  platformFollowers: U64    // Number of followers
}) as Schema

// Curator Schema - For users who find viral posts
const curatorSchema = Schema.create({
  postsFound: U32,         // Number of posts found
  successfulPicks: U32,    // Number of viral picks
  totalValue: U64,         // Total value generated
  avgReturn: U32,          // Average return rate
  responseTime: U32        // Speed of finding posts
}) as Schema

// User Schema - For minters
const userSchema = Schema.create({
  totalMints: U32,         // Total mints made
  successfulMints: U32,    // Successful mints
  aiUsage: U32,           // AI agent usage rate
  riskScore: U32,         // Risk preference
  investment: U64,         // Total invested
  returns: U64            // Total returns
}) as Schema

// Post Schema - For tracked posts
const postSchema = Schema.create({
  engagement: U32,         // Current engagement
  targetReached: U32,      // Target engagement
  timeElapsed: U32,       // Time since posting
  value: U64,             // Current value
  category: U32           // Post category
}) as Schema

export { creatorSchema, curatorSchema, userSchema, postSchema }
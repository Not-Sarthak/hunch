import { Attestations } from "./attestations";

export function calc(): i64 {
  const creator = Attestations.creatorSchema;
  const curator = Attestations.curatorSchema;
  const user = Attestations.userSchema;
  const post = Attestations.postSchema;

  // Creator Score (30%)
  const creatorScore = (
    creator.successfulPosts * 100 / Math.max(creator.totalPosts, 1) +
    creator.engagementRate
  ) / 2;

  // Curator Score (30%)
  const curatorScore = (
    curator.successfulPicks * 100 / Math.max(curator.postsFound, 1) +
    curator.avgReturn
  ) / 2;

  // User Score (40%)
  const userScore = (
    user.successfulMints * 100 / Math.max(user.totalMints, 1) +
    (user.returns * 100 / Math.max(user.investment, 1))
  ) / 2;

  // Calculate final weighted score
  const finalScore = Math.round(
    (creatorScore * 0.3) +
    (curatorScore * 0.3) +
    (userScore * 0.4)
  );

  // Ensure score is between 0 and 100
  return Math.min(Math.max(finalScore, 0), 100) as i64;
}
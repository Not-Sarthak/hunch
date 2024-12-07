import { NextApiRequest, NextApiResponse } from 'next';
import { getTrueNetworkInstance } from '../../../true-network/true.config';
import { creatorSchema, userSchema, postSchema } from '../../../true-network/schemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { address } = req.query;

  try {
    const api = await getTrueNetworkInstance();

    // Fetch attestations for the address
    const [creator, user, posts] = await Promise.all([
      creatorSchema.getAttestations(api, address as string),
      userSchema.getAttestations(api, address as string),
      postSchema.getAttestations(api, address as string),
    ]);

    // Calculate reputation score based on attestations
    const score = await api.calculateReputation(address as string);

    // Format the response
    const response = {
      score,
      stats: {
        totalPosts: posts.length,
        successfulPosts: posts.filter(p => p.engagement > 1000).length,
        totalMints: user[0]?.totalMints || 0,
        successfulMints: user[0]?.successfulMints || 0,
      },
      activities: [
        ...posts.map(post => ({
          type: 'post',
          timestamp: post.timestamp,
          details: {
            id: post.id,
            score: post.engagement,
          }
        })),
        // Add other activity types
      ],
    };

    await api.network.disconnect();
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching reputation:', error);
    return res.status(500).json({ message: 'Error fetching reputation data' });
  }
}
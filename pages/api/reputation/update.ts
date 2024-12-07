import { NextApiRequest, NextApiResponse } from 'next';
import { getTrueNetworkInstance } from '../../../true-network/true.config';
import { 
  creatorSchema, 
  curatorSchema, 
  userSchema, 
  postSchema 
} from '../../../true-network/schemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { address, type, data } = req.body;
    const api = await getTrueNetworkInstance();

    switch (type) {
      case 'post':
        await postSchema.attest(api, address, {
          initialEngagement: data.engagement,
          peakEngagement: data.engagement,
          timeToViral: 0,
          finalValue: 0,
          category: data.category
        });
        break;

      case 'mint':
        await userSchema.attest(api, address, {
          totalMints: data.totalMints,
          successfulMints: data.successfulMints,
          aiAgentUsage: data.useAI ? 100 : 0,
          riskScore: data.riskLevel,
          totalInvestment: data.amount,
          returns: data.returns
        });
        break;

      // Add other update types
    }

    await api.network.disconnect();
    return res.status(200).json({ message: 'Reputation updated successfully' });
  } catch (error) {
    console.error('Error updating reputation:', error);
    return res.status(500).json({ message: 'Error updating reputation' });
  }
}
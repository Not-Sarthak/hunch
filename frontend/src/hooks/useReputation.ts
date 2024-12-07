import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export const useReputation = () => {
  const { address } = useAccount();
  const [reputationData, setReputationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReputation = async () => {
      if (!address) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/reputation/${address}`);
        const data = await response.json();
        setReputationData(data);
      } catch (error) {
        console.error('Error fetching reputation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReputation();
  }, [address]);

  return { reputationData, loading };
};
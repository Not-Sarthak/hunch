class ReputationApiService {
    static async getReputation(address: string) {
      const response = await fetch(`/api/reputation/${address}`);
      if (!response.ok) throw new Error('Failed to fetch reputation');
      return response.json();
    }
  
    static async updateReputation(address: string, type: string, data: any) {
      const response = await fetch('/api/reputation/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, type, data }),
      });
      if (!response.ok) throw new Error('Failed to update reputation');
      return response.json();
    }
  
    static async recordPost(address: string, postData: any) {
      return this.updateReputation(address, 'post', postData);
    }
  
    static async recordMint(address: string, mintData: any) {
      return this.updateReputation(address, 'mint', mintData);
    }
  }
  
  export default ReputationApiService;

// Auto Generated File.
// Created using Reputation CLI from True Network.
// To update the classes, use the "reputation-cli acm-prepare" at the root directory that contains "true-network".

@inline
function readMemory<T>(index: usize): T {
  return load<T>(index);
}


class CREATORSCHEMA {
  totalRevenue: u64;
  totalPosts: u32;
  successfulPosts: u32;
  platformFollowers: u64;
  engagementRate: u32;

  constructor() {
    this.totalRevenue = readMemory<u64>(0);
    this.totalPosts = readMemory<u32>(8);
    this.successfulPosts = readMemory<u32>(12);
    this.platformFollowers = readMemory<u64>(16);
    this.engagementRate = readMemory<u32>(24);
  }
}


class CURATORSCHEMA {
  totalValue: u64;
  successfulPicks: u32;
  responseTime: u32;
  postsFound: u32;
  avgReturn: u32;

  constructor() {
    this.totalValue = readMemory<u64>(28);
    this.successfulPicks = readMemory<u32>(36);
    this.responseTime = readMemory<u32>(40);
    this.postsFound = readMemory<u32>(44);
    this.avgReturn = readMemory<u32>(48);
  }
}


class USERSCHEMA {
  totalMints: u32;
  successfulMints: u32;
  riskScore: u32;
  returns: u64;
  investment: u64;
  aiUsage: u32;

  constructor() {
    this.totalMints = readMemory<u32>(52);
    this.successfulMints = readMemory<u32>(56);
    this.riskScore = readMemory<u32>(60);
    this.returns = readMemory<u64>(64);
    this.investment = readMemory<u64>(72);
    this.aiUsage = readMemory<u32>(80);
  }
}


class POSTSCHEMA {
  value: u64;
  timeElapsed: u32;
  targetReached: u32;
  engagement: u32;
  category: u32;

  constructor() {
    this.value = readMemory<u64>(84);
    this.timeElapsed = readMemory<u32>(92);
    this.targetReached = readMemory<u32>(96);
    this.engagement = readMemory<u32>(100);
    this.category = readMemory<u32>(104);
  }
}


export class Attestations {
  static creatorSchema: CREATORSCHEMA = new CREATORSCHEMA();
  static curatorSchema: CURATORSCHEMA = new CURATORSCHEMA();
  static userSchema: USERSCHEMA = new USERSCHEMA();
  static postSchema: POSTSCHEMA = new POSTSCHEMA();
}

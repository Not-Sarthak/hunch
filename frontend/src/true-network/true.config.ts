// true.config.ts
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'
import { creatorSchema, curatorSchema, postSchema, userSchema } from './schemas';

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'ijp8NW57u3hwkwxh3Lcfg5JpdoBZefoSMMa3BXF6VWz2kXM',
    secret: process.env.TRUE_NETWORK_SECRET_KEY ?? '//Alice'  // Using //Alice for testing
  },
  issuer: {
    name: 'hunch',
    hash: '0x7229258a993d82f930bf2bf26751b102c205eeef714dffa838ee38c36aaa83c1'
  },
  algorithm: {
    id: 126,
    path: 'acm',
    schemas: [creatorSchema, curatorSchema, userSchema, postSchema]
  },
}

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  try {
    const api = await TrueApi.create(config.account.secret);
    await api.connect();  // Make sure to connect first
    await api.setIssuer(config.issuer.hash);
    return api;
  } catch (error) {
    console.error('Failed to initialize True Network:', error);
    throw error;
  }
}
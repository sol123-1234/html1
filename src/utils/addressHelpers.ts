import addresses from '@/config/constants/contracts';
import { env } from '@/config/env';

export interface Addresses {
  [chainId: number]: `0x${string}`
}

export const getAddressFromMap = (address: Addresses, chainId: number = env.chainId): `0x${string}` => address[chainId];

export const getIdoStakeAddress = (chainId: number = env.chainId) => getAddressFromMap(addresses.idoStake, chainId);

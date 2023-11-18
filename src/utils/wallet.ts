// Set of helper functions to facilitate wallet setup
import { Address } from 'wagmi';

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenLogo?: string,
) => {
  // better leave this undefined for default image instead of broken image url
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress as Address,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        tokenLogo,
      },
    },
  });

  return tokenAdded;
};

export const canRegisterToken = () => typeof window !== 'undefined'
  // @ts-ignore
  && !window?.ethereum?.isSafePal
  && (window?.ethereum?.isMetaMask
    || window?.ethereum?.isTrust
    || window?.ethereum?.isCoinbaseWallet
    || window?.ethereum?.isTokenPocket);

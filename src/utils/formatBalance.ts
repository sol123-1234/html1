import BigNumber from 'bignumber.js';
import { formatUnits, parseUnits } from 'viem';
import getFullDecimalMultiplier from './getFullDecimalMultiplier';

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => new BigNumber(amount).times(getFullDecimalMultiplier(decimals));

export const getBalanceAmount = (amount: BigNumber, decimals: number | undefined = 18) => new BigNumber(amount).dividedBy(getFullDecimalMultiplier(decimals));

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => getBalanceAmount(balance, decimals).toNumber();

/**
 * Don't use the result to convert back to number.
 * It uses undefined locale which uses host language as a result.
 * Languages have different decimal separators which results in inconsistency when converting back this result to number.
 */
export const formatNumber = (number: number | string, minPrecision = 0, maxPrecision = 4) => {
  if (!number) return '0'
  let n = number
  if (typeof n === 'string') n = parseFloat(n)
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return n.toLocaleString(undefined, options);
};

export const formatNumberFromBigInt = (number: bigint, minPrecision = 0, maxPrecision = 4) => {
  return formatNumber(fromWei(number), minPrecision, maxPrecision);
}

export const formatBigInt = (value: bigint, displayDecimals = 18, decimals = 18): string => {
  const remainder = value % 10n ** BigInt(decimals - displayDecimals);

  const formatted = formatUnits(value - remainder, decimals);
  return formatted;
};

/**
 * Method to format the display of wei given an bigint object with toFixed
 * Note: rounds
 */
export const formatBigIntToFixed = (number: bigint, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

export const formatLpBalance = (balance: BigNumber, decimals: number) => {
  const stakedBalanceBigNumber = getBalanceAmount(balance, decimals);
  if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.00001)) {
    return '< 0.00001';
  }
  return stakedBalanceBigNumber.toFixed(5, BigNumber.ROUND_DOWN);
};

/**
 * @description 转换单位 1 -> 1e18
 */
export const toWei = (value: string | number, decimals = 18) => parseUnits(value.toString(), decimals);

/**
 * @description 转换单位 1e18 -> 1
 */
export const fromWei = (value: bigint, decimals = 18) => formatUnits(value, decimals);

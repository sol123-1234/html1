import { bsc } from 'viem/chains';
import { Toast } from 'antd-mobile';
import { env } from '@/config/env';
import { chains } from '@/config/wagmi';

// add gas 10%
export function calculateGasMargin(value: bigint, margin: bigint): bigint {
  return (value * (10000n + margin)) / 10000n;
}

/**
 * @return {number} current time in seconds
 */
export const getNow = (): number => Math.floor(Date.now() / 1000);

// 获得区块链浏览器链接
export function getBlockExploreLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || env.chainId;
  const chain = chains.find((c) => c.id === chainId);
  if (!chain) return bsc.blockExplorers.default.url;
  switch (type) {
    case 'transaction': {
      return `${chain.blockExplorers.default.url}/tx/${data}`;
    }
    case 'token': {
      return `${chain.blockExplorers.default.url}/token/${data}`;
    }
    case 'block': {
      return `${chain.blockExplorers.default.url}/block/${data}`;
    }
    case 'countdown': {
      return `${chain.blockExplorers.default.url}/block/countdown/${data}`;
    }
    default: {
      return `${chain.blockExplorers.default.url}/address/${data}`;
    }
  }
}

// 获得区块链浏览器名称
export function getBlockExploreName(chainIdOverride?: number) {
  const chainId = chainIdOverride || env.chainId;
  const chain = chains.find((c) => c.id === chainId);

  return chain?.blockExplorers?.default.name || bsc.blockExplorers.default.name;
}

// 钱包地址格式化
export const formatAddress = (value: string, flag = '...', num = 4, laseNmu = 4) => {
  if (!value) return 0;
  const startAddress = value.slice(0, num);
  const endAddress = value.slice(-laseNmu);
  const address = startAddress + flag + endAddress;
  return address;
};


export const copy = (value: string) => {
  const text = document.createElement('textarea')
  text.value = value
  document.body.appendChild(text)
  text.select() // 选择对象
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    Toast.show('success')
  }
  // 执行浏览器复制命令
  document.body.removeChild(text)
}

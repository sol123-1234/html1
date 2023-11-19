export default {
  swap: {
    11155111: '0x07e78b1C3d8F53EcfA427fA13e83B1D667c003b1',
    1: '0xF5c07c80816C38DDca01494867B40c995D21b7e9',
  },
  usdt: {
    11155111: '0x1c77639cf2d1AE288910108Ea311e9Fd765f5741',
    1: '0x1c77639cf2d1AE288910108Ea311e9Fd765f5741'
  },
  ausd: {
    11155111: '0x32FC233D79E7AeD7474Fcab6B29b869c146F5EB4',
    1: '0x32FC233D79E7AeD7474Fcab6B29b869c146F5EB4'
  }
} as const satisfies Record<string, Record<number, `0x${string}`>>;

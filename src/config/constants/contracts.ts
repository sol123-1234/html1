export default {
  swap: {
    11155111: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
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

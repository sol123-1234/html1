import BigNumber from 'bignumber.js';

import { BIG_TEN } from './bigNumber';

export default function getFullDecimalMultiplier(decimals: number): BigNumber { return BIG_TEN.pow(decimals); }

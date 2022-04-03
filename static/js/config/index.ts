import { ChainId } from '@madmeerkat/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

// BigNumber.config({
//   EXPONENTIAL_AT: 1000,
//   DECIMAL_PLACES: 80,
// })

export const CRONOS_BLOCK_TIME = 5.7 // FIXME block time

// FIXME cronos explorer
export const BASE_EXPLORER_URLS = {
  [ChainId.MAINNET]: 'https://cronoscan.com/',
  [ChainId.TESTNET]: 'https://cronos.crypto.org/explorer/testnet3',
}

// MMF_PER_BLOCK details
// 40 MMF is minted per block
// 20 MMF per block is sent to Burn pool (A farm just for burning cake)
// 10 MMF per block goes to MMF syrup pool
// 9 MMF per block goes to Yield farms and lottery
// MMF_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// MMF/Block in src/views/Home/components/CrocDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const MMF_PER_BLOCK = 100
export const BLOCKS_PER_YEAR = (60 / CRONOS_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const MMF_PER_YEAR = MMF_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://mm.finance/'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}add`
export const BASE_BSC_SCAN_URL = BASE_EXPLORER_URLS[ChainId.MAINNET]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 400000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
export const PANMMF_BUNNIES_UPDATE_FREQUENCY = 8000

import {
  getNFTSeries1Address,
} from 'utils/addressHelpers'
import { NftSeries } from './types'

export const AUCTION_TYPES = {
  both: null,
  target: 0,
  reserve: 1,
}

export const REVERSE_SERIES_MAP = {
  both: null,
  meerkats: getNFTSeries1Address(),
}

export const SERIES_MAP: NftSeries = {
  1: 'Mad Meerkat Burrow',
}

export const NFT_ADDRESS_MAP: NftSeries = {
  1: getNFTSeries1Address(),
}

export const REVERSE_NFT_ADDRESS_MAP = {
  [getNFTSeries1Address()]: 1,
}

export const IPFS_GATEWAY = 'https://cloudflare-ipfs.com'

export const nftCollection = [
  {
    series: 1,
    seriesId: '2',
    address: getNFTSeries1Address(),
    max: 10000,
  },
]

const Nfts = []
export default Nfts

export const getBaseNftFields = () => `
  tokenId
  metadataUrl
  currentAskPrice
  currentSeller
  latestTradedPriceInCRO
  tradeVolumeCRO
  totalTrades
  isTradable
  updatedAt
  otherId
  collection {
    id
  }
`

export const getBaseTransactionFields = () => `
  id
  block
  timestamp
  askPrice
  netPrice
  withCRO
  buyer {
    id
  }
  seller {
    id
  }
`

export const getCollectionBaseFields = () => `
  id
  name
  symbol
  active
  totalTrades
  totalVolumeCRO
  numberTokensListed
  creatorAddress
  tradingFee
  creatorFee
  whitelistChecker
`

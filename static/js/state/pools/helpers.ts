/* eslint-disable no-debugger */
import { ChainId } from '@madmeerkat/sdk'
import BigNumber from 'bignumber.js'
import { useFoundOnInactiveList } from 'hooks/Tokens'
import { deserializeFarm } from 'state/farms/hooks'
import { SerializedFarm, DeserializedPool, SerializedPool } from 'state/types'
import { deserializeToken } from 'state/user/hooks/helpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'

type UserData =
  | DeserializedPool['userData']
  | {
    allowance: number | string
    stakingTokenBalance: number | string
    stakedBalance: number | string
    pendingReward: number | string
  }

export const transformUserData = (userData: UserData) => {
  return {
    allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
    stakingTokenBalance: userData ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO,
    stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
    pendingReward: userData ? new BigNumber(userData.pendingReward) : BIG_ZERO,
  }
}

export const transformPool = (pool: SerializedPool): DeserializedPool => {
  const { totalStaked, stakingLimit, userData, stakingToken, earningToken, ...rest } = pool

  return {
    ...rest,
    stakingToken: deserializeToken(stakingToken),
    earningToken: deserializeToken(earningToken),
    userData: transformUserData(userData),
    totalStaked: new BigNumber(totalStaked),
    stakingLimit: new BigNumber(stakingLimit),
  }
}

export const getTokenPricesFromFarm = (farms: SerializedFarm[]) => {
  return farms.reduce((prices, farm) => {
    const quoteTokenAddress = farm.quoteToken.address.toLocaleLowerCase()
    const tokenAddress = farm.token.address.toLocaleLowerCase()
    /* eslint-disable no-param-reassign */
    if (!prices[quoteTokenAddress]) {
      prices[quoteTokenAddress] = new BigNumber(farm.quoteTokenPriceBusd).toNumber()
    }
    if (!prices[tokenAddress]) {
      prices[tokenAddress] = new BigNumber(farm.tokenPriceBusd).toNumber()
    }
    /* eslint-enable no-param-reassign */
    return prices
  }, {})
}

export const getLpPricesFromFarm = (farms: SerializedFarm[]) => {
  return farms.reduce((prices, farm) => {
    const dfarm = deserializeFarm(farm)

    const farmTokenPriceInUsd = new BigNumber(farm.tokenPriceBusd)
    let lpTokenPrice = BIG_ZERO

    if (dfarm.lpTotalSupply.gt(0) && dfarm.lpTotalInQuoteToken.gt(0)) {
      // Total value of base token in LP
      const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(dfarm.tokenAmountTotal)
      // Double it to get overall value in LP
      const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
      // Divide total value of all tokens, by the number of LP tokens
      const totalLpTokens = getBalanceAmount(dfarm.lpTotalSupply)
      lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
      // eslint-disable-next-line no-param-reassign
      prices[farm.lpAddresses[ChainId.MAINNET].toLocaleLowerCase()] = lpTokenPrice.toNumber()
    }
    return prices
  }, {})
}

export const TokenPriceFromAPI = (mmfPrice, croPrice) => {
  let tokenPriceMap = {}

  // kept lowercase explicitly
  const tokenMaps = {
    '0x97749c9b61f878a880dfe312d2594ae07aed7656':
      '0x97749c9B61F878a880DfE312d2594AE07AEd7656_0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', // MMF-usdc
    '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23': '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23_0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', // wcro-usdc
    '0x3a1138075bd97a33f23a87824b811146fa44288e':
      '0x3A1138075bd97a33F23A87824b811146FA44288E_0xF2001B145b43032AAF5Ee2884e456CCd805F677D',
    '0x3405a1bd46b85c5c029483fbecf2f3e611026e45':
      '0x3405A1bd46B85c5C029483FbECf2F3E611026e45_0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    '0xa0c3c184493f2fae7d2f2bd83f195a1c300fa353':
      '0x97749c9B61F878a880DfE312d2594AE07AEd7656_0xa0C3c184493f2Fae7d2f2Bd83F195a1c300FA353',
    '0xcc57f84637b441127f2f74905b9d99821b47b20c':
      '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59_0xCc57F84637B441127f2f74905b9d99821b47b20c',
    '0x7d30c36f845d1dee79f852abf3a8a402fadf3b53':
      '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23_0x7D30c36f845d1dEe79f852abF3A8A402fAdF3b53',
    '0xa57a7b5f8067156c2dbb06cf5e4d8acef17aee64':
      '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23_0xa57a7B5F8067156C2DbB06cf5e4d8aCEF17aeE64',
    '0xc4a174ccb5fb54a6721e11e0ca961e42715023f9':
      '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23_0xC4a174cCb5fb54a6721e11e0Ca961e42715023F9'
  }

  // '0xc2f62bd1416845f606c5e48181743f7128a30ee3':
  // '0x065DE42E28E42d90c2052a1B49e7f83806Af0e1F_0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23'

  // const prices = {
  //   "0x3a1138075bd97a33f23a87824b811146fa44288e": new BigNumber(3.25).toNumber(),
  //   "0x1066c6753ffaf8540f691643a6d683e23599c4ab": new BigNumber(3.25*1.92).toNumber(),
  //   "0xa57a7b5f8067156c2dbb06cf5e4d8acef17aee64": new BigNumber(0.008412).toNumber(),
  // }
  
  // return prices

  return fetch('https://api.mm.finance/api/pairs')
    .then((res) => {
      return res.json()
    })
    .then((x) => {
      // const { data, error } = x
      const data = x
      // if (error) throw new Error('API failed')
      const prices = {
      }

      Object.keys(tokenMaps).forEach((token) => {
        // LP 
        // debugger
        const lpData = data[tokenMaps[token]]
        if (!lpData) return
        
        if (lpData && token === lpData.pair_address.toLocaleLowerCase()) {
          prices[token] = new BigNumber(lpData.price).toNumber()
          return
        }
        

        // base adderss
        if (token === lpData.base_address.toLocaleLowerCase()) {
          // Staking LP
          if (token === '0x3a1138075bd97a33f23a87824b811146fa44288e') {
            prices['0x1066c6753ffaf8540f691643a6d683e23599c4ab'] = new BigNumber(
              lpData.price,
            ).toNumber()
          }

          // BISON-CRO
          if (token === "0x3405a1bd46b85c5c029483fbecf2f3e611026e45") {
            prices[token] = new BigNumber(croPrice).multipliedBy(new BigNumber(
              lpData.price,
            )).toNumber()

            return
          }

          prices[token] = new BigNumber(lpData.price).toNumber()
        }
        // quote address
        else {
          if (token === '0xa0c3c184493f2fae7d2f2bd83f195a1c300fa353' || token === "0x3405a1bd46b85c5c029483fbecf2f3e611026e45") {
            prices[token] = new BigNumber(mmfPrice).dividedBy(new BigNumber(
              lpData.price,
            )).toNumber()

            return
          }

          // MOON-CRO
          if (token === "0x7d30c36f845d1dee79f852abf3a8a402fadf3b53" || token === '0xa57a7b5f8067156c2dbb06cf5e4d8acef17aee64') {
            prices[token] = new BigNumber(croPrice).multipliedBy(new BigNumber(1 / data[tokenMaps[token]].price)).toNumber()
            return
          }

          if (token === "0xc4a174ccb5fb54a6721e11e0ca961e42715023f9") {
            prices[token] = new BigNumber(croPrice).multipliedBy(new BigNumber(1 / data[tokenMaps[token]].price)).toNumber()
            return
          }

          prices[token] = new BigNumber(1 / data[tokenMaps[token]].price).toNumber()
        }
      })

      tokenPriceMap = { ...tokenPriceMap, ...prices }
      return tokenPriceMap
    })
    .catch((err) => {
      console.error(err)
      return {}
    })

  // return { allLPData, tokenPriceMap }
}

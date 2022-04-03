import BigNumber from 'bignumber.js'
import erc721ABI from 'config/abi/mmbToken.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { DeserializedFarmConfig, NFTConfig } from 'config/constants/types'
import _ from 'lodash'

export const fetchBalanceOfCollection = async (account: string, nftsToFetch: NFTConfig[]) => {
  const calls = nftsToFetch.map((nft) => {
    return {
      address: nft.address,
      name: 'balanceOf',
      params: [account],
    }
  })

  const balanceOf = await multicall(erc721ABI, calls)
  const deepArray = balanceOf.map((numberOf, index) => {
    return { series: nftsToFetch[index].series, value: new BigNumber(numberOf).toNumber() }
  })

  return deepArray
}

export const fetchTokenIds = async (
  account: string,
  nftsToFetch: NFTConfig[],
  collectionBalances: { series: number; value: number }[],
) => {
  const calls = collectionBalances.map((item, index) => {
    const newCalls = []
    const numberOwned = new BigNumber(item.value).toNumber()
    for (let i = 0; i < numberOwned; i++) {
      const data = {
        address: nftsToFetch[index].address,
        name: 'tokenOfOwnerByIndex',
        params: [account, i],
      }
      newCalls.push(data)
    }
    return newCalls
  })

  const promises = calls.map((item) => multicall(erc721ABI, item))

  const results = await Promise.all(promises)

  return results.map((item, index) => {
    return {
      series: collectionBalances[index].series,
      value: item?.map((each) => new BigNumber(each).toNumber()),
    }
  })
}

export const fetchNFTUserInventory = async (tokenIds: { series: number; value: number[] }[]) => {
  const promises = tokenIds.map((item) => {
    return fetch(`https://api.madmeerkat.io/api/tokens/cro/staking?tokens=${item.value.join(',')}`)
  })

  const results = await Promise.all(promises)
  const json = await Promise.all(results.map((item) => item.json()))

  const finalResults = json.map((item, index) => {
    return {
      series: tokenIds[index].series,
      value: item,
    }
  })
  return finalResults
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: DeserializedFarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc721ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: DeserializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: DeserializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingMeerkat',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

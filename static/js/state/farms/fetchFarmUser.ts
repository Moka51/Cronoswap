import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'
import { REVERSE_NFT_ADDRESS_MAP } from 'config/constants/nfts'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
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

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
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

export const fetchFarmUserNftSlots = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getSlots',
      params: [account, farm.pid],
    }
  })

  const rawInfo = await multicall(masterchefABI, calls)

  return rawInfo
}

export const fetchFarmUserNftTokenIds = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getTokenIds',
      params: [account, farm.pid],
    }
  })
  const addressCalls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getSlots',
      params: [account, farm.pid],
    }
  })

  const rawInfo = await multicall(masterchefABI, calls)
  const addressInfo = await multicall(masterchefABI, addressCalls)
  const parsedTokens = rawInfo.map((tokens, index) => {
    const addresses = addressInfo[index]
    return tokens.map((item, _index) => {
      return {
        series: REVERSE_NFT_ADDRESS_MAP[addresses[_index]],
        id: new BigNumber(item._hex).toJSON(),
      }
    })
  })

  return parsedTokens
}

export const fetchFarmUserBoost = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getBoost',
      params: [account, farm.pid],
    }
  })

  const rawInfo = await multicall(masterchefABI, calls)

  const parsedEarnings = rawInfo.map((earnings) => {
    return new BigNumber(earnings?.[0]._hex).toJSON()
  })

  return parsedEarnings
}

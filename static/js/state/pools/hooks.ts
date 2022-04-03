import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import { CRONOS_BLOCK_TIME } from 'config'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCrocVaultPublicData,
  fetchCrocVaultUserData,
  fetchCrocVaultFees,
  fetchPoolsStakingLimitsAsync,
} from '.'
import { State, DeserializedPool } from '../types'
import { transformPool } from './helpers'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchMMOPools = () => {

  const [mmoPools, setMMOPools] = useState([])
  const [mmoPoolTVL, setPoolTVL] = useState(0)

  useEffect(() => {
    fetch("https://vaults.mm.finance/api/vaults/public").then(res => { 
      return res.json()
    }).then(x => {
      const { vaultData } = x
      setMMOPools(vaultData)


      // add all tvl
      let total = 0 
      if (vaultData && vaultData.length > 0) { 
        vaultData.forEach(el => {
          total += parseFloat(el.vault.tvlOfPool)
        })
        setPoolTVL(total)
      }
    })
  }, [])

  return {mmoPools, mmoPoolTVL}
}

export const useFetchUserPools = (account) => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useFetchCrocVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCrocVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchCrocVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchCrocVaultFees())
  }, [dispatch])
}

export const useCrocVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCrocInVault: totalCrocInVaultAsString,
    estimatedCrocBountyReward: estimatedCrocBountyRewardAsString,
    totalPendingCrocHarvest: totalPendingCrocHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      cakeAtLastUserAction: cakeAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.cakeVault)

  const estimatedCrocBountyReward = useMemo(() => {
    return new BigNumber(estimatedCrocBountyRewardAsString)
  }, [estimatedCrocBountyRewardAsString])

  const totalPendingCrocHarvest = useMemo(() => {
    return new BigNumber(totalPendingCrocHarvestAsString)
  }, [totalPendingCrocHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCrocInVault = useMemo(() => {
    return new BigNumber(totalCrocInVaultAsString)
  }, [totalCrocInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const cakeAtLastUserAction = useMemo(() => {
    return new BigNumber(cakeAtLastUserActionAsString)
  }, [cakeAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCrocInVault,
    estimatedCrocBountyReward,
    totalPendingCrocHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      cakeAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

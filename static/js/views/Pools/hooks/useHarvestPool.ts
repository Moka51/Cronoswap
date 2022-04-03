import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { harvestFarm } from 'utils/calls'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useMasterchef, useSousChef } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const SPECIAL_POOLS = ['0x814426B632f101E7EfCEF1399B3A0b042429a4D9', '0x2e9A5870E2B58EE7598feCaa7De299A9080d3D08', '0xAc906b19A35e1C5022106A0EFaF6Bc57511581b6', '0x62Fe1672c809fD282717511E96A1B9aD848ec05D']

const harvestPool = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  const tx = await sousChefContract.deposit('0', {
    ...options,
    gasPrice,
    gasLimit: SPECIAL_POOLS.includes(sousChefContract.address) ? '2000000' : options.gasLimit, // NOTE: shitty pool requires shitty workaround
  })
  const receipt = await tx.wait()
  return receipt.status
}

const harvestPoolBnb = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  const tx = await sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

const useHarvestPool = (sousId, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvestFarm(masterChefContract, 0)
    } else if (isUsingBnb) {
      await harvestPoolBnb(sousChefContract)
    } else {
      await harvestPool(sousChefContract)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export default useHarvestPool

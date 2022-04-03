import BigNumber from 'bignumber.js'
import { convertSharesToCroc } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import { getCrocVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestCrocRewards',
      'calculateTotalPendingCrocRewards',
    ].map((method) => ({
      address: getCrocVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedCrocBountyReward], [totalPendingCrocHarvest]] = await multicallv2(
      cakeVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalCrocInVaultEstimate = convertSharesToCroc(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCrocInVault: totalCrocInVaultEstimate.cakeAsBigNumber.toJSON(),
      estimatedCrocBountyReward: new BigNumber(estimatedCrocBountyReward.toString()).toJSON(),
      totalPendingCrocHarvest: new BigNumber(totalPendingCrocHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCrocInVault: null,
      estimatedCrocBountyReward: null,
      totalPendingCrocHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getCrocVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(cakeVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData

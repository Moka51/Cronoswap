import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { getNullAddress } from 'utils/addressHelpers'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const referralCode = localStorage.getItem('referral') ? localStorage.getItem('referral') : getNullAddress()
  if (pid === 0) {
    const tx = await masterChefContract.deposit(0, value, referralCode, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value, referralCode, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()
  const tx = await masterChefContract.deposit(pid, '0', getNullAddress(), { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

/**
 * Allows depositing NFT into slot, need to ensure TOKEN approval first
 * @param masterChefContract
 * @param nft address of NFT that you are depositing
 * @param tokenId tokenId of NFT that you are depositing
 * @param slot between 1 - 3 for each slot
 * @returns
 */
export const depositFarmNFT = async (masterChefContract, nft: string, tokenId: string, slot: string, pid: number) => {
  const estimate = await masterChefContract.estimateGas.depositNFT(nft, tokenId, slot, pid)
  const tx = await masterChefContract.depositNFT(nft, tokenId, slot, pid, { gasLimit: estimate.mul(2000).div(1000) })
  const receipt = await tx.wait()
  return receipt.status
}

/**
 * Allows withdrawing NFT from slot
 * @param masterChefContract
 * @param slot between 1 - 3 for each slot
 * @returns
 */
export const withdrawFarmNFT = async (masterChefContract, slot: string, pid: number) => {
  const estimate = await masterChefContract.estimateGas.withdrawNFT(slot, pid)
  const tx = await masterChefContract.withdrawNFT(slot, pid, { gasLimit: estimate.mul(2000).div(1000) })
  const receipt = await tx.wait()
  return receipt.status
}

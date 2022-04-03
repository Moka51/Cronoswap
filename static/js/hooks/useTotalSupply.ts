import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from '@madmeerkat/sdk'
import { Underline } from 'react-feather'
import { useTokenContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

// const ALLOWED_TOKENS = ['MMF', 'CROISSANT']

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]
  // console.log(useSingleCallResult(contract, 'totalSupply'))
  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export default useTotalSupply

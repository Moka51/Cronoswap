import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Text, Flex, Heading } from '@crocswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { useCrocReferralContract } from 'hooks/useContract'
import { formatUnits } from '@ethersproject/units'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BIG_TEN } from 'utils/bigNumber'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const ReferralCard = () => {
  const [referralCount, setReferralCount] = useState(0)
  const [referralCommisions, setReferralCommissions] = useState(0)
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  // const {
  //   estimatedCrocBountyReward,
  //   fees: { callFee },
  // } = useCrocVault()

  // const cakePriceBusd = usePriceMMFBusd()

  const contract = useCrocReferralContract()

  const claimsQuery = useCallback(async () => {
    if (account && contract) {
      const referrals = await contract.referralsCount(account)
      const commissions = await contract.totalReferralCommissions(account)
      setReferralCount(+formatUnits(referrals, 0))
      setReferralCommissions(+formatUnits(commissions, 0))
    }
  }, [account, contract])

  useEffect(() => {
    claimsQuery()
  }, [claimsQuery])

  return (
    <>
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                Total Referrals
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>
                <Balance fontSize="20px" bold value={referralCount} decimals={0} />
              </Heading>
              <Balance
                fontSize="12px"
                color="textSubtle"
                value={new BigNumber(referralCommisions).div(BIG_TEN.pow(18))?.toNumber()}
                decimals={3}
                unit=" MMF"
                prefix="~"
              />
            </Flex>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default ReferralCard

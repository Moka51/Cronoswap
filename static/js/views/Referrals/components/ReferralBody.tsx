/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Flex, Button } from '@crocswap/uikit'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import base64url from 'base64url'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const ReferralBody = () => {
  const { account } = useActiveWeb3React()
  const [copied, setCopied] = useState(false)

  return (
    <>
      {account && (
        <StyledCard mt='16px'>
          <CardBody>
            <Flex alignItems="center" justifyContent="space-between">
              <Text>
                Refer & gain 1% on top of your friends' earnings, e.g., let us say your friend just harvested 1,000 $MMF tokens. An additional 1% ~ 10 $MMF tokens will be minted and sent directly to you! Your friend keeps 100% of his earnings, and you get 1% on top of it. Referral works only for farms and single staking of $MMF.
                <br />
        Do note that referral codes are cached in the user's browser. Your friend has to be using the same browser that he used to click on the referral link to deposit his asset. Your friend has to deposit his holdings into the farm after clicking on your referral link, not before.
              </Text>
            </Flex>
          </CardBody>
        </StyledCard>
      )}
    </>
  )
}

export default ReferralBody

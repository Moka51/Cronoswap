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

const ReferralLink = () => {
  const { account } = useActiveWeb3React()
  const [copied, setCopied] = useState(false)

  return (
    <>
      {account && (
        <StyledCard>
          <CardBody>
            <Flex alignItems="center" justifyContent="space-between">
              <Text textAlign="center" width="100%">
                <a href={`https://mm.finance/?ref=${base64url.encode(account)}`}>
                  https://mm.finance/?ref={base64url.encode(account)}
                </a>
              </Text>
            </Flex>
            <Flex alignItems="left" justifyContent="center" mt="12px">
              <CopyToClipboard
                text={`https://mm.finance/?ref=${base64url.encode(account)}`}
                onCopy={() => setCopied(true)}
              >
                <Button scale="sm">{copied ? 'Copied' : 'Click To Copy'}</Button>
              </CopyToClipboard>
            </Flex>
          </CardBody>
        </StyledCard>
      )}
    </>
  )
}

export default ReferralLink

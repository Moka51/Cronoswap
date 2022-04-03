import React from 'react'
import { Heading, Flex, Image, Text } from '@crocswap/uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import StyledPageHeaderWrap from 'components/PageHeader/StyledPageHeader'
import styled from 'styled-components'
import ReferralCard from './components/ReferralCard'
import ReferralBody from './components/ReferralBody'
import ReferralLink from './components/ReferralLink'

const EmptyContainer = styled.div`
  min-height: calc(40vh);
`

const Referrals: React.FC = () => {
  const { account } = useActiveWeb3React()

  return (
    <>
      <StyledPageHeaderWrap bgType="meerkat_half">
        <Flex justifyContent="space-between" pt="24px" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              Referrals
            </Heading>
            <Heading scale="md" color="secondary">
              Share the referral link, Earn 1% of your friends earnings.
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <ReferralCard />
          </Flex>
        </Flex>

        <Flex flex="0" justifyContent="space-between" alignItems="center" mt={['24px', null, '0']}>
              <ReferralBody />
        </Flex>
        
        {account && (
          <Page style={{ padding: '24px 0px', overflowWrap: 'anywhere' }}>
            <Flex flex="0" justifyContent="space-between" alignItems="center" mt={['24px', null, '0']}>
              <ReferralLink />
            </Flex>
          </Page>
        )}
         <Flex flex="0" justifyContent="space-between" alignItems="center" mt={['24px', null, '0']} />
        {/* <EmptyContainer /> */}
      </StyledPageHeaderWrap>

      {/* <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="background" mb="24px">
              Referrals
            </Heading>
            <Heading scale="md" color="text">
              Share the referral link, Earn 1% of your friends earnings.
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <ReferralCard />
          </Flex>
        </Flex>
        {account && (
              <Page style={{ padding: '20px', overflowWrap: 'anywhere' }}>
                <Flex flex="0" justifyContent="space-between" alignItems="center" mt={['24px', null, '0']}>
                  <ReferralLink />
                </Flex>
              </Page>
            )}
      </PageHeader>
      <Page /> */}
    </>
  )
}

export default Referrals

import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, CloseIcon, IconButton, useMatchBreakpoints } from '@crocswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePhishingBannerManager } from 'state/user/hooks'

const Container = styled(Flex)`
  overflow: hidden;
  height: 100%;
  padding: 12px;
  align-items: center;
  background: linear-gradient(180deg, #ffdb58 0%, #b8860b 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(180deg, #ffdb58 0%, #b8860b 100%);
  }
`

const InnerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SpeechBubble = styled.div`
  background: rgba(39, 38, 44, 0.4);
  border-radius: 16px;
  padding: 8px;
  width: 60%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & ${Text} {
    flex-shrink: 0;
    margin-right: 4px;
  }
`

const PhishingWarningBanner: React.FC = () => {
  const { t } = useTranslation()
  const [, hideBanner] = usePhishingBannerManager()
  const { isMobile, isMd } = useMatchBreakpoints()
  const warningText = t("please make sure you're visiting https://mm.finance - check the URL carefully.")
  const warningTextAsParts = warningText.split(/(https:\/\/mm.finance)/g)
  const warningTextComponent = (
    <>
      <Text as="span" color="#353839" small bold textTransform="uppercase" style={{ paddingRight: '4px' }}>
        {t('Phishing warning: ')}
      </Text>
      {warningTextAsParts.map((text) => (
        <Text
          style={{ paddingLeft: '4px', paddingRight: '4px' }}
          small={text !== 'https://mm.finance'}
          as="span"
          bold={text === 'https://mm.finance'}
          color={text === 'https://mm.finance' ? '#FFFFFF' : '#1a1110'}
        >
          {text}
        </Text>
      ))}
    </>
  )
  return (
    <Container>
      {isMobile || isMd ? (
        <>
          <Box>{warningTextComponent}</Box>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      ) : (
        <>
          <InnerContainer>
            {/* <img src="/images/decorations/phishing-warning-bunny.png" alt="phishing-warning" width="92px" /> */}
            {warningTextComponent}
          </InnerContainer>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      )}
    </Container>
  )
}

export default PhishingWarningBanner

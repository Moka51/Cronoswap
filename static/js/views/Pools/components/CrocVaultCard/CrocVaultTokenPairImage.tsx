import React from 'react'
import { TokenPairImage, ImageProps } from '@crocswap/uikit'
import { mainnetTokens } from 'config/constants/tokens'

const CrocVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.mmf.address}.svg`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default CrocVaultTokenPairImage

import React, { ReactNode } from 'react'
import styled from 'styled-components'

import PageHeader from './PageHeader'

const StyledPageHeader = styled(PageHeader)<{
  bgType: string
  isQuarterPage?: boolean
  isHalfPage?: boolean
  isDark?: boolean
}>`
  position: relative;
  min-height: ${(x) => (x.isQuarterPage ? 'undefined' : x.isHalfPage ? '60vh' : '88vh')};
  background:  ${(x) =>
    x.bgType === 'burrow'
      ? "url('/images/meerkat/meerkat2.jpg');"
      : !x.isDark
      ? "url('/images/meerkat/meerkat_light.png');"
      : x.bgType === 'meerkat_half'
      ? "url('/images/meerkat/meerkat_half.jpg');"
      : "url('/images/meerkat/meerkat.gif');"} 
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: -1px;
  .bg {
    position: absolute;
    max-width: 1200px;
    width: 100%;
    height: 400px;
    pointer-events: none;
    & > png {
      position: absolute;
      z-index: 0;
      right: 66px;
      bottom: 20px;
      pointer-events: none;
    }
  }
`

const StyledPageHeaderWrap = ({
  children,
  bgType,
  isQuarterPage,
  isHalfPage,
}: {
  children?: ReactNode
  bgType?: string
  isQuarterPage?: boolean
  isHalfPage?: boolean
}) => (
  <StyledPageHeader bgType={bgType} isQuarterPage={isQuarterPage} isHalfPage={isHalfPage}>
    {children}
  </StyledPageHeader>
)

export default StyledPageHeaderWrap

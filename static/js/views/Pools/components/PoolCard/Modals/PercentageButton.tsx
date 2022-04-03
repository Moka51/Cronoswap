import React from 'react'
import styled from 'styled-components'
import { Button } from '@crocswap/uikit'

interface PercentageButtonProps {
  onClick: () => void
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const PercentageButton: React.FC<PercentageButtonProps> = ({ children, onClick }) => {
  return (
    <StyledButton scale="xs" mx="2px" p="16px 16px" variant="primary" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default PercentageButton

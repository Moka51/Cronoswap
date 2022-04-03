import React from 'react'
import { Flex, IconButton, CogIcon, useModal } from '@crocswap/uikit'
import SettingsModal from './SettingsModal'

interface SettingsProps {
  selectedColor: string
}

const GlobalSettings: React.FC<SettingsProps> = ({selectedColor}) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px" id="open-settings-dialog-button">
        <CogIcon height={24} width={24} color={selectedColor} />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings

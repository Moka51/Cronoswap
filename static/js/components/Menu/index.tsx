import React from 'react'
import { useLocation } from 'react-router'
import { Menu as UikitMenu, CheckmarkIcon } from '@crocswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import useTheme from 'hooks/useTheme'
import { usePriceMMFBusd } from 'state/farms/hooks'
import { usePhishingBannerManager } from 'state/user/hooks'
import styled, { keyframes } from 'styled-components'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'

const AuditContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: inline-flex;
  }
`

const CertikContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    display: inline-flex;
    align-items: center;
    padding-top: 3px;
  }
`

const AuditLogo = styled.img<{ width: string }>`
  height: auto;
  width: ${({ width }) => width};
  margin-right: 10px;
`

const greenPulseAnim = () => keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(49, 208, 170, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 7px rgba(49, 208, 170, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(49, 208, 170, 0);
  }
`

const DoneIcon = styled.div`
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  margin: 10px;
  height: 7px;
  width: 7px;
  transform: scale(1);
  background: ${({ theme }) => theme.colors.success};
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  animation: ${greenPulseAnim} 2s infinite;
`

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceMMFBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()
  const [showPhishingWarningBanner] = usePhishingBannerManager()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  return (
    <UikitMenu
      globalMenu={
        <>
          <AuditContainer>
            <a href="https://mmfinance.gitbook.io/docs/audit" target="_blank" rel="noreferrer">
              <CertikContainer>
                <CheckmarkIcon margin="3px 3px 3px 0" color="success" />
                {/* <DoneIcon /> */}
                <div style={{ color: '#A5A5A5', paddingRight: '8px' }}>Audit</div>
              </CertikContainer>
            </a>
            <GlobalSettings selectedColor="secondary" />
          </AuditContainer>
        </>
      }
      userMenu={<UserMenu />}
      banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
      isDark
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config(t)}
      subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
      footerLinks={footerLinks(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      buyCrocLabel={t('Buy MMF')}
      {...props}
    />
  )
}

export default Menu

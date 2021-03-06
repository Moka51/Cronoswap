import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
import { IQRCodeModal } from '@deficonnect/types'
import { formatIOSMobile, isAndroid, isIOS, saveMobileLinkInfo } from '@deficonnect/browser-utils'
import DeFiLinkIconLight from './assets/defi-link-icon-light'
import ConnectStepCameraIcon from './assets/connect-step-camera-icon'
import LogoIcon from './assets/defi-link-icon'
import FeatureGlobeIcon from './assets/feature-globe-icon'
import FeatureLinkIcon from './assets/feature-link-icon'
import FeatureLockIcon from './assets/feature-lock-icon'
import { formatToCWEURI, replaceUriProtocol } from './tools/url-tools'
import QRCode from 'qrcode'
import { styles, BannerStyles } from './InstallExtensionModal.styles'

const iOSRegistryEntry = {
  name: 'Crypto.com DeFi Wallet',
  shortName: 'DeFi Wallet',
  color: 'rgb(17, 153, 250)',
  logo: './logos/wallet-crypto-defi.png',
  universalLink: 'https://wallet.crypto.com',
  deepLink: 'cryptowallet:',
}

const openDeeplinkOrInstall = (deepLink: string, installURL: string): void => {
  if (isIOS()) {
    window.open(deepLink)
  } else {
    let isBlur = false
    window.addEventListener('blur', () => {
      isBlur = true
    })
    window.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isBlur = true
      }
    })
    window.location.href = deepLink
    setTimeout(() => {
      if (isBlur) return
      window.open(installURL)
    }, 1500)
  }
}

const downloadAppURL = 'https://bit.ly/3Bk4wzE'
export const InstallExtensionQRCodeModal: IQRCodeModal = {
  open: function (uri: string, cb: Function, opts?: any) {
    const CWEURI = formatToCWEURI(uri) + '&role=dapp'
    if (isIOS()) {
      const singleLinkHref = formatIOSMobile(CWEURI, iOSRegistryEntry)
      saveMobileLinkInfo({ name: 'Crypto.com DeFi Wallet', href: singleLinkHref })
      openDeeplinkOrInstall(singleLinkHref, downloadAppURL)
      return
    }
    if (isAndroid()) {
      const lowercaseURI = replaceUriProtocol(CWEURI, 'cwe') + '&role=dapp'
      saveMobileLinkInfo({
        name: 'Unknown',
        href: lowercaseURI, // adnroid side only support lowercase
      })
      openDeeplinkOrInstall(lowercaseURI, downloadAppURL)
      return
    }
    const body = document.body
    const popup = document.createElement('div')
    popup.id = 'cryptoconnect-extension'
    body.appendChild(popup)
    ReactDOM.render(<InstallExtensionModal appElement={popup} uri={CWEURI} closeCallback={cb} />, popup)
  },
  close: function () {
    window.dispatchEvent(new Event('InstallExtensionQRCodeModal_Event_close'))
  },
}

export const InstallExtensionModal: React.FC<{
  appElement: HTMLElement
  uri: string
  closeCallback: Function
}> = ({ appElement, uri, closeCallback }) => {
  const [isOpen, setisOpen] = useState(true)
  const [qrcodeImageURL, setQRCodeImageURL] = useState('')
  ReactModal.setAppElement(appElement)
  const closeModal = useCallback(() => {
    appElement.parentElement?.removeChild(appElement)
    setisOpen(false)
  }, [appElement])
  const closeModalClick = useCallback(() => {
    closeCallback()
    closeModal()
  }, [closeCallback, closeModal])
  useEffect(() => {
    window.addEventListener('InstallExtensionQRCodeModal_Event_close', closeModal)
    return (): void => {
      window.removeEventListener('InstallExtensionQRCodeModal_Event_close', closeModal)
    }
  }, [closeModal])
  useMemo(() => {
    QRCode.toDataURL(uri, (_err: any, url: string) => {
      setQRCodeImageURL(url)
    })
  }, [uri])

  const onInstallButtonClick = useCallback(() => {
    window.open('https://wallet.crypto.com/api/v1/extension/install')
  }, [])
  const onTermsClick = useCallback(() => {
    window.open('https://crypto.com/document/ncw_tnc')
  }, [])
  const onPrivacyClick = useCallback(() => {
    window.open('https://crypto.com/privacy/ncw')
  }, [])
  const onDownloadClick = useCallback(() => {
    window.open('https://bit.ly/3Bk4wzE')
  }, [])

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      style={{
        content: {
          background: '#00000000',
          border: 'none',
          margin: '40px',
          display: 'flex',
          position: 'relative',
          padding: '0px',
        },
        overlay: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(12, 12, 15, 0.7)',
          zIndex: 1000,
        },
      }}
      onRequestClose={closeModalClick}
    >
      <div style={styles.container}>
        <div style={styles.containerLeft}>
          <div style={styles.header}>
            <LogoIcon />
            <div style={styles.headerText}>crypto.com</div>
            <div style={styles.headerTextDivide} />
            <div style={styles.headerText}>WALLET EXTENSION</div>
          </div>
          <div style={styles.title}>Access DApps on desktop by connecting DeFi Wallet to Wallet Extension</div>
          <div style={styles.feature}>
            <FeatureLinkIcon />
            <div style={styles.featureText}>Stable connection to DApps</div>
          </div>
          <div style={styles.feature}>
            <FeatureLockIcon />
            <div style={styles.featureText}>Secure signing via DeFi Wallet</div>
          </div>
          <div style={styles.feature}>
            <FeatureGlobeIcon />
            <div style={styles.featureText}>Smooth App navigation with DApp connection</div>
          </div>
          <button style={styles.installButton} onClick={onInstallButtonClick}>
            Install DeFi Wallet Extension
          </button>
        </div>
        <div style={styles.containerRight}>
          <img style={styles.rightQRcode} src={qrcodeImageURL} alt="qrcode" />
          <span style={styles.rightTitle}>Scan to Connect</span>
          <div style={styles.rightStep.container}>
            <div style={styles.rightStep.desc}>??? Open DeFi Wallet Mobile App</div>
          </div>
          <div style={styles.rightStep.container}>
            <div style={styles.rightStep.desc}>??? Tap</div>
            <ConnectStepCameraIcon style={styles.rightStep.camera} />
            <div style={styles.rightStep.desc}>to switch on the camera</div>
          </div>
          <div style={styles.rightStep.container}>
            <div style={styles.rightStep.desc}>??? Scan the QR code above</div>
          </div>
          <div style={styles.stretchContainer} />
          <div style={styles.terms.container}>
            <div style={styles.terms.text}>Crypto.com DeFi Wallet </div>
            <div style={styles.terms.link} onClick={onTermsClick}>
              Terms & Conditions
            </div>
            <div style={styles.terms.text}>and</div>
            <div style={styles.terms.link} onClick={onPrivacyClick}>
              Privacy Notice
            </div>
          </div>
          <DownloadAppBanner onDownloadClick={onDownloadClick} />
        </div>
      </div>
    </ReactModal>
  )
}

const DownloadAppBanner: React.FC<{ onDownloadClick: MouseEventHandler }> = ({ onDownloadClick }) => {
  return (
    <div style={BannerStyles.container}>
      <DeFiLinkIconLight />
      <div style={BannerStyles.textContainer}>
        <div style={BannerStyles.title}>Crypto.com DeFi Wallet</div>
        <div style={BannerStyles.desc}>Your Keys, Your Crypto.</div>
      </div>
      <button style={BannerStyles.button} onClick={onDownloadClick}>
        Download
      </button>
    </div>
  )
}

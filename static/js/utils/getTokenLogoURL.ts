// const getTokenLogoURL = (address: string) =>
//   `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`

// export default getTokenLogoURL

const getTokenLogoURL = (address: string) => `${process.env.REACT_APP_BASE_URL}/images/tokens/${address}.svg`

export default getTokenLogoURL

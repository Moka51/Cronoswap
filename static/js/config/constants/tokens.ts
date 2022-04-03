import { ChainId, Token } from '@madmeerkat/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {
  mmf: new Token(
    MAINNET,
    '0x97749c9B61F878a880DfE312d2594AE07AEd7656',
    18,
    'MMF',
    'Mad Meerkat Finance Token',
    'https://mm.finance/',
  ),
  cro: new Token(MAINNET, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'CRO', 'CRO', 'https://crypto.org/'),
  wcro: new Token(
    MAINNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://crypto.org/',
  ),
  eth: new Token(
    MAINNET,
    '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
    18,
    'ETH',
    'Wrapped Ether',
    'https://ethereum.org/en/',
  ),
  weth: new Token(
    MAINNET,
    '0xe44Fd7fCb2b1581822D0c862B68222998a0c299a',
    18,
    'WETH',
    'Wrapped Ether',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  wbtc: new Token(
    MAINNET,
    '0x062E66477Faf219F25D27dCED647BF57C3107d52',
    8,
    'WBTC',
    'Wrapped BTC',
    'https://bitcoin.org/en/',
  ),
  usdt: new Token(MAINNET, '0x66e428c3f67a68878562e79A0234c1F83c208770', 6, 'USDT', 'Tether USD', 'https://tether.to/'),
  mmo: new Token(
    MAINNET,
    '0x50c0C5bda591bc7e89A342A3eD672FB59b3C46a7',
    18,
    'MMO',
    'MM Optimiser',
    'https://vaults.mm.finance/vault',
  ),
  mimas: new Token(
    MAINNET,
    '0x10C9284E6094b71D3CE4E38B8bFfc668199da677',
    18,
    'MIMAS',
    'Mimas finance',
    'https://mimas.finance/',
  ),
  dai: new Token(
    MAINNET,
    '0xF2001B145b43032AAF5Ee2884e456CCd805F677D',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://makerdao.com/',
  ),
  liq: new Token(
    MAINNET,
    '0xABd380327Fe66724FFDa91A87c772FB8D00bE488',
    18,
    'LIQ',
    'Liquidus',
    'https://liquidus.finance/',
  ),
  dark: new Token(
    MAINNET,
    '0x83b2AC8642aE46FC2823Bc959fFEB3c1742c48B5',
    18,
    'DARK',
    'DARKCRYPTO SHARE',
    'https://www.darkcrypto.finance/',
  ),
  sky: new Token(
    MAINNET,
    '0x9D3BBb0e988D9Fb2d55d07Fe471Be2266AD9c81c',
    18,
    'SKY',
    'DARKCRYPTO SHARE',
    'https://www.darkcrypto.finance/',
  ),
  croissant: new Token(
    MAINNET,
    '0xa0C3c184493f2Fae7d2f2Bd83F195a1c300FA353',
    18,
    'CROISSANT',
    'Croissant games',
    'https://croissant.games/',
  ),
  mino: new Token(
    MAINNET,
    '0x3A1138075bd97a33F23A87824b811146FA44288E',
    9,
    'MINO',
    'Minotaur money',
    'https://minotaur.money/',
  ),
  wsmino: new Token(
    MAINNET,
    '0x1066c6753FFaf8540F691643A6D683e23599c4ab',
    18,
    'wsMINO',
    'Minotaur money',
    'https://minotaur.money/',
  ),
  bison: new Token(
    MAINNET,
    '0x3405A1bd46B85c5C029483FbECf2F3E611026e45',
    18,
    'BISON',
    'BISON games',
    'https://bishares.finance/',
  ),
  gaur: new Token(MAINNET, '0x046cb616d7a52173e4Da9efF1BFd590550aa3228', 18, 'GAUR', 'GAUR', 'https://gaur.money/'),
  gshares: new Token(
    MAINNET,
    '0x66ec6E9F61ac288f5BA661CD9a2dBe3aBf9871C9',
    18,
    'GSHARES',
    'GSHARES',
    'https://gaur.money/',
  ),
  crk: new Token(MAINNET, '0x065DE42E28E42d90c2052a1B49e7f83806Af0e1F', 9, 'CRK', 'CroKing', 'https://croking.net'),
  crp: new Token(
    MAINNET,
    '0x7b8aD6d7560FAcd1959cfb4b4163D7d297c4bFc0',
    18,
    'CRP',
    'CRO Predict',
    'https://cropredict.finance/#',
  ),
  dna: new Token(
    MAINNET,
    '0xCc57F84637B441127f2f74905b9d99821b47b20c',
    18,
    'DNA',
    'DNA Dollar',
    'https://dnadollar.com/#',
  ),
  rna: new Token(
    MAINNET,
    '0xDe9E2ADDFd3BBadB67553CDb120c6C6593b180F9',
    18,
    'RNA',
    'RNA Dollar',
    'https://dnadollar.com/#',
  ),
  moon: new Token(MAINNET, '0x7D30c36f845d1dEe79f852abF3A8A402fAdF3b53', 9, 'MOON', 'CroMoon', 'https://cromoon.net/'),
  ann: new Token(MAINNET, '0x98936Bde1CF1BFf1e7a8012Cee5e2583851f2067', 18, 'ANN', 'Annex', 'https://annex.finance/'),
  svn: new Token(MAINNET, '0x654bAc3eC77d6dB497892478f854cF6e8245DcA9', 18, 'SVN', 'Savanna', 'https://svn.finance/'),
  sphere: new Token(
    MAINNET,
    '0xc9FDE867a14376829Ab759F4C4871F67e2d3E441',
    18,
    'SPHERE',
    'SPHERE Token',
    'https://www.cronosphere.org/',
  ),
  bacc: new Token(
    MAINNET,
    '0xa57a7B5F8067156C2DbB06cf5e4d8aCEF17aeE64',
    18,
    'BACC',
    'Bored',
    'https://www.boredapecronosclub.com',
  ),
  mshare: new Token(
    MAINNET,
    '0xf8b9facB7B4410F5703Eb29093302f2933D6E1Aa',
    18,
    'MSHARE',
    'MSHARE Token',
    'https://svn.finance/',
  ),
  betify: new Token(
    MAINNET,
    '0xD465b6B4937D768075414D413e981Af0b49349Cc',
    9,
    'BETIFY',
    'BETIFY Token',
    'https://gamblefi.io/',
  ),
  cgs: new Token(
    MAINNET,
    '0x4e57e27e4166275Eb7f4966b42A201d76e481B03',
    18,
    'CGS',
    'Cougar Token',
    'https://cronosapp.cougarswap.io/',
  ),
  single: new Token(
    MAINNET,
    '0x0804702a4E749d39A35FDe73d1DF0B1f1D6b8347',
    18,
    'SINGLE',
    'Single Token',
    'https://singlefinance.io/',
  ),
  ago: new Token(
    MAINNET,
    '0x383627CaeC2CE3b36793c34B576B2e97BEDA0466',
    18,
    'AGO',
    'Agora Token',
    'https://agoracro.com/',
  ),
  bushi: new Token(
    MAINNET,
    '0xe7e479FCC3A722225fdBfA8Faea556E8a5eD904a',
    18,
    'BUSHI',
    'Bushicoins Token',
    'https://bushicro.io/',
  ),
  grve: new Token(
    MAINNET,
    '0x9885488cD6864DF90eeBa6C5d07B35f08CEb05e9',
    18,
    'GRVE',
    "Grave token",
    'https://croskull.com/'
  ),
  metf: new Token(
    MAINNET,
    '0xB8Df27c687c6af9aFE845A2aFAD2D01e199f4878',
    18,
    'METF',
    "METF token",
    'https://metf.finance/'
  ),
  goal: new Token(
    MAINNET,
    '0x00fe915a5209e74D5a88334cC2daA4541AEC8278',
    18,
    'GOAL',
    "GOAL token",
    'https://cronosfc.club/'
  ),
  srv: new Token(
    MAINNET,
    '0xfad0C1e9d37A20c32e07599B39e6279687273036',
    9,
    'SRV',
    "SRV token",
    'https://srv.finance/'
  ),
  croge: new Token(
    MAINNET,
    '0xC4a174cCb5fb54a6721e11e0Ca961e42715023F9',
    9,
    'CROGE',
    "CROGE token",
    'https://www.crogecoin.com/'
  ),
}

// FIXME tokens for testnet and mainnet
export const testnetTokens = {
  mmf: new Token(
    TESTNET,
    '0x97749c9B61F878a880DfE312d2594AE07AEd7656',
    18,
    'MMF',
    'Mad Meerkat Finance Token',
    'https://mm.finance/',
  ),
  cro: new Token(TESTNET, '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23', 18, 'CRO', 'CRO', 'https://crypto.org/'),
  wcro: new Token(
    TESTNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    'https://crypto.org/',
  ),
  eth: new Token(
    TESTNET,
    '0x441d72d584b16105FF1C68DC8bc4517F4DC13E55',
    18,
    'ETH',
    'Wrapped Ether',
    'https://ethereum.org/en/',
  ),
  weth: new Token(
    TESTNET,
    '0x441d72d584b16105FF1C68DC8bc4517F4DC13E55',
    18,
    'WETH',
    'Wrapped Ether',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    TESTNET,
    '0x321106E51b78E0E9CEBcFeC63C5250F0F3CcB82b',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  wbtc: new Token(
    TESTNET,
    '0xFFc8ce84a196420d7bCCDEe980c65364eD1f389F',
    8,
    'WBTC',
    'Wrapped BTC',
    'https://bitcoin.org/en/',
  ),
  mmo: new Token(
    TESTNET,
    '0x50c0C5bda591bc7e89A342A3eD672FB59b3C46a7',
    8,
    'MMO',
    'MM Optimiser',
    'https://vaults.mm.finance/vault',
  ),
}



const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    // return Object.keys(mainnetTokens).reduce((accum, key) => {
    //   return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    // }, {})
    return testnetTokens // FIXME avoid this mainnet override testnet hack
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()

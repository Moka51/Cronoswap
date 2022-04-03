import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MMFinance',
  description:
    'The most popular AMM on BSC by user count! Earn $MMF through yield farming or win it in the Lottery, then stake it in Swamps to earn more tokens! Initial Farm Offerings (new token launch model pioneered by MMFinance), NFTs, and more, on a platform you can trust.',
  image: 'https://mm.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('MMFinance')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('MMFinance')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('MMFinance')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('MMFinance')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('MMFinance')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('MMFinance')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('MMFinance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('MMFinance')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('MMFinance')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('MMFinance')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('MMFinance')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('MMFinance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('MMFinance')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('MMFinance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('MMFinance')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('MMFinance')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('MMFinance')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('MMFinance')}`,
      }
    case '/analytics':
      return {
        title: `${t('Overview')} | MMFinance Analytics`,
        description: 'View statistics for PancakeSwap exchanges.',
      }
    case '/analytics/pools':
      return {
        title: `${t('Pools')} | MMFinance Analytics`,
        description: 'View statistics for PancakeSwap exchanges.',
      }
    case '/analytics/tokens':
      return {
        title: `${t('Tokens')} | MMFinance Analytics`,
        description: 'View statistics for PancakeSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('MMFinance')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('MMFinance')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('MMFinance')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('MMFinance')}`,
      }
    default:
      return null
  }
}

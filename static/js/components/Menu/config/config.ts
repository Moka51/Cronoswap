import { MenuItemsType, DropdownMenuItemType } from '@crocswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    // hideSubNav: true,
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: 'Pools',
        href: '/pools',
      },
    ],
  },

  {
    label: 'Vault',
    href: '/vault',
    showItemsOnMobile: false,
    icon: 'Currency',
    items: [],
  },
  {
    label: 'Defi',
    href: '/metf-external',
    icon: 'LaurelLeft',
    // hideSubNav: true,
    items: [
      {
        label: 'METF',
        href: 'https://metf.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Savanna',
        href: 'https://svn.finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
  {
    label: 'Launch',
    href: '/launchpad',
    icon: 'Prize',
    items: [
      {
        label: 'Launchpad',
        href: '/launchpad',
      },
      {
        label: 'Madbox',
        href: '/madbox',
      },
    ],
  },
  {
    label: t('Games'),
    href: '#',
    icon: 'Predictions',
    // hideSubNav: true,
    items: [
      {
        label: 'Coin Toss',
        href: 'https://croissant.games/coin-toss/MMF',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Roulette',
        href: 'https://croissant.games/roulette/MMF',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Cro Roll',
        href: 'https://croissant.games/cro-roll/MMF',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Dice Roll',
        href: 'https://croissant.games/dice-roll/MMF',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },

  // {
  //   label: t('Docs'),
  //   href: 'https://croc-swap.gitbook.io/crocswap/',
  //   icon: 'Docs',
  //   hideSubNav: true,
  //   items: [],
  //   type: DropdownMenuItemType.EXTERNAL_LINK,
  // },
  // {
  //   label: t('Win'),
  //   href: '/prediction',
  //   icon: 'Trophy',
  //   items: [
  //     {
  //       label: t('Prediction (BETA)'),
  //       href: '/prediction',
  //     },
  //     {
  //       label: t('Lottery'),
  //       href: '/lottery',
  //     },
  //   ],
  // },
  // {
  //   label: t('NFT'),
  //   href: `${nftsBaseUrl}`,
  //   icon: 'Nft',
  //   items: [
  //     {
  //       label: t('Overview'),
  //       href: `${nftsBaseUrl}`,
  //     },
  //     {
  //       label: t('Collections'),
  //       href: `${nftsBaseUrl}/collections`,
  //     },
  //   ],
  // },
  {
    label: '',
    href: '#',
    icon: 'HamburgerClose',
    hideSubNav: true,
    items: [
      {
        label: 'Analytics',
        href: '/analytics',
        icon: 'Chart',
      },
      {
        label: t('Referrals'),
        href: '/referrals',
        icon: 'Community',
      },
      {
        label: 'Mad Meerkat NFT',
        href: 'https://madmeerkat.io',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'MM Treehouse NFT',
        href: 'https://mmtreehouse.io',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Lend (Mimas)',
        href: 'https://app.mimas.finance/markets',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Lend (Annex)',
        href: 'https://cronosapp.annex.finance/dashboard',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },

      {
        label: t('Docs'),
        href: 'https://mmfinance.gitbook.io/docs/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Dexscreener',
        href: 'https://dexscreener.com/cronos/mmfinance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/exchanges/mm_finance',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: 'Apply to list',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSf1bV9GhbjZ8dn9qKDFgEBVvchozK7_QDAXRfu0IxGTj3eedA/viewform',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      // {
      //   label: t('Voting'),
      //   href: '/voting',
      // },
      // {
      //   type: DropdownMenuItemType.DIVIDER,
      // },
      // {
      //   label: t('Leaderboard'),
      //   href: '/teams',
      // },
      // {
      //   type: DropdownMenuItemType.DIVIDER,
      // },
      // {
      //   label: t('Blog'),
      //   href: 'https://medium.com/pancakeswap',
      //   type: DropdownMenuItemType.EXTERNAL_LINK,
      // },
    ],
  },
]

export default config

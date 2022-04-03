import { FooterLinkType } from '@crocswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://mmfinance.gitbook.io/contact-us',
      },
      {
        label: t('Brand'),
        href: 'https://mmfinance.gitbook.io/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Community'),
        href: 'https://mmfinance.gitbook.io/contact-us/telegram',
      },
      {
        label: t('MMF token'),
        href: 'https://mmfinance.gitbook.io/tokenomics/cake',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://pancakeswap.creator-spring.com/',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://mmfinance.gitbook.io/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://mmfinance.gitbook.io/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://mmfinance.gitbook.io/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://mmfinance.gitbook.io',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://mmfinance.gitbook.io/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://mmfinance.gitbook.io/hiring/become-a-chef',
      },
    ],
  },
]

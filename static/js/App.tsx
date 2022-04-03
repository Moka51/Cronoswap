import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch, Link } from 'react-router-dom'
import { ResetCSS } from '@crocswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useUserAgent from 'hooks/useUserAgent'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import Referrals from 'views/Referrals'
import styled from 'styled-components'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
// import GlobalCheckClaimStatus from './components/GlobalCheckClaimStatus'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import ReferralComponent from './views/Referrals/components/ReferralComponent'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))

const Farms = lazy(() => import('./views/Farms'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
// const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const Madbox = lazy(() => import('./views/MadBox'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))
// const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
// const Voting = lazy(() => import('./views/Voting'))
// const Proposal = lazy(() => import('./views/Voting/Proposal'))
// const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Info = lazy(() => import('./views/Info'))
// const NftMarket = lazy(() => import('./views/Nft/market'))
// const ProfileCreation = lazy(() => import('./views/ProfileCreation'))
// const PancakeSquad = lazy(() => import('./views/PancakeSquad'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// const CertikContainer = styled.a`
//   position: fixed;
//   display: flex;
//   height: 50px;
//   bottom: 25px;
//   right: 40px;
//   background-color: #3d2412;
//   border-radius: 20px;
//   align-items: center;
//   padding: 13px 25px 13px 12px;
//   z-index: 10;
//   transition: opacity 0.3s ease;
//   box-shadow: var(--card-box-shadow);
//   pointer-events: none;
// `

const App: React.FC = () => {
  const { account } = useWeb3React()

  usePollBlockNumber()
  useEagerConnect()
  usePollCoreFarmData()
  useScrollOnRouteChange()
  useUserAgent()

  return (
    <Router history={history}>
      <ReferralComponent />
      <ResetCSS />
      <GlobalStyle />
      {/* <GlobalCheckClaimStatus excludeLocations={[]} /> */}
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route exact path="/farms/auction">
              <FarmAuction />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/referrals">
              <Referrals />
            </Route>
            {/* <Route path="/lottery">
              <Lottery />
            </Route> */}
            <Route path="/launchpad">
              <Ifos />
            </Route>
            <Route path="/madbox">
              <Madbox />
            </Route>
            {/* <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/create-profile">
              <ProfileCreation />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route exact path="/prediction">
              <Predictions />
            </Route>
            <Route path="/prediction/leaderboard">
              <PredictionsLeaderboard />
            </Route>
            <Route exact path="/voting">
              <Voting />
            </Route> */}
            {/* <Route exact path="/voting/proposal/create">
              <CreateProposal />
            </Route>
            <Route path="/voting/proposal/:id">
              <Proposal />
            </Route> */}

            {/* NFT */}
            {/* <Route path="/nfts">
              <NftMarket />
            </Route>

            <Route path="/pancake-squad">
              <PancakeSquad />
            </Route> */}

            {/* Info pages */}
            <Route path="/analytics">
              <Info />
            </Route>

            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route
              path="/vault"
              component={() => {
                window.location.href = 'https://vaults.mm.finance/vault'
                return null
              }}
            />
            <Route
              path="/savanna-external"
              component={() => {
                window.location.href = 'https://svn.finance'
                return null
              }}
            />
            <Route
              path="/metf-external"
              component={() => {
                window.location.href = 'https://metf.finance'
                return null
              }}
            />
            {/* <Route path="/collectibles">
              <Redirect to="/nfts" />
            </Route>
            <Route path="/profile">
              <Redirect to={`${nftsBaseUrl}/profile/${account?.toLowerCase() || ''}`} />
            </Route> */}

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
      {/* 
      <CertikContainer
        href="https://www.certik.com/projects/mmfinance"
        target="_blank"
      >
        <img height="100%" style={{height: '50px'}} className="logo" alt="logo" src="/images/certikWhite.png" />
        <img height="15px" className="check" alt="check" src="/images/checkPrimary.svg" />
      </CertikContainer> */}
    </Router>
  )
}

export default React.memo(App)

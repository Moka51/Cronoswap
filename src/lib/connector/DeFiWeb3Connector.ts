import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { IRPCMap } from '@deficonnect/types'
import { getClientMeta } from '@deficonnect/utils'
import { DeFiConnector, DeFiConnectorUpdateEvent } from './DeFiConnector'
import { InjectedConnector } from '@web3-react/injected-connector'

export const URI_AVAILABLE = 'URI_AVAILABLE'

export interface DeFiWeb3ConnectorArguments {
  supportedChainIds: number[]
  rpc: IRPCMap
  pollingInterval?: number
  bridge?: string
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

function getSupportedChains({ supportedChainIds, rpc }: DeFiWeb3ConnectorArguments): number[] | undefined {
  if (supportedChainIds) {
    return supportedChainIds
  }
  return rpc ? Object.keys(rpc).map((k) => Number(k)) : undefined
}

function parseToETHChainId(chainId: string | undefined): number {
  try {
    const parsed = parseInt(chainId ?? '0')
    if (isNaN(parsed)) {
      return 0
    } else {
      return parsed
    }
  } catch (error) {
    return 0
  }
}

export class DeFiWeb3Connector extends AbstractConnector {
  defiConnector: DeFiConnector
  private _injectConnect?: InjectedConnector

  constructor(config: DeFiWeb3ConnectorArguments) {
    super({ supportedChainIds: getSupportedChains(config) })
    const clientMeta = getClientMeta() || undefined

    this.defiConnector = new DeFiConnector({
      name: clientMeta?.name ?? '',
      supprtedChainTypes: ['eth'],
      bridge: config.bridge,
      eth: config,
    })
    this.defiConnector.onEvent(DeFiConnectorUpdateEvent.Update, (params) => {
      if (!params) {
        return
      }
      const { chainId, provider, account } = params
      this.emitUpdate({ chainId: parseToETHChainId(chainId), provider, account })
    })
    this.defiConnector.onEvent(DeFiConnectorUpdateEvent.Deactivate, () => {
      this.emitDeactivate()
    })

    if (navigator?.userAgent?.includes('DeFiWallet') && !!window.ethereum) {
      this._injectConnect = new InjectedConnector({ supportedChainIds: config.supportedChainIds })
    }
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (this._injectConnect) {
      return await this._injectConnect.activate()
    }
    const { chainId, provider, account } = await this.defiConnector.activate()
    return { chainId: parseToETHChainId(chainId), provider, account }
  }

  public async getProvider(): Promise<any> {
    if (this._injectConnect) {
      return await this._injectConnect.getProvider()
    }
    return this.defiConnector.provider
  }

  public async getChainId(): Promise<number | string> {
    if (this._injectConnect) {
      return await this._injectConnect.getChainId()
    }
    return parseToETHChainId(this.defiConnector.chainId)
  }

  public async getAccount(): Promise<null | string> {
    if (this._injectConnect) {
      return await this._injectConnect.getAccount()
    }
    const provider = await this.getProvider()
    return provider.send('eth_accounts').then((accounts: string[]): string => accounts[0])
  }

  public close(): Promise<void> {
    return this.defiConnector.close()
  }

  public deactivate(): void {
    if (this._injectConnect) {
      return this._injectConnect.deactivate()
    }
    this.defiConnector.deactivate()
  }
}

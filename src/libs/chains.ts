import { 
  Chain as ViemChain,
  mainnet,
  polygon,
  avalanche,
  bsc,
  // fantom,
} from 'viem/chains'

export type Chain = {
  id: string
  icon: string
  color: string
  viemChain: ViemChain
}

export const chains: Record<string, Chain> = {
  ethereum: {
    id: 'ethereum',
    icon: 'ethereum.svg',
    color: '#627eea',
    viemChain: mainnet,
  },
  polygon: {
    id: 'polygon',
    icon: 'polygon.svg',
    color: '#6f41d8',
    viemChain: polygon,
  },
  'binance-coin': {
    id: 'binance-coin',
    icon: 'bnb.svg',
    color: '#f3ba2f',
    viemChain: bsc,
  },
  avalanche: {
    id: 'avalanche',
    icon: 'avalanche.svg',
    color: '#e84142',
    viemChain: avalanche,
  },
  // fantom: {
  //   id: 'fantom',
  //   icon: 'fantom.svg',
  //   color: '#1969ff',
  //   viemChain: fantom,
  // },
}

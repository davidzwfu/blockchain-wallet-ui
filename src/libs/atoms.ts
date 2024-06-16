import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { HDAccount } from 'viem'

export const balancesAtom = atom<Record<string,string>>({})

export const assetsAtom = atomWithStorage<string[]>('assets', [
  'ethereum',
  'polygon',
  'binance-coin',
])
export const assetsLoadingAtom = atom<boolean>(false)

export const watchlistAtom = atomWithStorage<string[]>('watchlist', [
  'ethereum',
  'polygon',
])

export const modalAtom = atom<string|null>(null)

export const encryptedAtom = atomWithStorage<string>('encrypted', localStorage.getItem('encrypted') ?? '')
export const addressAtom = atomWithStorage<`0x${string}`>('address', '0x')
export const accountAtom = atom<HDAccount|null>(null)

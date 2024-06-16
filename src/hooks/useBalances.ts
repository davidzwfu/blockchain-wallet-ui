import { useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { createPublicClient, formatEther, http } from 'viem'
import { chains } from '../libs/chains'
import { addressAtom, assetsLoadingAtom, balancesAtom } from '../libs/atoms'

export function useBalances(fetch?: boolean) {
  const [balances, setBalances] = useAtom(balancesAtom)
  const address = useAtomValue(addressAtom)
  const [isLoading, setIsLoading] = useAtom(assetsLoadingAtom)

  useEffect(() => {
    if (fetch)
      fetchBalances()      
  }, [])

  async function fetchBalances() {
    if (isLoading) return
    setIsLoading(true)
    await Promise.all(
      Object.keys(chains).map(chainId => getEthBalance(chainId))
    )
    setIsLoading(false)
  }

  async function getEthBalance(chainId: string) {
    const publicClient = createPublicClient({ 
      chain: chains[chainId].viemChain, 
      transport: http(), 
    }) 
    const balance = await publicClient.getBalance({ address: address })
    setBalances((balances: Record<string, string>) => ({
      ...balances,
      [chainId]: formatEther(balance)
    }))
  }

  return {
    balances,
    isLoading,
    fetchBalances,
  }
}

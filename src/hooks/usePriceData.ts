import useSWR from 'swr'
import { chains } from '../libs/chains'
import { fetcher } from '../libs/utils'

export function usePriceData() {
  const { data } = useSWR(
    `https://api.coincap.io/v2/assets?ids=${Object.keys(chains).join(',')}`, 
    fetcher,
    { refreshInterval: 5000 },
  )
  if (!data) return {}
  
  return data?.data.reduce((total: any, current: any) => {
    total[current.id] = current
    return total
  }, {})
}

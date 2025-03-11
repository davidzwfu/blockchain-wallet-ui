import useSWR from 'swr'
import { chains } from '../libs/chains'
import { fetcher } from '../libs/utils'

export function usePriceData() {
  const { data } = useSWR(
    `https://rest.coincap.io/v3/assets?ids=${Object.keys(chains).join(',')}&apiKey=${import.meta.env.VITE_COINCAP_API_KEY}`, 
    fetcher,
    { refreshInterval: 60000 },
  )
  if (!data || !Array.isArray(data.data))
    return {}

  return data?.data?.reduce((total: any, current: any) => {
    total[current.id] = current
    return total
  }, {})
}

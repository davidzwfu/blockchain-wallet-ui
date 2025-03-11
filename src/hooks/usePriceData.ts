import useSWR from 'swr'
import { chains } from '../libs/chains'
import { fetcher } from '../libs/utils'

export function usePriceData() {
  const { data } = useSWR(
    `https://rest.coincap.io/v3/assets?ids=${Object.keys(chains).join(',')}&apiKey=02a2068bea0c40706cb909555c0794381a934777993f14115b9e8da7073902a2`, 
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

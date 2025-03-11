import useSWR from 'swr'
import { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { Chain } from '../libs/chains'
import { fetcher } from '../libs/utils'

export default function PriceGraph({ chain }: { chain: Chain }) {
  const timeRef = useRef(new Date().getTime())
  const end = timeRef.current
  const start = end - (24 * 60 * 60 * 1000)
  
  const { data } = useSWR(
    `https://rest.coincap.io/v3/assets/${chain.id}/history?interval=h1&start=${start}&end=${end}&apiKey=${process.env.COINCAP_API_KEY}`, 
    fetcher,
  )
  if (!data || !Array.isArray(data.data))
    return
  
  const dateLabels = data?.data?.map((x: any) => x.date)
  const priceData = data?.data?.map((x: any) => x.priceUsd)
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: false },
          y: { 
            display: false,
          },
        },
        layout: {
          autoPadding: false,
          padding: {
            bottom: 1,
          },
        }
      }}
      data={{
        labels: dateLabels,
        datasets: [{
          data: priceData,
          borderColor: chain.color,
          borderWidth: 2,
          borderCapStyle: 'round',
          cubicInterpolationMode: 'monotone',
          pointStyle: false,
        }]
      }} 
    />
  )
}

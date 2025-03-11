import { useAtomValue, useSetAtom } from 'jotai'
import { chains } from '../libs/chains'
import { formatPercent, formatPrice } from '../libs/utils'
import { modalAtom, watchlistAtom } from '../libs/atoms'
import { usePriceData } from '../hooks/usePriceData'
import PriceGraph from './PriceGraph'

export default function Watchlist() {
  const watchlist = useAtomValue(watchlistAtom)
  const setModal = useSetAtom(modalAtom)
  const priceData = usePriceData()

  return (
    <div className="watchlist">
      <div className="watchlist__header">
        <h2 className="watchlist__heading">Watchlist</h2>
        <button className="btn" onClick={() => setModal('AddToWatchlist')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7.00008 1.16675V12.8334M1.16675 7.00008H12.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add
        </button>
      </div>
      <div className="watchlist-grid">
        {watchlist?.map(id => {
          const chain = chains[id]
          const price = priceData[id]
          return (
            <div className="watchlist-grid__card" key={id}>
              <div className="watchlist-grid__block">
                <img src={`/chains/${chain.icon}`} className="watchlist-grid__img" alt="chain icon" />
                <div className="watchlist-grid__graph">
                  <PriceGraph chain={chain} />
                </div>
              </div>
              <div className="watchlist-grid__flex">
                <span className="watchlist-grid__title">{chain.viemChain.nativeCurrency.symbol}</span>
                <span className={`change-percent ${+price?.changePercent24Hr < 0 ? 'negative' : ''}`}>
                  {formatPercent(price?.changePercent24Hr)}%
                </span>
              </div>
              <span className="watchlist-grid__subtitle">{formatPrice(price?.priceUsd)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

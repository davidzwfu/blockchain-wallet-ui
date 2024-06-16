import { useAtomValue, useSetAtom } from 'jotai'
import toast from 'react-hot-toast'
import { chains } from '../libs/chains'
import { formatPercent, formatPrice } from '../libs/utils'
import { addressAtom, assetsAtom, modalAtom } from '../libs/atoms'
import { usePriceData } from '../hooks/usePriceData'
import { useBalances } from '../hooks/useBalances'

export default function Assets() {
  const assets = useAtomValue(assetsAtom)
  const setModal = useSetAtom(modalAtom)
  const { balances, isLoading, fetchBalances } = useBalances()
  const priceData = usePriceData()
  const address = useAtomValue(addressAtom)

  function handleClick(address: string) {
    navigator.clipboard.writeText(address)
    toast('Address copied to clipboard', { 
      id: 'clipboard',
      duration: 3000,
    })
  }

  return (
    <div className="assets">
      <div className="assets__header">
        <h2 className="assets__heading">
          Assets
          {isLoading && 
            <svg className="assets__loading" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17 5.12537C19.1213 6.67091 20.5 9.17444 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5H11.5M7 18.8746C4.87867 17.329 3.5 14.8255 3.5 12C3.5 7.30555 7.30558 3.49998 12 3.49998H12.5M13 22.4L11 20.4L13 18.4M11 5.59998L13 3.59998L11 1.59998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        </h2>
        <div className="assets__actions">
          <button className="btn" onClick={() => fetchBalances()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <button className="btn" onClick={() => setModal('FilterAssets')}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke="#CECFD2" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filter
          </button>
        </div>
      </div>
      <div className="assets-grid">
        {assets.map(id => {
          const chain = chains[id]
          const price = priceData[id]
          const balance = parseFloat(balances[id] ?? 0)
          return (
            <div className="assets-grid__row" key={id} onClick={() => handleClick(address)}>
              <img src={`/chains/${chain.icon}`} className="assets-grid__img" alt="chain icon" />
              <span className="assets-grid__title">{chain.viemChain.name}</span>
              <span className="assets-grid__title">{balance.toFixed(6)}</span>
              <div className="assets-grid__flex">
                <span className="assets-grid__subtitle">{chain.viemChain.nativeCurrency.symbol}</span>
                <span className={`change-percent ${+price?.changePercent24Hr < 0 ? 'negative' : ''}`}>
                  {formatPercent(price?.changePercent24Hr)}%
                </span>
              </div>
              <span className="assets-grid__subtitle">{formatPrice(balance * price?.priceUsd)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

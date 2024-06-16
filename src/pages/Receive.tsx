import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import toast from 'react-hot-toast'
import { addressAtom } from '../libs/atoms'
import lines from '../assets/lines.svg'
import Nav from '../components/Nav'
import { chains } from '../libs/chains'
import { formatAddress } from '../libs/utils'

export default function Receive() {
  const address = useAtomValue(addressAtom)

  function copyAddress(address: string = '') {
    navigator.clipboard.writeText(address)
    toast('Address copied to clipboard', { 
      id: 'clipboard',
      duration: 3000,
    })
  }

  return <>
    <Nav />
    <div className="container1">
      <div className="container1__body" key={2}>
        <div className="container1__header">
          <div className="container1__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="container1__bg">
              <img src={lines} width={480} height={480}/>
            </div>
          </div>
          <h1 className="container1__title">Receive funds</h1>
          <p className="container1__subtitle">These are your Ethereum addresses. Use them to receive funds into your wallet.</p>
        </div>
        
        <div className="chains-list__wrapper">
          <div className="chains-list">
            {Object.entries(chains).map(([id, chain]) => {
              return (
                <label className="chains-list__row" key={id}>
                  <img src={`/chains/${chain.icon}`} className="chains-list__img" alt="chain icon" />
                  <div className="chains-list__block">
                    <span className="chains-list__title">{chain.viemChain.name}</span>
                    <span className="chains-list__subtitle">{formatAddress(address, 11)}</span>
                  </div>
                  <button className="btn btn--icon" onClick={() => copyAddress(address)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </label>
              )
            })}
          </div>
          <Link to="/" className="btn btn--primary btn--large">Back to wallet</Link>
        </div>
      </div>
    </div>
  </>
}

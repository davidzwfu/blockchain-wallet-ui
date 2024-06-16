import { useSetAtom } from 'jotai'
import { formatPrice } from '../libs/utils'
import { accountAtom } from '../libs/atoms'
import { usePriceData } from '../hooks/usePriceData'
import { useBalances } from '../hooks/useBalances'
import { useDropdown } from '../hooks/useDropdown'
import { useNavigate } from 'react-router-dom'

export default function Main() {
  const navigate = useNavigate()
  const { balances } = useBalances(true)
  const priceData = usePriceData()
  const { dropdownRef, isDropdownOpen, setIsDropdownOpen } = useDropdown()
  const setAccount = useSetAtom(accountAtom)
  
  function getTotalBalance(balances: Record<string, string>) {
    let totalBalance = 0
    for (const key in balances) {
      const balance = balances[key]
      const priceUsd = priceData[key]?.priceUsd
      totalBalance += parseFloat(balance) * parseFloat(priceUsd)
    }
    return totalBalance
  }

  function lock() {
    setAccount(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="home-main">
      <p className="home-main__subtitle">Your balance</p>
      <p className="home-main__title">
        {formatPrice(getTotalBalance(balances))}
      </p>
      <div className="home-main__actions">
        <button className="btn btn--primary" onClick={() => navigate('/send-transaction')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.99935 12.8332V1.1665M6.99935 1.1665L1.16602 6.99984M6.99935 1.1665L12.8327 6.99984" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Send
        </button>
        <button className="btn" onClick={() => navigate('/receive')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M6.99935 1.1665V12.8332M6.99935 12.8332L12.8327 6.99984M6.99935 12.8332L1.16602 6.99984" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Receive
        </button>
        <div className="dropdown-btn" ref={dropdownRef}>
          <button className="btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isDropdownOpen &&
            <div className="dropdown-menu">
              <div className="dropdown-menu__item" onClick={() => navigate('/export')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V12M16 7L12 3M12 3L8 7M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export wallet
              </div>
              <div className="dropdown-menu__item" onClick={() => navigate('/change-password')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.71569 21.2843 5.40973 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.71569 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V11.8C2 12.9201 2 13.4802 2.21799 13.908C2.40973 14.2843 2.71569 14.5903 3.09202 14.782C3.51984 15 4.0799 15 5.2 15H11M12 10H12.005M17 10H17.005M7 10H7.005M19.25 17V15.25C19.25 14.2835 18.4665 13.5 17.5 13.5C16.5335 13.5 15.75 14.2835 15.75 15.25V17M12.25 10C12.25 10.1381 12.1381 10.25 12 10.25C11.8619 10.25 11.75 10.1381 11.75 10C11.75 9.86193 11.8619 9.75 12 9.75C12.1381 9.75 12.25 9.86193 12.25 10ZM17.25 10C17.25 10.1381 17.1381 10.25 17 10.25C16.8619 10.25 16.75 10.1381 16.75 10C16.75 9.86193 16.8619 9.75 17 9.75C17.1381 9.75 17.25 9.86193 17.25 10ZM7.25 10C7.25 10.1381 7.13807 10.25 7 10.25C6.86193 10.25 6.75 10.1381 6.75 10C6.75 9.86193 6.86193 9.75 7 9.75C7.13807 9.75 7.25 9.86193 7.25 10ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.0399 21 17.7599 20.891 17.546C20.7951 17.3578 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H15.6C15.0399 17 14.7599 17 14.546 17.109C14.3578 17.2049 14.2049 17.3578 14.109 17.546C14 17.7599 14 18.0399 14 18.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Change password
              </div>
              <div className="dropdown-menu__item" onClick={() => lock()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Lock
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

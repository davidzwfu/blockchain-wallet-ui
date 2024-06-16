import { useState } from 'react'
import { Link } from 'react-router-dom'
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'
import { AES } from 'crypto-js'
import { useSetAtom } from 'jotai'
import { accountAtom, addressAtom, encryptedAtom } from '../libs/atoms'
import lines from '../assets/lines.svg'
import Nav from '../components/Nav'
import PincodeForm from '../components/PincodeForm'

export default function StartNew() {
  const setEncrypted = useSetAtom(encryptedAtom)
  const setAddress = useSetAtom(addressAtom)
  const setAccount = useSetAtom(accountAtom)
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (pincode.length < 6) return

    try {
      const mnemonic = generateMnemonic(english)
      const account = mnemonicToAccount(mnemonic)
      const encrypted = AES.encrypt(mnemonic, pincode).toString()
      setAccount(account)
      setAddress(account.address)
      setEncrypted(encrypted)
      setPage(2)
    }
    catch (error) {
      setPincode('')
      setError('Failed to create wallet.')
    }
  }

  return <>
    <Nav />
    {page == 1 ?
      <div className="container1" key={1}>
        <div className="container1__body">
          <div className="container1__header">
            <div className="container1__icon">
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z"/>
              </svg>
              <div className="container1__bg">
                <img src={lines} width={480} height={480}/>
              </div>
            </div>
            <h1 className="container1__title">Set your pin</h1>
            <p className="container1__subtitle">Please choose a 6-digit password for your wallet. You will need it to gain access.</p>
          </div>
          <PincodeForm 
            pincode={pincode}
            setPincode={setPincode}
            error={error}
            setError={setError}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="container1__footer">
          <Link to="/start" className="container1__link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.8337 7.00008H1.16699M1.16699 7.00008L7.00033 12.8334M1.16699 7.00008L7.00033 1.16675" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </div>
      </div>
      :
      <div className="container1" key={2}>
        <div className="container1__body">
          <div className="container1__header">
            <div className="container1__icon">
              <svg width="28" height="28" viewBox="0 0 29 28" fill="none">
                <path d="M9.25016 13.9999L12.7502 17.4999L19.7502 10.4999M26.1668 13.9999C26.1668 20.4432 20.9435 25.6666 14.5002 25.6666C8.05684 25.6666 2.8335 20.4432 2.8335 13.9999C2.8335 7.5566 8.05684 2.33325 14.5002 2.33325C20.9435 2.33325 26.1668 7.5566 26.1668 13.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="container1__bg">
                <img src={lines} width={480} height={480}/>
              </div>
            </div>
            <h1 className="container1__title">Wallet created</h1>
            <p className="container1__subtitle">Your wallet has been successfully created. Click below to start using it.</p>
          </div>
        </div>
        <div className="container1__footer">
          <Link to="/" className="btn btn--primary btn--large">Continue</Link>
        </div>
      </div>
    }
    <div className="pagination">
      <div className={`pagination__dot ${page == 1 ? 'active' : ''}`}></div>
      <div className={`pagination__dot ${page == 2 ? 'active' : ''}`}></div>
    </div>
  </>
}

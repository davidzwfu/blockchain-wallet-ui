import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mnemonicToAccount } from 'viem/accounts'
import { AES, enc } from 'crypto-js'
import { useAtomValue } from 'jotai'
import { addressAtom, encryptedAtom } from '../libs/atoms'
import lines from '../assets/lines.svg'
import Nav from '../components/Nav'
import PincodeForm from '../components/PincodeForm'

export default function Export() {
  const encrypted = useAtomValue(encryptedAtom)
  const address = useAtomValue(addressAtom)
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const [mnemonic, setMnemonic] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (pincode.length < 6) return

    try {
      const decrypted = AES.decrypt(encrypted, pincode).toString(enc.Utf8)
      const wallet = mnemonicToAccount(decrypted)
      if (wallet.address != address)
        throw new Error()
      setMnemonic(decrypted)
    }
    catch (error) {
      setPincode('')
      setError('Incorrect pin entered.')
    }
  }

  return <>
    <Nav />
    {!mnemonic ?
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
            <h1 className="container1__title">Enter your pin</h1>
            <p className="container1__subtitle">Your pin is required to export your wallet.</p>
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
          <Link to="/" className="container1__link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.8337 7.00008H1.16699M1.16699 7.00008L7.00033 12.8334M1.16699 7.00008L7.00033 1.16675" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to wallet
          </Link>
        </div>
      </div>
      :
      <div className="container1" key={2}>
        <div className="container1__body">
          <div className="container1__header">
            <div className="container1__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="container1__bg">
                <img src={lines} width={480} height={480}/>
              </div>
            </div>
            <h1 className="container1__title">Export wallet</h1>
            <p className="container1__subtitle">This is your exported secret phrase. It gives full access to your wallet and funds.</p>
          </div>
          <textarea className="form-field__input" rows={3} value={mnemonic} readOnly />
        </div>
        <div className="container1__footer">
          <Link to="/" className="btn btn--primary btn--large">Back to wallet</Link>
        </div>
      </div>
    }
    <div className="pagination">
      <div className={`pagination__dot ${!mnemonic ? 'active' : ''}`}></div>
      <div className={`pagination__dot ${mnemonic ? 'active' : ''}`}></div>
    </div>
  </>
}

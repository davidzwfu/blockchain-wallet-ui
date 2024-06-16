import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mnemonicToAccount } from 'viem/accounts'
import { AES, enc } from 'crypto-js'
import { useAtomValue, useSetAtom } from 'jotai'
import { accountAtom, addressAtom, encryptedAtom } from '../libs/atoms'
import lines from '../assets/lines.svg'
import Nav from '../components/Nav'
import PincodeForm from '../components/PincodeForm'

export default function Login() {
  const navigate = useNavigate()
  const [pincode, setPincode] = useState('')
  const [error, setError] = useState('')
  const encrypted = useAtomValue(encryptedAtom)
  const address = useAtomValue(addressAtom)
  const setAccount = useSetAtom(accountAtom)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (pincode.length < 6) return

    try {
      const decrypted = AES.decrypt(encrypted, pincode).toString(enc.Utf8)
      const wallet = mnemonicToAccount(decrypted)
      if (wallet.address != address)
        throw new Error()
      setAccount(wallet)
      navigate('/')
    }
    catch (error) {
      setPincode('')
      setError('Incorrect pin entered.')
    }
  }

  return <>
    <Nav />
    <div className="container1">
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
          <p className="container1__subtitle">Your pin is required to unlock your wallet.</p>
        </div>
        <PincodeForm 
          pincode={pincode}
          setPincode={setPincode}
          error={error}
          setError={setError}
          onSubmit={handleSubmit}
          buttonText="Unlock"
        />
      </div>
      <div className="container1__footer">
        <Link to="/forgot-password" className="container1__forgot">Forgot password?</Link>
      </div>
    </div>
  </>
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import toast from 'react-hot-toast'
import { HDAccount, createWalletClient, http } from 'viem'
import { accountAtom, addressAtom } from '../libs/atoms'
import lines from '../assets/lines.svg'
import Nav from '../components/Nav'
import SelectChain from '../components/SelectChain'
import { useBalances } from '../hooks/useBalances'
import { chains } from '../libs/chains'

export default function SignMessage() {
  const address = useAtomValue(addressAtom)
  const account = useAtomValue(accountAtom)
  const { balances } = useBalances()
  const [signature, setSignature] = useState('')
  const [selectedChain, setSelectedChain] = useState<string>('ethereum')
  const [formFields, setFormFields] = useState({
    data: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function copyAddress(address: string = '') {
    navigator.clipboard.writeText(address)
    toast('Address copied to clipboard', { 
      id: 'clipboard',
      duration: 3000,
    })
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (isSubmitting) return
    
    try {
      setError('')
      setIsSubmitting(true)
      const walletClient = createWalletClient({
        account: account as HDAccount,
        chain: chains[selectedChain].viemChain,
        transport: http(),
      })
      const hex = await walletClient.signMessage({
        message: formFields.data,
      })
      setSignature(hex)
    }
    catch (error: any) {
      setError(error.details ?? error.name)
    }
    setIsSubmitting(false)
  }

  return <>
    <Nav />
    {!signature ?
      <div className="container1" key={1}>
        <div className="container1__body">
          <div className="container1__header">
            <div className="container1__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M7 8.5H12M7 12H15M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="container1__bg">
                <img src={lines} width={480} height={480}/>
              </div>
            </div>
            <h1 className="container1__title">Sign message</h1>
          </div>

          <form onSubmit={e => handleSubmit(e)}>
            <div className="modal-form">
              <div className="form-field">
                <label className="form-field__label">Chain</label>
                <div className="form-field__container">
                  <SelectChain selected={selectedChain} setSelected={setSelectedChain} />
                  <button type="button" className="input-dropdown__btn" onClick={() => copyAddress(address)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <span className="form-field__subtext">Balance: {balances[selectedChain]} {chains[selectedChain].viemChain.nativeCurrency.symbol}</span>
              </div>
              <div className="form-field">
                <label className="form-field__label">Message</label>
                <textarea className="form-field__input" placeholder="e.g. some text message" rows={4}
                  value={formFields.data} onChange={e => setFormFields({...formFields, data: e.target.value})}
                />
              </div>
            </div>

            <div className="container1__hint container1__hint--error">{error}</div>

            <div className="modal__buttons">
              <button type="submit" className="btn btn--primary btn--large">
                {isSubmitting && 
                  <svg className="spinner" width="20" height="20" viewBox="0 0 48 48" fill="none">
                    <path d="M9.15076 9.15076C11.4941 6.80739 14.3588 5.0519 17.5106 4.02781C20.6625 3.00372 24.0119 2.74012 27.2851 3.25855C30.5583 3.77697 33.6624 5.06271 36.3435 7.01065C39.0246 8.95858 41.2066 11.5134 42.7111 14.4662C44.2157 17.419 45 20.686 45 24C45 27.314 44.2157 30.581 42.7111 33.5338C41.2066 36.4866 39.0246 39.0414 36.3435 40.9894C33.6624 42.9373 30.5583 44.223 27.2851 44.7415" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
        <div className="container1__footer">
          <Link to="/" className="container1__link" onClick={e => isSubmitting ? e.preventDefault() : undefined}>
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
              <svg width="28" height="28" viewBox="0 0 29 28" fill="none">
                <path d="M9.25016 13.9999L12.7502 17.4999L19.7502 10.4999M26.1668 13.9999C26.1668 20.4432 20.9435 25.6666 14.5002 25.6666C8.05684 25.6666 2.8335 20.4432 2.8335 13.9999C2.8335 7.5566 8.05684 2.33325 14.5002 2.33325C20.9435 2.33325 26.1668 7.5566 26.1668 13.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="container1__bg">
                <img src={lines} width={480} height={480}/>
              </div>
            </div>
            <h1 className="container1__title">Sign message</h1>
            <p className="container1__subtitle">Your message was signed successfully.<br></br>Below is your signature hash.</p>
          </div>
          <textarea className="form-field__input" rows={5} value={signature} readOnly />
        </div>
        <div className="container1__footer">
          <Link to="/" className="btn btn--primary btn--large">Back to wallet</Link>
        </div>
      </div>
    }
  </>
}

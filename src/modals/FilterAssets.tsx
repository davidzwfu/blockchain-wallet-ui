import { useState } from 'react'
import { useAtom } from 'jotai'
import ReactModal from 'react-modal'
import { useBalances } from '../hooks/useBalances'
import { chains } from '../libs/chains'
import { assetsAtom, modalAtom } from '../libs/atoms'

export default function FilterAssets() {
  const { balances } = useBalances()
  const [modal, setModal] = useAtom(modalAtom)
  const [assets, setAssets] = useAtom(assetsAtom)
  const [checkedItems, setCheckedItems] = useState([...assets])

  function handleChange(id: string, checked: boolean) {
    if (checked)
      setCheckedItems((prevState: string[]) => prevState.filter(x => x != id))
    else 
      setCheckedItems((prevState: string[]) => [...prevState, id])
  }

  function saveChanges() {
    setAssets(checkedItems)
    setModal(null)
  }

  return (
    <ReactModal
      isOpen={modal == 'FilterAssets'}
      parentSelector={() => document.querySelector('.app')!}
      overlayClassName="modal-overlay"
      className="modal"
      onAfterOpen={() => setCheckedItems(assets)}
    >
      <button className="btn btn--close" onClick={() => setModal(null)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="modal-header">
        <h2 className="modal-header__title">Filter shown assets</h2>
      </div>

      <div className="chains-list">
        {Object.entries(chains).map(([id, chain]) => {
          const checked = checkedItems.includes(id)
          const balance = parseFloat(balances[id] ?? 0)
          return (
            <label className="chains-list__row" key={id}>
              <img src={`/chains/${chain.icon}`} className="chains-list__img" alt="chain icon" />
              <div className="chains-list__block">
                <span className="chains-list__title">{chain.viemChain.name}</span>
                <span className="chains-list__subtitle">{chain.viemChain.nativeCurrency.symbol} · {balance.toFixed(6)}</span>
              </div>
              <div className={`checkbox ${checked ? 'checked' : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => handleChange(id, checked)} />
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </label>
          )
        })}
      </div>

      <div className="modal__buttons">
        <button className="btn btn--primary" onClick={() => saveChanges()}>Apply</button>
        <button className="btn" onClick={() => setModal(null)}>Cancel</button>
      </div>
    </ReactModal>
  )
}

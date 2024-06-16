import { chains } from '../libs/chains'

export default function SelectChain({ 
  selected, setSelected
}: { 
  selected: string
  setSelected: (state: string) => void
}) {
  return (
    <div className="input-dropdown">
      <button type="button" className="focusable"></button>
      <div className="input-dropdown__input">
        <img src={`/chains/${chains[selected].icon}`} className="input-dropdown__img" alt={selected} />
        <span className="input-dropdown__text">{chains[selected].viemChain.name} </span>
      </div>
      <svg className="input-dropdown__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <ul className="input-dropdown__menu">
        {Object.entries(chains).map(([id, chain]) => {
          const active = selected == id
          return (
            <li className={`input-dropdown__item ${active ? 'active' : ''}`} key={id} 
              onClick={() => setSelected(id)} 
            >
              <img src={`/chains/${chain.icon}`} className="input-dropdown__img" alt={id} />
              <span className="input-dropdown__text">{chain.viemChain.name}</span>
              <svg className="input-dropdown__check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

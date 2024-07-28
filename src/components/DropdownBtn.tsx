import { useState } from 'react'

export default function DropdownBtn({
  className, icon, children
 }: { 
  className: string
  icon: JSX.Element
  children: JSX.Element[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  function handleBlur(event: React.FocusEvent) {
    if (!event.target.contains(event.relatedTarget))
      setIsOpen(false)
  }

  function handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement
    if (target.className.includes('dropdown-menu__item'))
      setIsOpen(false)
  }

  return (
    <button type="button" className={className} onBlurCapture={e => handleBlur(e)}>
      <div className="btn__clickable" onClick={() => setIsOpen(!isOpen)}></div>
      {icon}
      {isOpen &&
        <div className="dropdown-menu" onClick={e => handleClick(e)}>
          {children}
        </div>
      }
    </button>
  )
}

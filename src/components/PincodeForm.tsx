import { useEffect, useRef } from 'react'

export default function PincodeForm({ 
  pincode, setPincode, error, setError, onSubmit, buttonText = 'Continue'
}: { 
  pincode: string
  setPincode: (state: string) => void
  error: string
  setError: (state: string) => void
  onSubmit: (event: React.FormEvent) => void
  buttonText?: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    controlFocus()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [pincode])

  function handleKeyDown(event: KeyboardEvent) {
    setError('')
    if (event.key == 'Backspace')
      setPincode(pincode.slice(0, -1))
    else if (parseInt(event.key) >= 0 && pincode.length < 6)
      setPincode(pincode + event.key)
  }

  function controlFocus() {
    const focusElement = formRef.current?.elements[pincode.length] as HTMLElement
    focusElement?.focus()
  }

  function handlePaste(event: React.ClipboardEvent) {
    setPincode(event.clipboardData.getData('text').slice(0, 6))
  }

  return (
    <form className="container1__form" ref={formRef} onSubmit={(e) => onSubmit(e)} onBlur={() => controlFocus()}>
      <div className="pincode__wrapper">
        <div className="pincode">
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[0] ?? ''} onPaste={(e) => handlePaste(e)} />
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[1] ?? ''} onPaste={(e) => handlePaste(e)} />
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[2] ?? ''} onPaste={(e) => handlePaste(e)} />
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[3] ?? ''} onPaste={(e) => handlePaste(e)} />
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[4] ?? ''} onPaste={(e) => handlePaste(e)} />
          <input type="text" className="pincode__input" maxLength={1} placeholder=" " readOnly
            value={pincode[5] ?? ''} onPaste={(e) => handlePaste(e)} />
        </div>
        <div className="container1__hint container1__hint--error">{error}</div>
      </div>
      <button className="btn btn--primary btn--large">{buttonText}</button>
    </form>
  )
}

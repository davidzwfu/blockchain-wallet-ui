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
  function handlePaste(event: React.ClipboardEvent) {
    onChange(event.clipboardData.getData('text').slice(0, 6))
  }

  function onChange(value: string) {
    setError('')
    if (value == '')
      setPincode('')
    else if (Number(value) >= 0 && value.length <= 6)
      setPincode(value)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit(event)
  }

  return (
    <form className="container1__form" onSubmit={(e) => handleSubmit(e)}>
      <div className="pincode__wrapper">
        <div className="pincode">
          <input type="text" className="pincode__master" value={pincode} autoFocus
            onChange={e => onChange(e.target.value)} onPaste={e => handlePaste(e)} />
          {[0, 1, 2, 3, 4, 5].map(index => {
            const focus = pincode.length == index
            return (
              <input type="text" className={`pincode__input ${focus ? 'focus': ''}`} key={index}
                maxLength={1} placeholder=" " value={pincode[index] ?? ''} tabIndex={-1} readOnly />
            )
          })}
        </div>
        <div className="container1__hint container1__hint--error">{error}</div>
      </div>
      <button className="btn btn--primary btn--large">{buttonText}</button>
    </form>
  )
}

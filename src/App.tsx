import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
import { useAtomValue } from 'jotai'
import { encryptedAtom } from './libs/atoms'

Modal.setAppElement('#root')
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

export default function App() {
  const navigate = useNavigate()
  const encrypted = useAtomValue(encryptedAtom)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkForExistingUser()
  }, [])

  function checkForExistingUser() {
    if (encrypted)
      navigate('/login', { replace: true })
    else
      navigate('/start', { replace: true })

    setIsLoading(false)
  }

  if (isLoading)
    return

  return <>
    <Outlet />
    <Toaster
      position="bottom-center"
      containerClassName="toast-container"
      toastOptions={{
        className: "toast"
      }}
    />
  </>
}

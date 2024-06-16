import '../stylesheets/Home.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import Nav from '../components/Nav'
import Main from '../components/Main'
import Assets from '../components/Assets'
import Watchlist from '../components/Watchlist'
import FilterAssets from '../modals/FilterAssets'
import AddToWatchlist from '../modals/AddToWatchlist'
import { accountAtom } from '../libs/atoms'

export default function Home() {
  const navigate = useNavigate()
  const account = useAtomValue(accountAtom)

  useEffect(() => {
    if (!account)
      navigate('/login')
  }, [])

  return <>
    <Nav />
    <Main />
    <Assets />
    <Watchlist />

    <FilterAssets />
    <AddToWatchlist />
  </>
}

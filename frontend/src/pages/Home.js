import { useSelector } from 'react-redux'
import Balance from '../components/Balance'
import History from '../components/History'
import Transfer from '../components/Transfer'
import { useHistory } from 'react-router'

export default function Home() {
  const history = useHistory()
  const { profile } = useSelector((state) => state.profile)
  
  if (profile === null) {
    history.push('/signin')
    return null
  }
  return (
    <div>
      {profile ? (
        profile.account ? (
          <>
            <Balance account={profile.account} />
            <History />
            <Transfer />
          </>
        ) : (
          <>Oh no, there was an error</>
        )
      ) : null}
    </div>
  )
}

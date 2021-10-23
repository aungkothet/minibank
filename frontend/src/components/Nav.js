import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Blank from '../layouts/Blank'
import Default from '../layouts/Default'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setProfileData } from '../utils/profile'
/**
 * "/home" path should be the last,
 * otherwise it will override the others.
 */
export const navs = [
  {
    label: 'Sign up',
    to: '/signup',
    cmp: (
      <Blank>
        <SignUp />
      </Blank>
    ),
  },
  {
    label: 'Sign in',
    to: '/signin',
    cmp: (
      <Blank>
        <SignIn />
      </Blank>
    ),
  },
  {
    label: 'About',
    to: '/about',
    cmp: (
      <Default>
        <About />
      </Default>
    ),
  },
  {
    label: 'Home',
    to: '/home',
    cmp: (
      <Default>
        <Home />
      </Default>
    ),
  },
]

export default function Nav() {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}logout`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      await dispatch(setProfileData(null))
      history.push('/signin')
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <nav
      style={{
        width: '100%',
        padding: '50px 15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          marginLeft: '30px',
        }}
      >
        <Link to="/singup">Sign Up</Link>
      </span>
      <span
        style={{
          marginLeft: '30px',
        }}
      >
        <Link to="/singin">Sign In</Link>
      </span>
      <span
        style={{
          marginLeft: '30px',
        }}
      >
        <Link to="/about">About</Link>
      </span>
      <span
        style={{
          marginLeft: '30px',
        }}
      >
        <Link to="/home">Home</Link>
      </span>
      <span
        style={{
          marginLeft: '30px',
        }}
        onClick={(e) => {
          e.preventDefault()
          handleSignOut()
        }}
      >
        <a href="">Sign Out</a>
      </span>
    </nav>
  )
}

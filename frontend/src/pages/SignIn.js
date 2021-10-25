import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import MuiAlert from '@mui/material/Alert'
import Blank from '../layouts/Blank'
import { colors } from '../utils/theme'
import Snackbar from '@mui/material/Snackbar'
import { useHistory } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setProfileData } from '../utils/profile'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignIn() {
  const history = useHistory()
  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [error, setError] = React.useState()
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res.data.status !== 200) {
        setError(res.data.error)
        setOpen(true)
      }
      dispatch(setProfileData(res.data.user))
      history.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Blank>
      <h1>Welcome back!</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bg.secondary,
          borderRadius: '5px',
          padding: '45px 55px',
        }}
      >
        <Input
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          style={{
            marginTop: '20px',
          }}
          onClick={handleSignIn}
        >
          Sign in
        </Button>

        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </Box>
      {error ? (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      ) : null}
    </Blank>
  )
}

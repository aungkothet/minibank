import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Blank from '../layouts/Blank'
import { useHistory } from 'react-router'
import { colors } from '../utils/theme'
import { setProfileData } from '../utils/profile'
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material'
import { forwardRef, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('')
  const [error, setError] = useState()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}register`,
        {
          name,
          email,
          password,
          accountType,
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
      history.push('/home')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Blank>
      <h1>Welcome!</h1>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          backgroundColor: colors.bg.secondary,
          borderRadius: '5px',
          padding: '45px 55px',
        }}
      >
        <FormControl variant="filled">
          <InputLabel htmlFor="name">Name</InputLabel>
          <FilledInput id="name" onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="email">Email</InputLabel>
          <FilledInput
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Account Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <MenuItem value={1}>Saving</MenuItem>
            <MenuItem value={2}>Current</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{
            marginTop: '20px',
          }}
          onClick={handleSignUp}
        >
          Sign up
        </Button>

        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
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

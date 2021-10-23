import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import socketIOClient from 'socket.io-client'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'

const ENDPOINT = process.env.REACT_APP_SOCKET_URL

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Default = ({ children }) => {
  const { profile } = useSelector((state) => state.profile)

  const [open, setOpen] = useState(false)

  const handleClick = async () => {
    setOpen(true)
  }

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('transactions', (data) => {
      if (data.transaction.to_account === profile?.id) {
        handleClick()
      }
    })
  }, [profile, profile?.id])

  return (
    <div
      style={{
        margin: 'auto',
        maxWidth: '67%',
      }}
    >
      <Nav />
      <main
        style={{
          backgroundColor: '#fdfdfd',
          borderRadius: '5px',
          padding: '50px',
        }}
      >
        {children}
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          New transaction!
        </Alert>
      </Snackbar>

      <footer
        style={{
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        Simple Minibank
      </footer>
    </div>
  )
}

export default Default

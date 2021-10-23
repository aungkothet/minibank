import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useAddTransactionMutation } from '../utils/transactions'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Transfer() {
  const { profile } = useSelector((state) => state.profile)

  const [errorMsg, setError] = React.useState('')

  const [open, setOpen] = React.useState(false)
  const [toAcc, setToAcc] = React.useState()
  const [amt, setAmt] = React.useState()
  const [fees, setFees] = React.useState(0.0)
  const [mode, setMode] = React.useState('')

  const calculateFees = () => {
    setFees(amt * 0.05)
  }
  const [addTransaction, { isLoading: isUpdating }] =
    useAddTransactionMutation()

  const handleTransfer = (e) => {
    addTransaction({
      fromAccount: profile.account.id,
      toAccount: parseInt(toAcc),
      amount: parseInt(amt),
      type: mode,
    })
      .unwrap()
      .then((payload) => {
        console.log('fulfilled', payload)
        setError()
        setOpen(true)
      })
      .catch((error) => {
        setError(error.data.error)
        setOpen(true)
        console.error('rejected', error)
      })
  }
  const handleChangeMode = (event) => {
    if (event.target.value === 2) {
      calculateFees()
    } else {
      setFees(0)
    }
    setMode(event.target.value)
  }
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      <h1>Transfer money</h1>

      <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
        <FormControl variant="filled">
          <InputLabel htmlFor="component-to">To</InputLabel>
          <FilledInput
            id="component-to"
            onChange={(e) => setToAcc(e.target.value)}
          />
        </FormControl>

        <FormControl variant="filled">
          <InputLabel htmlFor="component-amt">Amount</InputLabel>
          <FilledInput
            id="component-amt"
            type="number"
            onChange={(e) => setAmt(e.target.value)}
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Transfer Mode
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={mode}
            onChange={handleChangeMode}
          >
            <MenuItem value={2}>Instant</MenuItem>
            <MenuItem value={1}>Normal</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="component-fees">Fees</InputLabel>
          <FilledInput
            id="component-fees"
            type="text"
            readOnly
            value={fees.toFixed(2)}
          />
        </FormControl>

        <Button variant="contained" onClick={handleTransfer}>
          Transfer
        </Button>
      </Stack>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {errorMsg ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Successfully transferred!
          </Alert>
        )}
      </Snackbar>
    </div>
  )
}

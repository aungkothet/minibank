import { useState } from 'react'
import Button from '@mui/material/Button'
import axios from 'axios'

export default function Balance({ account }) {
  const getExchangeRate = async () => {
    try {
      const res = await axios.get(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json'
      )
      setRate(res.data.usd.mmk)
    } catch (e) {
      console.error(e)
    }
  }

  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const handleCurrency = () => {
    if (currency === 'MMK') {
      setCurrency('USD')
      setRate(1)
    } else {
      setCurrency('MMK')
      getExchangeRate()
    }
  }

  return (
    <div>
      {account ? (
        <div>
          <div>Account: {account.account_no}</div>
          <div style={{}}>
            Balance:
            <span
              style={{
                marginLeft: '5px',
                fontWeight: 'bold',
                marginRight: '10px',
              }}
            >
              {(account.balance * rate).toFixed(2)} {currency}
            </span>
            <Button variant="text" onClick={handleCurrency}>
              (Show in {currency === 'kyats' ? 'USD' : 'MMK'})
            </Button>
          </div>
        </div>
      ) : (
        <div> Loading....</div>
      )}
    </div>
  )
}

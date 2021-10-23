import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsByIdQuery } from '../utils/transactions'
import { useSelector } from 'react-redux'
const columns = [
  {
    field: 'fromAccount.account_no',
    headerName: 'From',
    width: 130,
    flex: 1,
    valueGetter: (params) => {
      return params.row.fromAccount.account_no
    },
  },
  {
    field: 'toAccount.account_no',
    headerName: 'To',
    width: 130,
    flex: 1,
    valueGetter: (params) => {
      return params.row.toAccount.account_no
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 100,
    flex: 1,
  },
  {
    field: 'fees',
    headerName: 'Fees',
    type: 'number',
    width: 100,
    flex: 1,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 260,
    flex: 1,
  },
]
export default function History() {
  const { profile } = useSelector((state) => state.profile)
  const { data, error, isLoading } = useGetTransactionsByIdQuery(profile.id)

  return (
    <div>
      <h1>History</h1>

      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={data.transaction}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight={true}
                disableExtendRowFullWidth={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  )
}

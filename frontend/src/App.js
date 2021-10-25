import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { colors } from './utils/theme'
import { navs } from './components/Nav'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div
          style={{
            backgroundColor: colors.bg.primary,
          }}
        >
          <Switch>
            {navs.map(({ to, cmp }) => (
              <Route exact key={to} path={to}>{cmp}</Route>
            ))}
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App

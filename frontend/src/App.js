import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { colors } from './utils/theme'
import { navs } from './components/Nav'
import Blank from './layouts/Blank'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Home from './pages/Home'

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
            {/* <Route exact path="/signup">
              <Blank>
                <SignUp />
              </Blank>
            </Route>
            <Route exact path="/singin">
              <Blank>
                <SignIn />
              </Blank>
            </Route>
            <Route exact path="/about">
              <Blank>
                <About />
              </Blank>
            </Route>
            <Route exact path="/home">
              <Blank>
                <Home />
              </Blank>
            </Route> */}
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App

import React from 'react'

const Blank = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <main
        style={{
          textAlign: 'center',
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Blank

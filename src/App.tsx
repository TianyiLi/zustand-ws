import React, { useEffect } from 'react'
import './App.css'
import { initialize, useStore } from './utils'
import shallow from 'zustand/shallow'

function App() {
  const [message, bears] = useStore(
    (state) => [state.message, state.bears],
    shallow
  )

  useEffect(() => {
    return initialize()
  }, [])

  return (
    <div className="App">
      <div>connected times: {bears}</div>
      zustand message from socket
      <pre style={{ color: 'red' }}>{message}</pre>
    </div>
  )
}

export default App

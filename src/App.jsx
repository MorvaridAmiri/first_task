import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/1.svg" alt="لوگو" width={200} />
        </a>
      </div>
      <h1>سلام.این اولین تسک من است.</h1>
    </>
  )
}

export default App

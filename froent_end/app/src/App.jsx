import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Book Website</h1>
     <form>
      <input type="text" placeholder='Book Tittle' />
      <input type="number"  placeholder='Release Date' />
      <button>Add book</button>
     </form>
    </>
  )
}

export default App

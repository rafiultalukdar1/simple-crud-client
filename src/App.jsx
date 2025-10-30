import './App.css'
import Users from './components/Users';

const userPromise = fetch('http://localhost:3000/users').then(res => res.json())

function App() {

  return (
    <>
      <Users userPromise={userPromise}></Users>
    </>
  )
}

export default App;

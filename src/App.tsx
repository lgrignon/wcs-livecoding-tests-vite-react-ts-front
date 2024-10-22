import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loggedUserEmail, setLoggedUserEmail] = useState<string>();
  const [loginError, setLoginError] = useState<string>();
  const [formEmail, setFormEmail] = useState<string>();
  const [formPass, setFormPass] = useState<string>();

  const onLogin = async () => {
    console.log("user tries to login : " + formEmail)

    const response = await fetch('/login', {
      method: 'POST',
      body: formPass,
      headers: { 'Content-Type': 'text/plain' }
    })
    const responseText = await response.text();

    if (responseText == 'OK') {
      console.log("login succeeded")
      setLoggedUserEmail(formEmail);
      setLoginError('');
    } else {
      setLoggedUserEmail('');
      setLoginError('login failed - please check credentials')
    }
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Typescript</h1>

      {loginError && <details aria-label="login error panel">{loginError}</details>}
      {loggedUserEmail && <details aria-label="logged user email">Logged user email is {loggedUserEmail}</details>}
      <form aria-label='login form'>
        <input type='text' name='email' aria-label='email' onInput={(event) => setFormEmail((event.target as HTMLInputElement).value)} />
        <input type='password' name='password' aria-label='password' onInput={(event) => setFormPass((event.target as HTMLInputElement).value)} />
        <button type='button' onClick={() => onLogin()} aria-label='login button'>Login</button>
      </form>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} aria-label='counter button'>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ setToken, navigate }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async () => {
  
    if (password.search(/[A-Z]/) === -1) {
      alert('Need UpperCase')
      return null
    }
    if (password !== confirmPassword) {
      alert('Password Don\'t Match')
      return null
    }
    const results = await registerUser(username, password);

    if (results.success) {
      setToken(results.data.token)
      window.localStorage.setItem('token', results.data.token)
      navigate('/Home')
    } else {
      console.log(results.error.message)
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <input style={{ margin: '.25rem', width: '100%', backgroundColor: 'whitesmoke' }}
        type='text'
        label='Enter Username'
        // inputProps={{minLength: 3,maxLength:13}}
        onChange={(event) => setUsername(event.target.value)}
      />
        <input style={{ margin: '.25rem', width: '100%', backgroundColor: 'whitesmoke' }}
          type='password'
          // inputProps={{minLength: 8, maxLength:20}}
          required title='8 character minimum'
          label='Enter Password*'
          onChange={(event) => setPassword(event.target.value)} />
        <input style={{ margin: '.25rem', width: '100%', backgroundColor: 'whitesmoke' }}
          type='password'
          // inputProps={{minLength: 8, maxLength:20}}
          label='Confirm Password*'
          onChange={(event) => setConfirmPassword(event.target.value)} />
        <button style={{ height: '3rem', margin: '.25rem', backgroundColor:'#24a6d1' }} variant='contained' type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Register;
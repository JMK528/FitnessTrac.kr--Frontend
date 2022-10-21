import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ logout, token }) => {
  return (

    <header>
      
      <nav className='Navbar'>

        <h1 >Fitness Trac.kr</h1>

        <Link style={{ textDecoration: 'none' }} to='/'><button
          style={{
            borderColor: '#009DFF',
            backgroundColor: '#009DFF', color: 'black', width: '100%', borderRadius: 15
          }}>Home</button></Link>


        <Link style={{ textDecoration: 'none' }} to='/activities'><button style={{
            borderColor: '#009DFF',
            backgroundColor: '#009DFF', color: 'black', width: '100%', borderRadius: 15}}>Activities</button></Link>

        {
          token ? (
            <>

              <Link style={{ textDecoration: 'none' }} to='/myroutines'><button style={{
            borderColor: '#009DFF',
            backgroundColor: '#009DFF', color: 'black', width: '100%', borderRadius: 15}}>MyRoutines</button></Link>


              <Link style={{ textDecoration: 'none' }} to='/' onClick={() => logout()}><button style={{
            borderColor: '#55586F',
            backgroundColor: '#55586F', color: 'black', width: '100%', borderRadius: 15}}>Logout</button></Link>

            </>
          ) : (

            <Link style={{ textDecoration: 'none' }} to='/login'><button style={{
            borderColor: '#009DFF',
            backgroundColor: '#FFF700', color: 'black', width: '100%', borderRadius: 15}}>Login</button></Link>

          )
        }

      </nav>
    </header>

  )
}

export default Navbar;
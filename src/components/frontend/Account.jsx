import React from 'react'
import { useAuth } from '../../context/AuthContext';
import Logout from './Logout';

function Account() {
  const { user } = useAuth();
  
  if(!user) return <p>No user is logged in.</p>

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <h1 className='text-2xl text-center'>Welcome to the Account </h1>
        <p>User Email: <strong>{user.email}</strong></p>
        <Logout />
      </div>
  )
}

export default Account
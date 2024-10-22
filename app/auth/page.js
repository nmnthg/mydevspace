import React from 'react'
import SignUpForm from '@/components/auth/sign-up-form'
import SignInForm from '@/components/auth/sign-in-form'

const AuthPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen gap-24'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default AuthPage

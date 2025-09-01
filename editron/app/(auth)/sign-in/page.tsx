import SignInFormClient from   "@/modules/auth/components/sign-in-form-client"
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <SignInFormClient/>
    </div>
  )
}

export default Page
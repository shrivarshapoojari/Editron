import SignInFormClient from   "@/modules/auth/components/sign-in-form-client"
import { Code2 } from "lucide-react"
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-md mx-auto">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Welcome to Editron
        </h1>
        <p className="text-gray-400">
          Your cloud-based code playground
        </p>
      </div>
      
      <SignInFormClient/>
    </div>
  )
}

export default Page
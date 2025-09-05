import React from "react";

const AuthLayout = ({children}:{children:React.ReactNode})=>{
    return(
        <main className="flex justify-center items-center h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="relative z-10">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Shield, Zap } from "lucide-react";
import { signIn } from "@/auth";

async function handleGithubSignIn(){
"use server"
await signIn("github")
}

const SignInFormClient = () => {
  return (
    <Card className="w-full border-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
      <CardHeader className="space-y-2 text-center pb-8">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Sign In to Continue
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Connect with your GitHub account to access your coding playground
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-8">
        {/* GitHub Sign In Button */}
        <form action={handleGithubSignIn} className="w-full">
          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-cyan-500/30 text-white font-medium text-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 group"
          >
            <Github className="mr-3 h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span>Continue with GitHub</span>
          </Button>
        </form>

        {/* Features Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-gray-300">Instant access to cloud-based coding environment</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-gray-300">Secure authentication with GitHub</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8">
        <p className="text-sm text-center text-gray-400 w-full leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;



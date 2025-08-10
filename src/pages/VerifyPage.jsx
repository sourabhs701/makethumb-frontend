import React from 'react'
import { Header } from '@/components/layout/Header'

const VerifyPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Verify your email</h1>
        <p className="text-muted-foreground">A verification link has been sent to your email address. Please check your inbox.</p>
      </div>
    </>
  )
}

export default VerifyPage
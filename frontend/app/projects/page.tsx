"use client"
import React from 'react'

import { useRequireWallet } from "@/hooks/useRequireWallet";


const page = () => {
    const { checked } = useRequireWallet();

    if (!checked) return <div className="animate-pulse text-muted">Loading...</div>;


  return (
    <div>PROJECTS</div>
  )
}

export default page
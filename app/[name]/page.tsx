"use client"
import React from 'react'
import { useParams } from "next/navigation"
import { useEffect } from 'react'

const page = () => {
    const {id} = useParams();

   
  return (
    <div>page</div>
  )
}

export default page
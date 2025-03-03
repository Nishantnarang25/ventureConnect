import React from 'react'
import { signOut } from 'next-auth/react'

const Logout = () => {
  return (
    <button
    onClick={() => signOut("google")}
    className="bg-black text-[#F5F5F9] py-2 text-sm font-[Manrope] px-5 rounded-xl border border-transparent transition-all duration-150 hover:bg-gradient-to-r hover:from-[#F2CF07] hover:to-[#6AC671] hover:text-black/90 hover:border-black/50"
  >
    Logout
  </button>
  )
}

export default Logout
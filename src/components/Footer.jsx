import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center fixed bottom-0  z-10 w-full">
      <p className='text-sm font-mono'>&copy;{new Date().getFullYear()} Angga Staff Pendidikan YK-19 | All rights reserved</p>
    </footer>
  )
}

export default Footer

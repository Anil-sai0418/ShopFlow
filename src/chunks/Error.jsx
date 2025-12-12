import React from 'react'

function Error() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center gap-4 font-sans px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg">Oops! The page you’re looking for doesn’t exist.</p>
      <button
        className="px-6 py-2 text-base rounded-lg bg-black text-white hover:opacity-80 transition"
        onClick={() => window.location.href = "/"}
      >
        Go Back Home
      </button>
    </div>
  )
}

export default Error

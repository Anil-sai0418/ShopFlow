import React, { useState, useEffect } from 'react';
// 1. Import useNavigate hook
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


function Nav({ search = "", onSearch = () => {} }) {
  const [localSearch, setLocalSearch] = useState(search);
  
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const { itemCount } = useCart();

  return (
    <div className='w-full h-[70px] bg-white border-b border-gray-200 shadow-sm flex items-center px-4 md:px-8 justify-between sticky top-0 z-50'>
      
      {/* 1. LEFT SIDE - LOGO */}
      <div 
        className='w-1/3 flex items-center gap-2 cursor-pointer md:w-1/3 w-auto'
        // Optional: Navigate home when logo is clicked
        onClick={() => navigate('/')} 
      >
        <div className='h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg'>
          S
        </div>
        <span className='hidden md:inline text-xl font-bold tracking-tight text-gray-800'>
          Shop<span className='text-blue-600'>Flow</span>
        </span>
      </div>

      {/* 2. CENTER - SEARCH BAR */}
      <div className='hidden md:flex w-1/3 justify-center'>
        <div className='relative w-full max-w-[450px] group'>
          <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={localSearch}
            onChange={(e) => {
              const v = e.target.value;
              setLocalSearch(v);
              onSearch(v);
            }}
            className='w-full bg-gray-100 text-gray-700 text-sm rounded-full py-3 pl-12 pr-10 border border-transparent 
                       outline-none transition-all duration-300 ease-in-out
                       focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-100 focus:shadow-lg placeholder-gray-400'
          />

          <div 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
              localSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
            }`}
          >
            <button
              onClick={() => {
                setLocalSearch("");
                onSearch("");
              }}
              className='p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BELOW NAV */}
      <div className='w-full md:hidden mt-2 px-2'>
        <input
          type="text"
          placeholder="Search..."
          value={localSearch}
          onChange={(e) => {
            const v = e.target.value;
            setLocalSearch(v);
            onSearch(v);
          }}
          className='w-full bg-gray-100 text-gray-700 text-sm rounded-lg py-2 px-3 outline-none focus:bg-white focus:ring-2 focus:ring-blue-300'
        />
      </div>

      {/* 3. RIGHT SIDE - CART BUTTON */}
      <div className='w-auto md:w-1/3 flex justify-end items-center gap-3'>
        
        <button 
          onClick={() => navigate('/cartitems')}
          className='flex items-center gap-2 bg-gray-800 text-white px-4 md:px-5 py-2.5 rounded-full 
                     text-sm font-semibold shadow-md hover:bg-gray-900 active:scale-95 
                     transition-all duration-300'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
               strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14l-2-8M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/>
          </svg>
          <span className='hidden md:block'>Cart ({itemCount})</span>
        </button>
      </div>
      

    </div>
  )
}

export default Nav;
import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-white text-black py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h2 className="text-xl font-semibold mb-3">ShopFlow</h2>
          <p className="text-sm opacity-80">
            Your one‑stop solution for premium shopping experience.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/" className="hover:opacity-100 transition">Home</a></li>
            <li><a href="/products" className="hover:opacity-100 transition">Products</a></li>
            <li><a href="/cart" className="hover:opacity-100 transition">Cart</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Contact</h3>
          <p className="text-sm opacity-80">Email: support@shopflow.com</p>
          <p className="text-sm opacity-80">Phone: +91 98765 43210</p>
        </div>
      </div>

      <p className="text-center text-sm opacity-70 mt-6">
        © {new Date().getFullYear()} ShopFlow. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer

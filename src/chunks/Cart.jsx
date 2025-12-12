import React from 'react';
import { Search, ShoppingCart, User, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

// Reusable component for each item in the cart
const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => {
  const { product, quantity } = item;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 py-6 space-y-4 sm:space-y-0 last:border-b-0">
      <div className="flex items-center w-full sm:w-2/5 space-x-4">
        <div className="p-2 bg-gray-50 rounded-md">
          <img src={product.thumbnail} alt={product.title} className="h-16 w-16 object-contain" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{product.title}</h3>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={() => onDecrease(product.id)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500"><Minus size={16} /></button>
        <span className="font-medium text-gray-900 px-2">{quantity}</span>
        <button onClick={() => onIncrease(product.id)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500"><Plus size={16} /></button>
      </div>
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-8">
        <span className="font-bold text-lg text-gray-900">₹ {product.price * quantity}</span>
        <button onClick={() => onRemove(product.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
      </div>
    </div>
  );
};

// Main Cart Component
const Cart = () => {
  const { items, increase, decrease, remove, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Column: Shopping Cart Items */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
          <div className="hidden sm:flex justify-between text-gray-500 text-sm font-medium pb-4 border-b border-gray-100">
            <span className="w-2/5">Product</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
          <div className="sm:hidden grid grid-cols-3 text-gray-500 text-xs font-medium pb-4 border-b border-gray-100">
            <span>Product</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Price</span>
          </div>
          {items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <CartItem
                key={it.product.id}
                item={it}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))
          )}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button
              onClick={() => navigate('/products')}
              className="bg-gray-400 text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors w-full sm:w-auto"
            >
              Continue Shopping
            </button>
            <button
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
              Total: ₹ {total}
            </button>
            <button
              onClick={() => navigate('/payment')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
              Payment
            </button>
          </div>
        </div>

        {/* Right Column: Sidebar */}
      
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
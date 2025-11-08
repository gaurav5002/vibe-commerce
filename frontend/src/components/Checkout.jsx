import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout({ cart, onCheckoutComplete, apiUrl }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.items.length === 0) {
      setError('Your cart is empty. Add items before checking out.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const { data } = await axios.post(`${apiUrl}/checkout`, {
        customer: formData,
        cartItems: cart.items,
      });
      setReceipt(data);
      setShowModal(true);
      onCheckoutComplete();
    } catch (err) {
      console.error('Checkout failed:', err);
      setError('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const closeReceiptModal = () => {
    setShowModal(false);
    setReceipt(null);
    navigate('/');
  };

  if (showModal && receipt) {
    return <ReceiptModal receipt={receipt} onClose={closeReceiptModal} />;
  }

  return (
    // 2-Column Layout for Checkout
    <div className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Column 1: Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-sm rounded-lg border"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Contact Information
            </h3>
            {error && (
              <div className="mb-4 text-center text-red-600 font-semibold p-3 bg-red-100 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cart.items.length === 0}
              className="mt-6 w-full rounded-md bg-purple-600 px-6 py-3 text-white font-semibold text-lg shadow-md hover:bg-purple-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? 'Processing...'
                : `Place Order & Pay $${cart.total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Column 2: Order Summary */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="rounded-lg bg-white p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Order Summary
            </h3>
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <li key={item._id} className="flex py-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span className="font-bold text-xl text-purple-700">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Enhanced Receipt Modal ---
function ReceiptModal({ receipt, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
        {/* Checkmark Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed.
        </p>

        <div className="border-t border-b border-gray-200 py-4 mb-6 text-left">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">
            Order Summary
          </h4>
          {receipt.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm mb-2 text-gray-700"
            >
              <span>
                {item.name}{' '}
                <span className="text-gray-500">(x{item.quantity})</span>
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-900">Total Paid:</span>
            <span className="text-purple-700">${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          Order placed on:{' '}
          {new Date(receipt.timestamp).toLocaleString()}
        </p> 
        {/* ^^^ THIS WAS THE FIX (was </img) ^^^ */}
        
        <button
          onClick={onClose}
          className="w-full rounded-md bg-purple-600 px-6 py-3 text-white font-semibold text-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Checkout;
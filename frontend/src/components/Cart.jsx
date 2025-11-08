import { Link } from 'react-router-dom';

function Cart({ cart, onRemoveFromCart }) {
  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-700">
          Your Cart is Empty
        </h2>
        <p className="mb-6 text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="rounded-md bg-purple-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors duration-200"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h2>
      
      {/* 2-Column Layout: lg:grid-cols-3 */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* Column 1: Cart Items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-200 rounded-lg border bg-white shadow-sm">
            {cart.items.map((item) => (
              <li key={item._id} className="flex items-center p-4 sm:p-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-20 w-20 flex-shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
                />
                <div className="ml-4 flex-1 sm:ml-6">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="ml-4 text-lg font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <button
                      onClick={() => onRemoveFromCart(item._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Cart Summary */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="rounded-lg bg-white p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-2xl text-purple-700">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full block text-center rounded-md bg-purple-600 px-6 py-3 text-white font-semibold text-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
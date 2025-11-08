import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-purple-700 hover:text-purple-900"
          >
            Vibe Commerce
          </Link>
          <div className="flow-root">
            <Link
              to="/cart"
              className="group -m-2 flex items-center rounded-full p-2 text-slate-600 transition-colors duration-200 hover:bg-purple-100 hover:text-purple-700"
            >
              {/* Shopping Cart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              
              {cartCount > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white ring-2 ring-white transition-all duration-200 group-hover:bg-purple-700">
                  {cartCount}
                </span>
              )}
              {cartCount === 0 && (
                 <span className="ml-2 text-sm font-medium text-slate-600 group-hover:text-purple-700">0</span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
function ProductCard({ product, onAddToCart }) {
  const { _id, name, price, imageUrl } = product;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="aspect-w-3 aspect-h-3 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <a href="#" className="hover:underline">
            {name}
          </a>
        </h3>
        <p className="text-xl font-bold text-gray-800">${price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(_id)}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-2 text-base font-medium text-white transition-all duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {/* Cart Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-5 h-5 mr-2 -ml-1"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.63 13 6 13h9.25a.75.75 0 000-1.5H6a.25.25 0 01-.25-.25V11.5h9.64l-1.35-5.419A.87.87 0 0013.01 5H5.21l-.22-1.107a.25.25 0 00-.246-.213H3zM15.25 10.5a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM4.5 10.5a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM5.05 6.22l.63 2.52h7.04l.63-2.52H5.05z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
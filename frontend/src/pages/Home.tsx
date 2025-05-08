import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to MiniShop
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Your simple e-commerce dashboard to add and manage products quickly.
      </p>
      <div className="space-x-4">
        <Link
          to="/add"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
        <Link
          to="/products"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          My Products
        </Link>
      </div>
    </div>
  );
};

export default Home;

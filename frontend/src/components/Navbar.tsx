import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MiniShop</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Add Product
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-500">
          My Products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

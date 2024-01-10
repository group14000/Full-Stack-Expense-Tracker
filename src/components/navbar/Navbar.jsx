import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center items-center space-x-4 text-white">
        <li>
          <Link to="expenses" className="hover:text-gray-300">
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/add-expenses" className="hover:text-gray-300">
            Add New Expense
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-300">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

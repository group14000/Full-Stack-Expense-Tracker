import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Expense Tracker</h1>

        <div className="mb-6 relative">
          {/* Add your expense-related images here */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fZhxMXD3Ukl_PIKgi3Blll0EIc6eST0aQQ&usqp=CAU" // Replace with your expense-related image URL
            alt="Expense Image"
            className="w-full h-64 object-cover rounded"
            style={{ background: "transparent" }}
          />
        </div>

        <p className="text-gray-600 mb-6">
          Track and manage your expenses with ease. Stay on top of your
          financial goals! Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Proin fringilla sapien eget sem finibus, sit amet euismod turpis
          condimentum.
        </p>

        <p className="text-gray-600 mb-6">
          Sed nec interdum eros, ac eleifend nulla. Nullam eget odio a libero
          tincidunt convallis. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae.
        </p>

        <div className="flex justify-center">
          {/* Use Link for navigation */}
          <Link
            to="/login"
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 mr-4"
          >
            Try for Free
          </Link>

          <Link
            to="/payment"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
          >
            {/* Add the Material Icon */}
            Pro User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

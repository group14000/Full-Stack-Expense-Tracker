import { useState, useEffect } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch expenses data from the server
    fetch("http://localhost:3001/api/get-expenses")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteExpense = (expenseId) => {
    // Remove the expense optimistically
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );

    // Send a request to the server to delete the expense
    fetch(`http://localhost:3001/api/delete-expense/${expenseId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Error deleting expense:", data.error);
          // Revert the UI update if there's an error on the server
          setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== expenseId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        // Revert the UI update in case of a network error
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Expense List</h2>
        {loading ? (
          <p className="text-gray-600">Loading expenses...</p>
        ) : (
          <ul className="list-none p-0">
            {expenses.map((expense) => (
              <li key={expense.id} className="bg-gray-100 rounded-md p-4 mb-4">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {expense.description}
                </p>
                <p className="text-base text-gray-600 mb-2">
                  ${expense.amount_spent}
                </p>
                <p className="text-base text-gray-600 mb-2">
                  {expense.category}
                </p>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

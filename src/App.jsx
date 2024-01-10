import AddExpensesForm from "./components/expenses/AddExpensesForm";
import ExpenseList from "./components/expenses/ExpenseList";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/registration/LoginPage";
import SignupPage from "./components/registration/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-expenses" element={<AddExpensesForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { useState } from "react";

function RazorpayButton() {
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handleBuyNow = async () => {
    try {
      // Make sure amount is a valid number
      if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
      }

      // Make a POST request to your Node.js backend to create a payment order
      const response = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // Ensure 'amount' is being set correctly
      });

      const result = await response.json();

      // Redirect to the Razorpay checkout page using the received order details
      const { order } = result;
      const options = {
        key: "rzp_test_s43txngfMkfE7D",
        amount: order.amount,
        currency: order.currency,
        name: "Your Store Name",
        description: "Purchase Description",
        order_id: order.id,
        handler: function (response) {
          setPaymentStatus("success");
          alert("Payment successful!");
          // You can handle the payment success logic here
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      setPaymentStatus("error");
      // Handle error scenarios
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-4">Your Online Store</h1>
      {paymentStatus === "pending" && (
        <div className="flex flex-col space-y-4">
          <label className="text-lg">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleBuyNow}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      )}
      {paymentStatus === "success" && (
        <div className="text-green-700">
          <p className="text-xl font-semibold">You are a premium user!</p>
          <p>Contact us for any assistance at support@example.com</p>
        </div>
      )}
      {paymentStatus === "error" && (
        <p className="text-red-600">Payment failed. Please try again.</p>
      )}
    </div>
  );
}

export default RazorpayButton;

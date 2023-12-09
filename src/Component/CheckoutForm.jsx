// CheckoutForm.js

import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import CardSection from "./CardSection";
import axios from "axios";
import "../App.css"; // Import your CSS file for styling

function CheckoutForm({ stripe, elements }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log(error.message);
    } else {
      if (paymentMethod) {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:2000/Payment", {
          amount: 10 * 100,
          id,
        });

        if (response.data.success) {
          try {
            alert("Payment successful")
            console.log("Payment successful");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Payment failed");
        }
      } else {
        console.log("Payment method is undefined");
      }
    }
  };

  return (
    <div className="checkout-container">
      <div className="product-info mt-32">
        <h3 className="product-title">Product</h3>
        <h4 className="product-price">$10</h4>
      </div>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardSection />
        <button className="btn-pay">Buy Now</button>
      </form>
    </div>
  );
}

export default CheckoutForm;

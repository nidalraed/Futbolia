import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from '../Component/CheckoutForm';

const stripePromise = loadStripe('pk_test_51OGgPBGQpG0LBUoZNw8FNO2sAJUviOz5AjLfz3h2rHPIXRK8xsBn2yQtW2YKCg9H89QedSFsEdpMbY7KMKv2p4wK00XUrTQdBw');

const Payment = () => {
  return (
    <div className='mx-20 mt-20'>
      <style>
        {`
          @import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
          /* Add other styles as needed */
        `}
      </style>
   
      <div className='min-w-screen min-h-screen bg-white flex items-center justify-center px-5 pb-10 pt-16'>
        <div className='w-full mx-auto rounded-lg bg-gray-100 shadow-lg p-5 text-gray-700' style={{ maxWidth: 600 }}>
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

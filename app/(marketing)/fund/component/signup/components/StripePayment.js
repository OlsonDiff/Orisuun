import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51OssK1BOyWHELjbjy7d77ajLCS43yxCfnvkVOzl62EZ36HiaBWBf1ljqTgfSzTtJlFOwrAY9JqpKo02omvRWpQ5z00kfqqqo1K");

const StripePayment = ({ amount }) => {
    useEffect(() => {
        (async () => {
            const stripe = await stripePromise;

            if (!stripe) {
                console.error('Stripe failed to load.');
                return;
            }

            const expressCheckoutOptions = {
                buttonType: {
                    applePay: 'buy',
                    googlePay: 'buy',
                }
            }
            const elements = stripe.elements({
                locale: 'en',
                mode: 'payment',
                amount: amount ? amount : 100,
                currency: 'usd',
            })
            const expressCheckoutElement = elements.create(
                'expressCheckout',
                expressCheckoutOptions
            )
            expressCheckoutElement.mount('#express-checkout-element')

        })()
        // const initializePayment = async () => {


        //     const elements = stripe.elements();

        //     const paymentRequest = stripe.paymentRequest({
        //         country: 'US',
        //         currency: 'usd',
        //         total: {
        //             label: 'Demo Payment',
        //             amount: 1000,
        //         },
        //         requestPayerName: true,
        //         requestPayerEmail: true,
        //         paymentMethodTypes: ['apple_pay', 'google_pay'],
        //     });

        //     const prButton = elements.create('paymentRequestButton', {
        //         // paymentRequest,
        //     }).mount('#payment-request-button');

        //     // Check if the Payment Request is available
        //     // paymentRequest.canMakePayment().then((result) => {
        //     //     if (result) {
        //     //         prButton.mount('#payment-request-button');
        //     //     } else {
        //     //         console.error('Apple Pay/Google Pay is not available.');
        //     //     }
        //     // });

        //     // paymentRequest.on('paymentmethod', async (event) => {
        //     //     // Confirm the Payment
        //     //     const { error } = await stripe.confirmCardPayment(
        //     //         '{CLIENT_SECRET}', // Replace with the client secret received from the server
        //     //         {
        //     //             payment_method: event.paymentMethod.id,
        //     //         },
        //     //         { handleActions: false }
        //     //     );

        //     //     if (error) {
        //     //         event.complete('fail');
        //     //         console.error('Payment failed', error);
        //     //     } else {
        //     //         event.complete('success');
        //     //         console.log('Payment successful');
        //     //     }
        //     // });
        // };

        // initializePayment();

    }, []);

    return (
        <div>
            <div id="express-checkout-element"></div>
        </div>
    );
};

export default StripePayment;

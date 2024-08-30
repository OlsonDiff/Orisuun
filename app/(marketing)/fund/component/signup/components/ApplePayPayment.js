import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';

const ApplePayPayment = ({ amount, setToken }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (!stripe || !elements) {
            return;
        }

        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Total',
                amount: amount ? amount : 100,
            },
            requestPayerName: true,
            requestPayerEmail: true,

        });

        // Check the availability of the Payment Request API.
        pr.canMakePayment().then(result => {
            if (result) {
                setPaymentRequest(pr);
            }
        });

        pr.on('token', async (ev) => {
            const { token } = ev;
            console.log("token ", token);
            setToken(token);

            // Use the token to create a subscription
            // You can send this token to your server and handle the subscription logic
        });

    }, [stripe, elements]);

    if (!paymentRequest) {
        return null;
    }

    return (
        <>
            {paymentRequest && <PaymentRequestButtonElement className='border overflow-hidden border-[#B2B3B3] rounded-lg' options={{
                paymentRequest, style: {
                    paymentRequestButton: {
                        type: 'default',
                        theme: 'light',
                        // height: '64px',
                    },
                },
            }} />}
        </>
    );
};

export default ApplePayPayment;
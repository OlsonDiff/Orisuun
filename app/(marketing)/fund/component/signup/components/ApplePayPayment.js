import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';

const ApplePayPayment = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (!stripe || !elements) {
            return;
        }

        const pr = stripe.paymentRequest({
            country: 'IN',
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

    }, [stripe, elements]);

    if (!paymentRequest) {
        return null;
    }

    return (
        <>
            {paymentRequest && <PaymentRequestButtonElement options={{
                paymentRequest, style: {
                    paymentRequestButton: {
                        type: 'default',
                        theme: 'dark',
                        // height: '64px',
                    },
                },
            }} />}
        </>
    );
};

export default ApplePayPayment;
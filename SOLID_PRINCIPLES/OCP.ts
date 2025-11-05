/**
 * Open/Closed Principle (OCP)
 * Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
 * This means that the behavior of a module can be extended without modifying its source code.
 * In this example, we have a PaymentProcessor class that processes different types of payments.
 * We can create separate classes for each payment type that implement a common interface.
 * This way, we can add new payment types by creating new classes without changing the PaymentProcessor class.
 */
// class PaymentProcessor {
//     processPayment(type: string) {
//         if (type === "credit") {
//             console.log("Processing credit card payment");
//         } else if (type === "paypal") {
//             console.log("Processing PayPal payment");
//         } else {
//             console.log("Invalid payment type");
//         }
//     }
// }
// ------------------------------
// Step 1: Define an abstraction
// ------------------------------

/*
    interface PaymentMethod
*/
interface PaymentMethod {
    pay(amount: number): void;
}

/*
create separate classes for each payment type that implement the PaymentMethod interface
*/
class CreditCardPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`💳 Processing Credit Card payment of $${amount}`);
    }
}

class PayPalPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`🅿️ Processing PayPal payment of $${amount}`);
    }
}

/*
Abstract PaymentProcessor class that uses the PaymentMethod interface
*/
class PaymentProcessor {
    processPayment(payment: PaymentMethod, amount: number): void {
        payment.pay(amount);
    }
}

/*
client code
*/
const processor = new PaymentProcessor();

const creditPayment = new CreditCardPayment();
const paypalPayment = new PayPalPayment();

processor.processPayment(creditPayment, 150);
processor.processPayment(paypalPayment, 300);

/**
 * ✅ To add a new payment method, we simply create a new class that implements the PaymentMethod interface.
 * This way, we do not need to modify the existing PaymentProcessor class, adhering to the Open/Closed Principle.
*/

class ApplePayPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log(`🍎 Processing Apple Pay payment of $${amount}`);
    }
}

// ✅ No need to modify PaymentProcessor — OCP satisfied
const applePay = new ApplePayPayment();
processor.processPayment(applePay, 200);

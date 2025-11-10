/**
 * Factory Design Pattern Example: Payment Method Factory
 * This example demonstrates how to use the Factory pattern to create different payment method objects based on input.
 */

// Product  
interface Payment {
  process(): void;
}


// Concrete Products
class CreditCardPayment implements Payment {
  process() {
    console.log("Processing Credit Card Payment...");
  }
}

class PayPalPayment implements Payment {
  process() {
    console.log("Processing PayPal Payment...");
  }
}

class CryptoPayment implements Payment {
  process() {
    console.log("Processing Crypto Payment...");
  }
}

// Factory
class PaymentFactory {
  static createPayment(method: string): Payment {
    switch (method) {
      case "credit":
        return new CreditCardPayment();
      case "paypal":
        return new PayPalPayment();
      case "crypto":
        return new CryptoPayment();
      default:
        throw new Error("Invalid payment method");
    }
  }
}

// Usage
const payment = PaymentFactory.createPayment("paypal");
payment.process();

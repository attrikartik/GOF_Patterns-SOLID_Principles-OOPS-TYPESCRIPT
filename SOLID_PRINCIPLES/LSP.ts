/**
 * Liskov Substitution Principle (LSP)
 * 
 * Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.
 
 * In this example, we have a base class PaymentProcessor and two subclasses CreditCardPayment and PayPalPayment.
 * Both subclasses can be used interchangeably without affecting the correctness of the program.
 */
abstract class PayementPrcessor {
    abstract processPayment(amount:number):void;
}


/** paynet method classes */
class DebitCardPayment extends PayementPrcessor {
    processPayment(amount: number): void {
        console.log(`💳 Processing Debit Card payment of $${amount}`);
    }   
}

class PaypalPayment extends PayementPrcessor {
    processPayment(amount: number): void {
        console.log(`💳 Processing Credit Card payment of $${amount}`);
    }   
}


function makePayment(process:PayementPrcessor, amount:number){
    process.processPayment(amount);
}

let creditCardPayment = new DebitCardPayment();
makePayment(creditCardPayment, 200);

let paypal = new PaypalPayment();
makePayment(paypal, 400);    
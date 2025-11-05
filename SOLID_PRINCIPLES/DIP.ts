/**
 * Dependency Inversion Principle (DIP) states that:
 *
 * 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.        
 * 2. Abstractions should not depend on details. Details should depend on abstractions.
 *
 * This principle helps to reduce the coupling between high-level and low-level modules,
 */

/**Let’s imagine:

You (high-level) are a PaymentProcessor.

You send payment notifications via email or SMS (low-level).

If you directly call EmailService.sendEmail() or SMSService.sendSMS() inside your processor,
you depend directly on concrete classes.
If tomorrow you want to switch to WhatsApp notifications, you’d have to modify PaymentProcessor — ❌ violation of OCP and DIP.
If you now want to send an SMS instead,
you must modify PaymentProcessor → ❌ breaks OCP, violates DIP.
 */
class EmailService {
  sendEmail(message: string) {
    console.log("📧 Sending email:", message);
  }
}

class PaymentProcessor {
  private emailService = new EmailService(); // ❌ direct dependency

  processPayment(amount: number) {
    console.log("💳 Processing payment of $", amount);
    this.emailService.sendEmail("Payment successful!"); // tightly coupled
  }
}
/**
 * To adhere to DIP, we can introduce an abstraction for notification services:
 */
export interface Notifier {
  send(message: string): void;
}

/**
 * create separate classes for Email and SMS notifications that implement the Notifier interface.
 */
export class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log("📧 Email sent:", message);
  }
}

export class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log("📱 SMS sent:", message);
  }
}

/** inject dependency
 * Now, PaymentProcessor depends on the Notifier abstraction rather than concrete implementations.
 * This way, you can easily switch notification methods without modifying PaymentProcessor,
 * adhering to both DIP and OCP.
 */

export class PaymentProcessorDIP {
  constructor(private notifier: Notifier) {} // ✅ depends on abstraction

  processPayment(amount: number) {
    console.log("💳 Processing payment of $", amount);
    this.notifier.send("Payment successful!");
  }
}

/**
 * Usage:
 */
const emailProcessor = new PaymentProcessorDIP(new EmailNotifier());
emailProcessor.processPayment(100);

const smsProcessor = new PaymentProcessorDIP(new SMSNotifier());
smsProcessor.processPayment(200);

/*
now, if you want to add WhatsApp notifications, you can simply create a new class that implements Notifier:
*/
class WhatsAppNotifier implements Notifier {
  send(message: string): void {
    console.log("💬 WhatsApp sent:", message);
  }
}

const whatsappProcessor = new PaymentProcessorDIP(new WhatsAppNotifier());
whatsappProcessor.processPayment(300);

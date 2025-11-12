/**
 * Adapter Pattern Example in TypeScript
 * 
 * This example demonstrates how to use the Adapter Pattern to integrate
 * different payment gateways (Stripe and PayPal) and different database
 * clients (MongoDB and PostgreSQL) into a unified interface.
 */
// Target interface
interface PaymentGateway {
  pay(amount: number, currency: string): Promise<void>;
}

// Stripe adaptee
class StripePayment {
  async makePayment(amountInCents: number, currency: string) {
    console.log(`Stripe: Paid ${currency}${amountInCents / 100}`);
  }
}

// PayPal adaptee
class PayPalPayment {
  async sendPayment(amount: number, currency: string) {
    console.log(`PayPal: Paid ${currency}${amount}`);
  }
}

// Stripe adapter
class StripeAdapter implements PaymentGateway {
  constructor(private stripe: StripePayment) {}
  async pay(amount: number, currency: string) {
    await this.stripe.makePayment(amount * 100, currency);
  }
}

// PayPal adapter
class PayPalAdapter implements PaymentGateway {
  constructor(private paypal: PayPalPayment) {}
  async pay(amount: number, currency: string) {
    await this.paypal.sendPayment(amount, currency);
  }
}

// Client: Checkout service
class CheckoutService {
  constructor(private paymentGateway: PaymentGateway) {}

  async checkout(amount: number, currency: string) {
    console.log("Processing payment...");
    await this.paymentGateway.pay(amount, currency);
    console.log("Payment successful!");
  }
}

// Usage
const checkout1 = new CheckoutService(new StripeAdapter(new StripePayment()));
checkout1.checkout(99.99, "$");

const checkout2 = new CheckoutService(new PayPalAdapter(new PayPalPayment()));
checkout2.checkout(120.5, "$");


/**
 * Adapter Pattern Example for Database Clients in TypeScript
 * 
 * This example demonstrates how to use the Adapter Pattern to integrate
 * different database clients (MongoDB and PostgreSQL) into a unified interface.        
 */
// Target interface
interface IUserRepository {
  createUser(data: { name: string; email: string }): Promise<void>;
  findUserByEmail(email: string): Promise<any>;
}

// MongoDB adaptee
class MongoUserClient {
  async insert(document: any) {
    console.log("MongoDB insert:", document);
  }

  async findOne(query: any) {
    console.log("MongoDB find:", query);
    return { name: "Kartik", email: query.email };
  }
}

// PostgreSQL adaptee
class PostgresUserClient {
  async execute(query: string, values: any[]) {
    console.log("Postgres query:", query, values);
    return [{ name: "Kartik", email: values[0] }];
  }
}

// Mongo adapter
class MongoUserRepository implements IUserRepository {
  constructor(private client: MongoUserClient) {}

  async createUser(data: { name: string; email: string }) {
    await this.client.insert(data);
  }

  async findUserByEmail(email: string) {
    return this.client.findOne({ email });
  }
}

// Postgres adapter
class PostgresUserRepository implements IUserRepository {
  constructor(private client: PostgresUserClient) {}

  async createUser(data: { name: string; email: string }) {
    await this.client.execute("INSERT INTO users(name, email) VALUES($1, $2)", [
      data.name,
      data.email,
    ]);
  }

  async findUserByEmail(email: string) {
    const result = await this.client.execute("SELECT * FROM users WHERE email=$1", [email]);
    return result[0];
  }
}

// Client code
class UserService {
  constructor(private repo: IUserRepository) {}

  async register(name: string, email: string) {
    await this.repo.createUser({ name, email });
    console.log("User registered!");
  }

  async getUser(email: string) {
    const user = await this.repo.findUserByEmail(email);
    console.log("User found:", user);
  }
}

// usage
const userServiceMongo = new UserService(new MongoUserRepository(new MongoUserClient()));
userServiceMongo.register("Kartik", "k@ex.com");
userServiceMongo.getUser("k@ex.com");

const userServicePostgres = new UserService(new PostgresUserRepository(new PostgresUserClient()));
userServicePostgres.register("Kartik", "k@ex.com");
userServicePostgres.getUser("k@ex.com");



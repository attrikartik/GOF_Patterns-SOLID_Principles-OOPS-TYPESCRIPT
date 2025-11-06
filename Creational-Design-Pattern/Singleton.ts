import { MongoClient, Db } from "mongodb";

class Database {
  private static instance: Database | null = null;

  // client can be null initially, then holds MongoClient
  private client: MongoClient | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      const db = new Database();
      Database.instance = db;
      await db.connect(); // safe
    }
    return Database.instance;
  }

  private async connect(): Promise<void> {
    if (this.client) return; // already connected

    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useUnifiedTopology: true }); // local var, safe
    await client.connect(); // no null issue
    this.client = client;

    console.log("MongoDB connected!");
  }

  public getDb(dbName: string): Db {
    if (!this.client) throw new Error("Database not connected");
    return this.client.db(dbName);
  }
}

export default Database;
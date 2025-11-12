/**
 * Proxy Pattern Example
 * 
 * This example demonstrates how to use the Proxy Pattern to control access
 * to a resource-intensive object, such as an image loader.
 * 
 * Caching Proxy (Common in APIs)

    Suppose you have an API service that fetches product data from a remote server.
    You can cache responses to avoid repeated calls.
 */

    //
interface ProductAPI {
  getProduct(id: string): Promise<string>;
}

// Real subject
class RealProductAPI implements ProductAPI {
  async getProduct(id: string): Promise<string> {
    console.log(`Fetching product ${id} from remote server...`);
    await new Promise((res) => setTimeout(res, 1000)); // simulate delay
    return `Product-${id}`;
  }
}

// Proxy subject
class CachedProductAPI implements ProductAPI {
  private cache: Record<string, string> = {};

  constructor(private realAPI: RealProductAPI) {}

  async getProduct(id: string): Promise<string> {
    if (this.cache[id]) {
      console.log(`Returning cached product ${id}`);
      return this.cache[id];
    }

    const product = await this.realAPI.getProduct(id);
    this.cache[id] = product;
    return product;
  }
}

//  Client code
(async () => {
  const api = new CachedProductAPI(new RealProductAPI());

  console.log(await api.getProduct("101"));
  console.log(await api.getProduct("101")); // cached
})();

/**
 * Builder Design Pattern Example: HTTP Request Builder 
 * This example demonstrates how to use the Builder pattern to construct complex HTTP request objects step by step. 
 * 
 */


/**
 * Product: HTTP Request    
 * Represents the complex object being built.
 */
class HttpRequest {
  method!: string;
  url!: string;
  headers: Record<string, string> = {};
  body?: any;
  timeout?: number;

  send() {
    console.log(`Sending ${this.method} request to ${this.url}`);
    console.log("Headers:", this.headers);
    console.log("Body:", this.body||"No Body");
  }
}

/** Builder Interface and Concrete Builder    
 * Defines the steps to build the HTTP request and implements them.
 */
interface HttpRequestBuilder {
  setMethod(method: string): this;
  setURL(url: string): this;
  addHeader(key: string, value: string): this;
  setBody(body: any): this;
  setTimeout(ms: number): this;
  build(): HttpRequest;
}

/**
 * Concrete Builder    
 * Implements the builder interface to construct and assemble the HTTP request parts.
 */
class ConcreteHttpRequestBuilder implements HttpRequestBuilder {
  private request: HttpRequest;

  constructor() {
    this.request = new HttpRequest();
  }

  setMethod(method: string): this {
    this.request.method = method;
    return this;
  }

  setURL(url: string): this {
    this.request.url = url;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.request.headers[key] = value;
    return this;
  }

  setBody(body: any): this {
    this.request.body = body;
    return this;
  }

  setTimeout(ms: number): this {
    this.request.timeout = ms;
    return this;
  }

  build(): HttpRequest {
    return this.request;
  }
}

/**
 * Director    
 * Constructs the HTTP request using the builder interface.
 */
class HttpDirector {
  static buildPostRequest(builder: HttpRequestBuilder, url: string, body: any): HttpRequest {
    return builder
      .setMethod("POST")
      .setURL(url)
      .addHeader("Content-Type", "application/json")
      .setBody(JSON.stringify(body))
      .build();
  }

  static buildGetRequest(builder: HttpRequestBuilder, url: string): HttpRequest {
    return builder
      .setMethod("GET")
      .setURL(url)
      .addHeader("Accept", "application/json")
      .build();
  }
}

// Usage Example
// Creating a GET request
const builder = new ConcreteHttpRequestBuilder();

// Building and sending a GET request
const getRequest = HttpDirector.buildGetRequest(builder, "https://api.example.com/data");
getRequest.send();


//  Building and sending a POST request
const postRequest = HttpDirector.buildPostRequest(builder, "https://api.example.com/create", { name: "Kartik" });
postRequest.send();

interface Service{
    execute(user:String,data:any): void;
}

class BaseService implements Service{
    execute(user: String, data: any): void {
        console.log(`Service executed by ${user} with data:`, data);
    }
}

/**
 * this class proivddes wrapping to the existing object(baseservice) for new functionalities, without modifying the existing code
 * 
 * protected service: Service  --> to hold the reference of the existing object
 * 
 * constructor(service: Service) --> to initialize the existing object
 * 
 * abstract execute(user: String, data: any): void --> to enforce the subclasses to implement their own version of execute method
 * 
 * without this, each decorator class would have to implement the Service interface from scratch, leading to code duplication and inconsistency.
 */
abstract class ServiceDecorator implements Service{
    protected service: Service

    constructor(service: Service){
        this.service = service;
    }

    // this ensures every decorator defines its own execute implementation
    abstract execute(user: String, data: any): void
}


class LoggingDecorator extends ServiceDecorator{
    execute(user: String, data: any): void {
        console.log(`Logging: User ${user} is executing service with data:`, data);
        this.service.execute(user, data);
        console.log(`Logging: User ${user} execution ended with data`, data);
    }
}

// let service  = new BaseService()
// service = new LoggingDecorator(service)
// service.execute("Alice", { key: "value" })

class AuthDecorator extends ServiceDecorator{
    execute(user: String, data: any): void {
        if(this.authenticate(user)){
            console.log(`Authentication successful for user: ${user}`);
            this.service.execute(user, data);
        } else {
            console.log(`Authentication failed for user: ${user}`);
        }
    }

    private authenticate(user: String): boolean {
        // Simple authentication logic for demonstration
        return user === "Alice";
    }
}

// Usage
/**
 * as logging decorator is wrapped after auth decorator, the auth decorator's execute method will be called first
 * 
 * if auth is successful, then the logging decorator's execute method will be called    
 */
let service2 = new BaseService()
service2 = new AuthDecorator(service2)
service2 = new LoggingDecorator(service2)
service2.execute("Alice", { key: "value" })
service2.execute("Bob", { key: "value" })
/**
 * Interface Segregation Principle (ISP)
 *
 * Clients should not be forced to depend on interfaces they do not use.
 * This principle encourages the creation of smaller, more specific interfaces
 * rather than large, general-purpose ones. This leads to more modular and
 * maintainable code.
 * Example:
 * A multifunction printer interface that includes methods for printing, scanning,
 * and faxing.
 */
interface Machine {
  print(document: Document): void;

  scan(document: Document): void;

  fax(document: Document): void;
}

class MultiFunctionPrinter implements Machine {
  print(document: Document): void {
    // actual implementation
  }

  scan(document: Document): void {
    // actual implementation
  }

  fax(document: Document): void {
    // actual implementation
  }
}

/**
 * Now, what if you want to introduce a simple printer that only supports printing? In the above scenario, you would be forced to implement scan and fax methods as well, even though you don't need them. This is clearly a violation of the Interface Segregation Principle.

A better approach is to segregate Machine into more specific interfaces, like so:
 */
interface Printer {
  print(document: Document): void;
}

interface Scanner {
  scan(document: Document): void;
}

interface FaxMachine {
  fax(document: Document): void;
}

class SimplePrinter implements Printer {
  print(document: Document): void {
    // actual implementation
  }
}

class MultiFunctionMachine implements Printer, Scanner, FaxMachine {
  print(document: Document): void {
    // actual implementation
  }

  scan(document: Document): void {
    // actual implementation
  }

  fax(document: Document): void {
    // actual implementation
  }
}

type Post = {
  id: number;
  content: string;
};
/**
 * Another Example: A blogging platform where users can create posts, comment on posts, and share posts.
 * Instead of having a single BlogService interface that includes all these methods,
 * we can segregate them into smaller interfaces.
 * This way, different types of users can implement only the functionalities they need.
 * Now, we can have different classes implement these interfaces according to their actual capabilities:
 */

interface BlogService {
  createPost(post: Post): void;

  commentOnPost(comment: Comment): void;

  sharePost(post: Post): void;
}
interface PostCreator {
  createPost(post: Post): void;
}

interface CommentCreator {
  commentOnPost(comment: Comment): void;
}

interface PostSharer {
  sharePost(post: Post): void;
}

/**
 * Now, each client is only dependent on the interfaces they actually use. An Admin has access to all functionalities while a RegularUser can only comment on and share posts. A ReadOnlyUser does not depend on any of these interfaces as they don't have these capabilities. This is an application of the Interface Segregation Principle in a real-world scenario
 */

class Admin implements PostCreator, CommentCreator, PostSharer {
  createPost(post: Post): void {
    // Actual implementation
  }

  commentOnPost(comment: Comment): void {
    // Actual implementation
  }

  sharePost(post: Post): void {
    // Actual implementation
  }
}

class RegularUser implements CommentCreator, PostSharer {
  commentOnPost(comment: Comment): void {
    // Actual implementation
  }

  sharePost(post: Post): void {
    // Actual implementation
  }
}

class ReadOnlyUser {
  // Doesn't implement any of the interfaces because they can't perform any of these actions.
}
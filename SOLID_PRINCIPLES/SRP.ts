
/**
 * Single Responsibility Principle (SRP)
 * A class should have only one reason to change, meaning it should have only one job or responsibility.    
 * In this example, the BlogPost class is responsible for managing blog post content and displaying it in HTML format.
 * This class has two reasons to change: if the content management logic changes or if the display format changes.
 * To adhere to SRP, we can separate these responsibilities into different classes.
 
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  // Methods related to content management
  createPost() {
    // Implementation here
  }

  updatePost() {
    // Implementation here
  }

  deletePost() {
    // Implementation here
  }

  // Method related to post display
  displayHTML() {
    return `<h1>${this.title}</h1><p>${this.content}</p>`;
  }
}
*/

/**
 * Refactored to adhere to Single Responsibility Principle (SRP)
 * Now, the BlogPost class is only responsible for managing blog post content,
 * while the BlogPostDisplay class is responsible for displaying the blog post in HTML format.  
 * This way, each class has a single responsibility and a single reason to change.
*/
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  // Methods related to content management
  createPost() {
    // Implementation here
  }

  updatePost() {
    // Implementation here
  }

  deletePost() {
    // Implementation here
  }
}

class BlogPostDisplay {
  blogPost: BlogPost;

  constructor(blogPost: BlogPost) {
    this.blogPost = blogPost;
  }

  displayHTML() {
    return `<h1>${this.blogPost.title}</h1><p>${this.blogPost.content}</p>`;
  }
}
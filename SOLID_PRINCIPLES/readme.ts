/**
 * This directory contains examples and explanations of the SOLID principles of object-oriented design.
 *
 * SOLID is an acronym that stands for:
 *  S - Single Responsibility Principle (SRP)           
 *  O - Open/Closed Principle (OCP)
 *  L - Liskov Substitution Principle (LSP)
 *  I - Interface Segregation Principle (ISP)
 *  D - Dependency Inversion Principle (DIP)
 * 
 * 
 *  ********************  SOLID Code Review & Design Checklist  ********************
 */

/**     Code Smell	            Principle to Revisit	                Quick Fix
 * 
File/class doing too much	        SRP	                        Split responsibilities

Adding a new feature requires 
editing existing code	            OCP	                        Use interfaces/polymorphism

Subclass misbehaves or
breaks parent logic	                LSP	                 Recheck inheritance or abstraction

Interfaces have unused methods	    ISP	                      Break into smaller interfaces

Hardcoded dependencies	            DIP	                        Use dependency injection
*/

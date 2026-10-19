**React 19 Features Assignment ( Attempt both tasks)** 

**Task 1: Build the E-Commerce Product Listing & Registration Flow** 

**Problem Statement:** 

Develop a **Mini E-Commerce Application** that displays a list of products and allows a user to register before interacting with the application. The application should demonstrate React 19 features related to **form actions, asynchronous data handling, loading states, Context, metadata, and resource loading**. 

**Requirements** 

**1\. Product Listing** 

Create a product listing/dashboard displaying: 

● Product Name   
● Price   
● Category   
● Product Image   
● Short Description 

Product data can be fetched from a mock API or simulated using a Promise. 

**2\. Asynchronous Data Handling** 

Use React 19's use() API to consume the product-data Promise. The product list should be wrapped inside \<Suspense\> and should display an appropriate loading fallback while the data is being loaded. Also handle an error state appropriately. 

**3\. Document Metadata** 

Use React 19 Document Metadata support to dynamically define: 

● \<title\>   
● \<meta name="description"\> 

For example: Mini E-Commerce Store – Products 

**4\. Asset Loading APIs** 

Implement **at least two** appropriate React 19 Asset Loading APIs from: 

● preload()   
● preinit()   
● preconnect()   
● prefetchDNS() 
  
The candidate should explain why the selected APIs are appropriate for the resources being loaded. **5\. User Registration** 

Add a registration form with: 

● Name   
● Email   
● Password 

The form must use: 

● \<form action={...}\>   
● useActionState()   
● useFormStatus() 

Do **not** use the traditional onSubmit approach. 

**6\. Form Validation & Async Submission** 

Implement: 

● Basic validation   
● Validation/error messages   
● Success message   
● Pending/submission state   
● Simulated asynchronous API request using setTimeout() 

The Submit button should appropriately indicate/handle the pending state using useFormStatus(). **7\. React Context** 

Create a React Context to store the registered user information. 

Use the React 19 Context syntax: 

| \<UserContext value\={...}\> |
| :---- |

instead of: 

| \<UserContext.Provider value\={...}\> |
| :---- |

Display the registered user's information in another component. 

**8\. README** 

Include a short README explaining: 

● How use() is implemented   
● How \<Suspense\> is used   
● How useActionState() is used  
● How useFormStatus() is used   
● How Context is implemented using React 19 syntax   
● Which Asset Loading APIs were selected and why   
● How Document Metadata is implemented 

**Deliverables:** 

The student should continue using the same GitHub repository for the complete assignment. Submit: 

● GitHub Repository URL   
● Branch name   
● Pull Request (PR) link   
● README   
● Screenshots demonstrating important application states 

Suggested screenshots: 

● Product listing   
● Loading state   
● Registration form   
● Form submission/pending state   
● Validation/error state   
● Successful registration   
● Registered user information 

**Task 2: Enhance the Same E-Commerce Application** 

**Problem Statement:** 

Continue working on the application created in Question 1\. 

Add a **Product Details \+ Add to Cart** flow and use additional React 19 features. **Requirements** 

**1\. Product Details** 

When the user selects a product from the product listing, display a Product Details section/page containing: 

● Product Name   
● Price   
● Description   
● Product Image 

**2\. Add to Cart with useOptimistic()** 

Implement an **Add to Cart** button. When the user clicks Add to Cart: 
 
1\. Update the cart count immediately using useOptimistic().   
2\. Simulate an asynchronous API request.   
3\. Display the optimistic state while the request is pending.   
4\. Handle the API failure case appropriately and ensure the UI reflects the actual cart state if the request fails. 

For example: 

Cart: 2 

↓ Add to Cart 

Cart: 3 ← immediately 

↓ API request 

Cart: 3 ← final state 

**3\. Ref as a Prop** 

Create a reusable component that accepts ref directly as a prop, without using forwardRef(). Use the ref for a meaningful DOM operation such as: 

● Focusing an input   
● Scrolling to a section   
● Measuring an element 

**4\. Ref Cleanup** 

Demonstrate React 19's callback-ref cleanup functionality. For example, attach an event listener or observer through a callback ref and return a cleanup function when the element is removed or the ref changes. 

**5\. Server & Client Components** 

Explain how the application could be divided into Server and Client Components. The candidate should explain: 

● Why Product Details can be a Server Component.   
● Why Add to Cart needs to remain a Client Component.   
● How Server and Client Components can work together in an E-Commerce application. 

If using Vite, the implementation can be conceptual, since actual React Server Components require appropriate framework/tooling support such as Next.js. This matches the constraint in your current assignment. 

**6\. React Compiler** 

Add a short explanation in the README describing: 

● What React Compiler does.   
● How it could optimize this application.   
● Give at least one relevant example from the application. 

**Deliverables:** 

Continue using the **same GitHub repository and application** created in Question 1\. 

Update the existing branch/PR or create a new feature branch according to the team's preferred Git workflow. 

Submit: 

● Updated GitHub Repository   
● Updated Pull Request   
● Updated README   
● Screenshots demonstrating the newly implemented functionality 

Suggested screenshots: 

● Product Details   
● Add to Cart optimistic state   
● Updated cart count   
● Ref-based functionality   
● Any relevant UI demonstrating the enhancement 
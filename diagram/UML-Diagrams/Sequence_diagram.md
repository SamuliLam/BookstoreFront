# Sequence Diagram: Online Bookstore Purchase Process
![Sekvenssikaavio](https://github.com/user-attachments/assets/2bd175d5-9f7d-4c55-851f-7356d0fcd1f6)

This sequence diagram illustrates the simplified purchase process in an online bookstore. Below is the step-by-step explanation:

---

## Steps

1. **Book Selection**  
   The process begins when the customer selects a book from the homepage.

2. **Add to Cart**  
   The selected book is added to the shopping cart.

3. **Display Cart View**  
   The customer is presented with the shopping cart view.

4. **Decision Point (alt block)**  
   At this stage, the customer has two options:  
   - **Close Cart and Return to Homepage:**  
     The cart view is closed, and the customer is redirected to the homepage.  
   - **Proceed to Checkout:**  
     The customer navigates to the checkout page to place an order.

5. **Order Placement**  
   If the customer proceeds with the order:  
   - They navigate from the shopping cart to the checkout page.  
   - The customer places the order.  
   - The server confirms the order.  
   - The customer receives a confirmation of a successful order.  
   - Finally, the customer is redirected back to the homepage.

---

## Diagram Structure

The diagram is divided into two main sections:  

- **Loop Block:** Repeats actions related to book selection and adding items to the cart.  
- **Alt Block:** Represents the decision point where the customer chooses between continuing to checkout or returning to the homepage.

---

## Main Components  

1. **Customer**  
   The individual interacting with the bookstore.

2. **Homepage**  
   The main interface where books are displayed.

3. **Shopping Cart**  
   The view where selected books are stored and reviewed.

4. **Checkout**  
   The page where the order is finalized.

5. **Server**  
   The backend system responsible for handling order confirmations and processing.

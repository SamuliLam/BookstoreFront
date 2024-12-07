### Activity diagram
![image](https://github.com/user-attachments/assets/12cd736c-0284-4dbd-a194-1d89cdd4fa6d)

# Diagram Description  

The diagram illustrates the functionality of our project when navigating the main page, with the goal of adding books to the shopping cart, proceeding to checkout, and completing the purchase.

## 1.  
At the beginning, the user navigates to the main page. Simultaneously, the frontend code sends a request to the backend to fetch books from the database and return them so that the books can be displayed on the homepage.

## 2.  
Next, the user can select books from the page to add to the shopping cart. When books are added, the shopping cart view opens, effectively notifying the user that a book has been added and offering the option to proceed to the checkout page. If the user does not proceed to checkout, they can continue adding books to the cart. Otherwise, the system checks if the user has an active JWT.

## 3.  
If the user has an active JWT, they are directed to the checkout page; otherwise, they are redirected to the login page. The backend verifies the credentials provided by the user and either responds with a JWT for successful login or a 403 error for failed login attempts. On successful login, the user is redirected to the checkout page. If the login fails, they can try again.

## 4.  
On the checkout page, the user reviews their details and submits the order. The frontend sends a JSON object to the backend containing the user's ID and the selected products. The backend either creates a successful order and responds with a 200 status code, showing a success message to the user, or fails and responds with a 403 error code, displaying an error message to the user.

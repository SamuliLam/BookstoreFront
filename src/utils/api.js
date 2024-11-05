import axios from "axios";
import i18next from 'i18next';

export const handleSignUp = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const userData = await response.json();
            const {password, ...userDataWithoutPassword} = userData;
            return {success: true, user: userDataWithoutPassword};
        } else {
            const errorData = await response.json();
            return {success: false, error: errorData.message || 'Signup failed'};
        }
    } catch (error) {
        console.error('Signup error:', error);
        return {success: false, error: 'An unexpected error occurred'};
    }
};

export const logIn = async ({email, password}) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (response.ok) {
            const { token, expiresIn } = await response.json();
            const expiresInSeconds = 5;
            const expirationTime = (new Date().getTime() + expiresIn).toString();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('token_expiration', expirationTime);


            setTimeout(() => {
                console.log('Token has expired, logging out...');
                sessionStorage.clear();

                alert('Session expired. Please log in again.');


                window.location.href = '/login';
            }, expiresIn);

            const userResponse = await fetch('http://localhost:8080/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                const {password, ...userDataWithoutPassword} = userData;
                const userToReturn = {...userDataWithoutPassword, token};
                return {success: true, user: userToReturn};
            } else {
                return {success: false, error: 'Failed to fetch user details'};
            }
        } else {
            const errorData = await response.json();
            return {success: false, error: errorData.message || 'Login failed'};
        }
    } catch (error) {
        console.error('Login error:', error);
        return {success: false, error: 'An unexpected error occurred'};
    }
};

export const fetchBooks = async () => {

    const currentLanguage = i18next.language;
    console.log("Current language:", currentLanguage);

    try {
        const response = await axios.get(`http://localhost:8080/books`, {
            headers: {
                'Accept-Language': currentLanguage,
            }
        });

        if (response.status !== 200) {
            throw new Error("Error fetching books " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

export const updateBook = async (id, bookData, token) => {
    try {

        const response = await axios.post(`http://localhost:8080/books/${id}`, bookData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status !== 200) {
            throw new Error("Error updating book " + response.status);
        }
        return response;
    } catch (error) {
        console.error("Error updating books:", error);

    }
}
export const isTokenExpired = () => {
    const tokenExpiration = sessionStorage.getItem('token_expiration');
    return new Date().getTime() > tokenExpiration;
}

export const fetchUsers = async () => {
    try {
        if (isTokenExpired()) {
            return { success: false, error: 'Session expired. Please log in again.' };
        }

        const token = sessionStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/users", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error("Error fetching users " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export const fetchOrders = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/orders", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error("Error fetching orders " + response.status);
        }

        const formattedOrders = response.data.orders.map(order => ({
            id: order.order_id,
            date: new Date(order.orderDate).toLocaleDateString(),
            total: order.total,
            status: "SUCCESSFUL",
            orderItems: order.orderItems.map(item => ({
                book: item.book,
                quantity: item.quantity,
                price: item.price !== null ? item.price : 0
            }))
        }));

        console.log(formattedOrders);
        return { success: true, orders: formattedOrders };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { success: false, error: error.message };
    }
};

export const fetchOrdersAdmin = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get("http://localhost:8080/orders", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error("Error fetching orders " + response.status);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { success: false, error: error.message };
    }
};

export const fetchSearchResults = async (searchText, language) => {
    try {
        if (searchText.length < 3) {
            return [];
        }
        const response = await axios.get(`http://localhost:8080/books/search?query=${searchText}`);
        if (response.status !== 200) {
            throw new Error("Error fetching search results " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

export const fetchInventoryResult = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:8080/inventory/${bookId - 100}`);
        if (response.status !== 200) {
            throw new Error("Error fetching data: " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory:", error)
    }
}

export const addOrder = async (orderData, token) => {
    console.log("orderData", orderData);
    try {
        const response = await axios.post("http://localhost:8080/orders/addOrder", orderData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return {success: true};
        } else {
            return {success: false, error: 'Failed to add order'};
        }
    } catch (error) {
        console.error("Error adding order:", error);
        return {success: false, error: error.message};
    }
};

export const updateInventory = async (bookId, quantity, token, book) => {
    try {
        console.log("Attempting to update inventory for book ID:", bookId);
        console.log("Updating with quantity:", quantity);

        const inventoryId = bookId - 100;
        console.log("Calculated Inventory ID:", inventoryId);


        const currentInventoryResponse = await fetchInventoryResult(bookId);
        const currentUsedStockLevel = currentInventoryResponse?.stock_level_used;
        const currentNewStockLevel = currentInventoryResponse?.stock_level_new;

        console.log("Current used stock level:", currentUsedStockLevel);
        console.log("Current new stock level:", currentNewStockLevel);
        if (currentUsedStockLevel < quantity || currentNewStockLevel < quantity) {
            console.error("Not enough stock available");
            return {success: false};
        }

        let stockLevelNew;
        if (book === "New") {
            console.log(book)
            stockLevelNew = currentNewStockLevel - quantity;
        } else if (book === "Used") {
            console.log(book)
            stockLevelNew = currentUsedStockLevel - quantity;
        }

        const updateData = {
            stock_level_new: book === "New" ? stockLevelNew : currentNewStockLevel,
            stock_level_used: book === "Used" ? stockLevelNew : currentUsedStockLevel,
        };


        console.log("Update Data:", updateData);
        console.log(token);

        const response = await axios.post(`http://localhost:8080/inventory/${inventoryId}`, updateData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        });

        if (response.status === 200) {
            console.log("Inventory updated successfully:", response.data);
            return response.data;
        } else {
            console.error("Failed to update inventory:", response.data, response.status);
            return {success: false};
        }
    } catch (error) {
        if (error.response) {
            console.error("Error updating inventory:", error.response.data);
        } else {
            console.error("Error updating inventory:", error.message);
        }
        return {success: false};
    }
};

export const updateUser = async (userId, updates, token) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/users/update/${userId}`,
            updates,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return response
        } else {
            return {success: false, error: 'Failed to update profile'};
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        if (error.response) {
            if (error.response.status === 401) {
                return {success: false, error: 'Unauthorized. Please log in again.'};
            } else if (error.response.status === 404) {
                return {success: false, error: 'User not found.'};
            }
        }
        return {success: false, error: 'An unexpected error occurred'};
    }
};

export const addBook = async (bookData, token) => {
    try {
        const response = await axios.post("http://localhost:8080/books", bookData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201){
            return response;
        }
    } catch (error) {
        console.error("Error creating book:", error);
        return {success: false, error: error.response?.data?.message || error.message};
    }
};

export const deleteBook = async (book_id, token) => {
    console.log('bookid ' + book_id)
    try {
        const response = await axios.delete(`http://localhost:8080/books/${book_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return {success: true, data: response.data};
        } else {
            return {success: false, error: 'Failed to delete book'};
        }
    } catch (error) {
        return {success: false, error: error.message}
    }
}

export const deleteUser = async (user_id, token) => {
    try {
        const response = await axios.delete(`http://localhost:8080/users/delete/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return {success: true, data: response.data};
        } else {
            return {success: false, error: 'Failed to delete book'};
        }
    } catch (error) {
        return {success: false, error: error.message}
    }
}

export const deleteOrder = async (order_id, token) => {
    try {
        const response = await axios.delete(`http://localhost:8080/orders/delete/${order_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return {success: true, data: response.data};
        } else {
            return {success: false, error: 'Failed to delete book'};
        }
    } catch (error) {
        return {success: false, error: error.message}
    }
}

export const getOrderById = async (order_id, token) => {
    try {
        const response = await axios.get(`http://localhost:8080/orders/${order_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return {success: true, data: response.data};
        } else {
            return {success: false, error: 'Failed to get order'};
        }
    } catch (error) {
        return {success: false, error: error.message}
    }
}

export const addUser = async (user, token) => {
    try {
        const response = await axios.post("http://localhost:8080/users/add", user, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            return {success: true, data: response.data};
        } else {
            return {success: false, error: 'Failed to add user'};
        }
    } catch (error) {
        return {success: false, error: error.message}
    }
}

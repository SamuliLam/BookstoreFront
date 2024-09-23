import axios from "axios";

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
            const { password, ...userDataWithoutPassword } = userData;
            return { success: true, user: userDataWithoutPassword };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'Signup failed' };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
};

export const logIn = async ({ email, password }) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { token } = await response.json();

            const userResponse = await fetch('http://localhost:8080/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                const { password, ...userDataWithoutPassword } = userData;
                const userToReturn = { ...userDataWithoutPassword, token };
                sessionStorage.setItem('token', token);
                return { success: true, user: userToReturn };
            } else {
                return { success: false, error: 'Failed to fetch user details' };
            }
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
};

export const fetchBooks = async () => {
    try {
        const response = await axios.get("http://localhost:8080/books");
        if (response.status !== 200) {
            throw new Error("Error fetching books " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

export const fetchUsers = async () => {
    try {
        const token = sessionStorage.getItem('token' );
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
        const token = sessionStorage.getItem('token' );
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
    }
}

export const fetchAuthors = async () => {
    try {
        const token = sessionStorage.getItem('token' );
        const response = await axios.get("http://localhost:8080/authors", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            throw new Error("Error fetching authors " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
}

export const fetchSearchResults = async (searchText) => {
    try {
        if(searchText.length < 3) {
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
        if(response.status !== 200)
        {
            throw new Error("Error fetching data: " + response.status);
        }
        return response.data;
    }
    catch (error) {
        console.error("Error fetching inventory:", error)
    }
}

export const addOrder = async (orderData, token) => {
    try {
        const response = await axios.post("http://localhost:8080/orders/addOrder", orderData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false, error: 'Failed to add order' };
        }
    } catch (error) {
        console.error("Error adding order:", error);
        return { success: false, error: error.message };
    }
};
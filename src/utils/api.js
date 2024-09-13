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
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}
export const logIn = async ({ email, password }) => {
    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return { success: true, user: data.user };
    } catch (error) {
        console.error("Error logging in:", error);
        return { success: false };
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
        const response = axios.get("http://localhost:8080/users");
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
        const response = axios.get("http://localhost:8080/orders");
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
        const response = axios.get("http://localhost:8080/authors");
        if (response.status !== 200) {
            throw new Error("Error fetching authors " + response.status);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
}

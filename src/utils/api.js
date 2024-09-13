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

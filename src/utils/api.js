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

                // Exclude password from userData
                const { password, ...userDataWithoutPassword } = userData;

                const userToReturn = { ...userDataWithoutPassword, token };

                // Save user data in local storage
                localStorage.setItem('user', JSON.stringify(userToReturn));

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

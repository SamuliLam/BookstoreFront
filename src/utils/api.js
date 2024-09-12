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

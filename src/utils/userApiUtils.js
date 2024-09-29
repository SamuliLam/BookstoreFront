import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const updateUserProfile = async (userId, updates, token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/users/update/${userId}`,
            updates,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return { success: true, user: response };
        } else {
            return { success: false, error: 'Failed to update profile' };
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        if (error.response) {
            if (error.response.status === 401) {
                return { success: false, error: 'Unauthorized. Please log in again.' };
            } else if (error.response.status === 404) {
                return { success: false, error: 'User not found.' };
            }
        }
        return { success: false, error: 'An unexpected error occurred' };
    }
};

export const changeUserPassword = async (userId, newPassword, token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/users/update/${userId}`,
            { password: newPassword },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return { success: true, user: response.data };
        } else {
            return { success: false, error: 'Failed to update password' };
        }
    } catch (error) {
        console.error('Error changing user password:', error);
        if (error.response) {
            if (error.response.status === 401) {
                return { success: false, error: 'Unauthorized. Please log in again.' };
            } else if (error.response.status === 404) {
                return { success: false, error: 'User not found.' };
            }
        }
        return { success: false, error: 'An unexpected error occurred' };
    }
};

export const getUserOrders = async (token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/orders/me`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return { success: true, orders: response.data };
        } else {
            return { success: false, error: 'Failed to fetch orders' };
        }
    } catch (error) {
        console.error('Error fetching user orders:', error);
        if (error.response) {
            if (error.response.status === 401) {
                return { success: false, error: 'Unauthorized. Please log in again.' };
            } else if (error.response.status === 403) {
                return { success: false, error: 'Access forbidden. You may not have the necessary permissions.' };
            } else if (error.response.status === 404) {
                return { success: false, error: 'Orders not found.' };
            }
        }
        return { success: false, error: 'An unexpected error occurred' };
    }
};
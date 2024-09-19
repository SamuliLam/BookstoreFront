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
            return { success: true, user: response.data };
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

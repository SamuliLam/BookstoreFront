import axios from 'axios';

export const updateUserProfile = async (userId, userData, token) => {
    try {
        console.log('Sending update request with token:', token);
        console.log('User data being sent:', userData);

        const response = await axios.post(`http://localhost:8080/users/update/${userId}`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Update response:', response);

        if (response.status === 200) {
            return { success: true, user: response.data };
        } else {
            return { success: false, error: 'Failed to update user profile' };
        }
    } catch (error) {
        console.error('Profile update error:', error);

        if (error.response) {
            console.error('Error response:', error.response);
            console.error('Error response data:', error.response.data);

            if (error.response.status === 403) {
                console.error('Authentication failed. Token might be invalid or expired.');
                return { success: false, error: 'Authentication failed. Please log in again.' };
            } else if (error.response.status === 400) {
                return { success: false, error: 'Invalid data provided. Please check your input.' };
            } else if (error.response.status === 404) {
                return { success: false, error: 'User not found.' };
            } else {
                return { success: false, error: `Server error: ${error.response.data.message || 'Unknown error'}` };
            }
        }
        return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
};
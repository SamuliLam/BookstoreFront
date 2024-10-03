import { Navigate } from 'react-router-dom';
import { useUserContext } from "../context/UserContext.jsx";

export const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to='/login' />;
    }

    if (requiredRole === 'ADMIN' && user.role !== 'ADMIN') {
        return <Navigate to='/' />;
    }

    if (requiredRole === 'USER' && (user.role === 'USER' || user.role === 'ADMIN')) {
        return children;
    }

    if (requiredRole === 'ADMIN' && user.role === 'ADMIN') {
        return children; 
    }

    return <Navigate to='/' />;
};

export default PrivateRoute;

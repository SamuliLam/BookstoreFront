import {Navigate} from 'react-router-dom';
import {useUserContext} from "../context/UserContext.jsx";

export const PrivateRoute = ({children}) => {
    const {user} = useUserContext();


    if (!user){
        return <Navigate to='/login'/>
    }

    if (user.role !== 'ADMIN'){
        return <Navigate to='/'/>
    }

    return children;
}

export default PrivateRoute;
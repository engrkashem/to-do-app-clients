import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../firebase.init';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className=' flex justify-center items-center'>
            <button className="btn btn-primary loading">loading</button>
        </div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;;
};

export default RequireAuth;
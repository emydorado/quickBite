import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';

const ProtectedRoute = ({ children }) => {
	const { uid, isLoading } = useSelector((state) => state.auth);

	if (isLoading) return <Loader />;

	return uid ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;

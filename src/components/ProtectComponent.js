
import { Navigate, Outlet } from 'react-router-dom';

const ProtectComponent = ({ role }) => {
  const storedUserRole = localStorage.getItem('userRole');

  if (!storedUserRole || storedUserRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectComponent;
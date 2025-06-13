import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, userRole, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="text-xl opacity-90">Please log in to access this page.</p>
      </div>
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
        <p className="text-xl mb-2 opacity-90">You don't have permission to access this page.</p>
        <p className="text-lg mb-1 opacity-80">Required role: {allowedRoles.join(' or ')}</p>
        <p className="text-lg opacity-80">Your role: {userRole}</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
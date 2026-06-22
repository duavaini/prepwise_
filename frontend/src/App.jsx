import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import CompanyPage from './pages/CompanyPage';
import AnalysisResult from './pages/AnalysisResult';
import Experiences from './pages/Experiences';
import SubmitExperience from './pages/SubmitExperience';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#6b7280' }}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/companies" element={<PrivateRoute><Companies /></PrivateRoute>} />
        <Route path="/companies/:slug" element={<PrivateRoute><CompanyPage /></PrivateRoute>} />
        <Route path="/analysis/:slug" element={<PrivateRoute><AnalysisResult /></PrivateRoute>} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/submit" element={<PrivateRoute><SubmitExperience /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

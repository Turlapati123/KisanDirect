import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './components/LoginForm';
import FarmerDashboard from './components/FarmerDashboard';
import LanguageSelector from './components/LanguageSelector';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserType(userData.userType);
    }
  }, []);

  const handleLogin = (email: string, password: string, type: string) => {
    // In a real app, this would validate with a backend
    const userData = {
      email,
      userType: type
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">KisanDirect</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                {t('common.logout')}
              </button>
            )}
          </div>
        </div>
      </nav>

      <main>
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            {userType === 'farmer' && <FarmerDashboard />}
            {/* Add other dashboard components for different user types */}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../@types/navigation-params'; 
import { useAuth } from '../context/authContext';

export function useAuthCheck() {
  const { isAuthenticated, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const checkAuth = () => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return { checkAuth, handleLogout };
}

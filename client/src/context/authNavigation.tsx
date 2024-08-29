import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../@types/navigation-params'; 
import { useAuth } from '../context/authContext';
import { Alert } from 'react-native';

export function useAuthCheck() {
  const { isAuthenticated, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const checkAuth = () => {
    if (!isAuthenticated){
    Alert.alert(
        'Autenticação Necessária',
        'Você precisa estar logado para acessar esta tela.',
        [
          { text: 'Ir para Login', onPress: () => navigation.navigate('Login') },
        ],
        { cancelable: false }
      );
    }
  };
  const handleLogout = () => {
    logout();
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
  };

  return { checkAuth, handleLogout };
}

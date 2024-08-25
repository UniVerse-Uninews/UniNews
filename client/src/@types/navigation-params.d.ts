import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
        Login: undefined;
        Feed: undefined;
        Pesquisar: undefined;
        Perfil: undefined;
        PerfilUniversidade: { universityId: string };
        Temas: undefined;
        Cadastro: undefined;
        CrudUsuario: undefined;
        CrudUniversidade: undefined;
        LerNoticia: undefined;
        teste: undefined;
}

// Tipagem para navegação
export type NavigationProp = StackNavigationProp<RootStackParamList>;

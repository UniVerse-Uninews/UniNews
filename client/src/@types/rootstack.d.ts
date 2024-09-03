import { university } from './university';

export type RootStackParamList = {
    Feed: undefined;
    Pesquisar:  { navigation};
    Perfil: undefined;
    PerfilUniversidade: { universityId: string };
    Temas: undefined;
    Login: undefined;
    Cadastro: undefined;
    CrudUsuario: undefined;
    CrudUniversidade: undefined;
    LerNoticia: undefined;
    teste: undefined;
};

import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
    Feed: undefined;
    LerNoticia: { noticia: any }; 
    Pesquisar: { navigation:any};
    PerfilUniversidade: { universityId: string };
} & ParamListBase;  
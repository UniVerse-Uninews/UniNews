import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
    Feed: undefined;
    LerNoticia: { noticia: any }; 
} & ParamListBase;  
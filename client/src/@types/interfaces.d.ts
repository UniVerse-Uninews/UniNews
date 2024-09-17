
export interface NewsProps {
    universityId: string;
    universityImage: string; 
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    passwordHash: string; 
    confirmPassword: string;
}

export interface DrawerProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}

export type PerfilUniversidadeRouteProp = RouteProp<RootStackParamList, 'PerfilUniversidade'>;
export type PerfilUniversidadeNavigationProp = StackNavigationProp<RootStackParamList, 'PerfilUniversidade'>;

export interface PerfilUniversidadeProps {
    route: PerfilUniversidadeRouteProp;
    navigation: PerfilUniversidadeNavigationProp;
}

export interface LoginResponse {
    token: string;
    role: string;
    id: string;
}

export interface NewsItem {
    link: string;
    image?: string;
    title: string;
    description?: string;
    published?: string;
    universityId: string;
  }

export interface NewsCardProps {
    news: NewsItem[];
    savedNewsIds: Set<string>;
    handleSaveNews: (item: NewsItem) => void;
    handleRemoveNews: (newsUrl: string) => void;
  }
    
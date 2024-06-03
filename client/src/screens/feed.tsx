import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import React from 'react'; 
import { styles } from '@styles/styleFeed';
import { View } from 'react-native';
export { ThemeNews } from '../components/addTheme/theme';

import { ThemeNews } from '../components/addTheme/theme';

export function Feed({ navigation }: any) {
    return (
        <>
            <Header />
                <Container style={styles.container}>
                    <View style={styles.box}>
                        <ThemeNews name="Biológicas" />
                        <ThemeNews name="Exatas" />
                        <ThemeNews name="Humanas" />
                        <ThemeNews name="Linguagens" />
                        <ThemeNews name="Tecnologia" />
                    </View>
                </Container>
        </>
    );
}
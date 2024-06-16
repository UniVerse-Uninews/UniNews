import React, { useState } from 'react';
import { styles } from '@styles/styleFeed';
import { ThemeNews } from '../components/addTheme/theme';
import { Header } from '@components/addHeader/header';
import { Container } from '@theme/style';
import { Footer } from '../components/addFooter/footer';
import { View, TextInput } from 'react-native';
import { News } from '@components/addNews/news';
import debounce from 'lodash.debounce';
import { fetchUniversities } from '@services/api';

export function Feed({ navigation }: any) {
    const [universityName, setUniversityName] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUniversityNameChange = debounce(async (name: string) => {
        try {
            if (!name.trim()) {
                setUniversityId(''); 
            }
            setLoading(true);
            const universities = await fetchUniversities();
            const matchedUniversity = universities.find((university) => university.title === name);
            if (matchedUniversity) {
                setUniversityId(matchedUniversity.id);
            } else {

                setUniversityId('');
            }
        } catch (error) {
            console.error('Error fetching university:', error);
        } finally {
            setLoading(false);
        }
    }, 500);

    return (
        <>
            <Header/>
            <Container style={styles.container}>
                <Container style={styles.view}>
                    <View style={styles.box}>
                        <ThemeNews name="Biológicas" />
                        <ThemeNews name="Exatas" />
                        <ThemeNews name="Humanas" />
                        <ThemeNews name="Linguagens" />
                        <ThemeNews name="Tecnologia" />
                    </View>
                    <TextInput
                        placeholder="Type university name..."
                        value={universityName}
                        onChangeText={(text) => {
                            setUniversityName(text);
                            handleUniversityNameChange(text);
                        }}
                    />
                    {loading && <p>Loading...</p>}
                    {universityId && !loading && <News universityId={universityId} />}
                </Container>
            </Container>
            <Footer/>
        </>
    );
}

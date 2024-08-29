import { BorderColorButtonYellow, NameBlue } from '../../theme/style';
import React from 'react';
import { styles } from './themeStyle';



export function ThemeNews({university}: any) {
    return (
        <>
            <BorderColorButtonYellow style={styles.border}>
                <NameBlue style={styles.text}>{university}</NameBlue>
            </BorderColorButtonYellow>
        </>
    );
}
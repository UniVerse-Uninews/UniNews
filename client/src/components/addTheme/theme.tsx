import { BorderColorButtonYellow, NameBlue } from '../../theme/style';
import React from 'react';
import { styles } from './themeStyle';

interface ThemeProps {
    name: string;
}

export function ThemeNews({name}: ThemeProps) {
    return (
        <>
            <BorderColorButtonYellow style={styles.border}>
                <NameBlue style={styles.text}>{name}</NameBlue>
            </BorderColorButtonYellow>
        </>
    );
}
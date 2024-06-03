import { BorderColorTable, NameBlue } from '../../theme/style';
import React from 'react';
import { styles } from './themeStyle';

interface ThemeProps {
    name: string;
}

export function ThemeNews({name}: ThemeProps) {
    return (
        <>
            <BorderColorTable style={styles.border}>
                <NameBlue>{name}</NameBlue>
            </BorderColorTable>
        </>
    );
}
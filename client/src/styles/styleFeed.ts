import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: { // Added a colon (:) after "box"
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
});
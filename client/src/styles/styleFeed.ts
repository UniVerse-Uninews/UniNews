import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    view: {
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(1),
        marginRight: responsiveWidth(1),
    },
    box: { // Added a colon (:) after "box"
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: responsiveHeight(2),
    },
});
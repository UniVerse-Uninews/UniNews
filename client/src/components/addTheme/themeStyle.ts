import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        width: responsiveWidth(20),
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(3),
    },
});
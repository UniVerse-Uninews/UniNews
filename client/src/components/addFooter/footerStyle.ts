import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        height: responsiveHeight(8),
        paddingTop: responsiveHeight(2),
        
    },
    button:{
        width: responsiveWidth(20),
        marginLeft: responsiveWidth(7),
    },
    icon:{
        width: responsiveWidth(5),
        height: responsiveHeight(3),
    },
    line: {
        borderWidth: 2,
        width: '100%',
      },
});

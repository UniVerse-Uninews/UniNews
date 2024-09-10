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
        width: responsiveWidth(6),
        height: responsiveHeight(3),
        

    },
    button1:{
        width: responsiveWidth(10),
        marginLeft: responsiveWidth(7),
    },
    line: {
        borderWidth: 1.3,
        width: '100%',
        backgroundColor: '#000',
      },
});

import { StyleSheet } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container1:{
        flex: 1,
    },
    container2:{
        flexDirection:'row',
    },
    container3:{
        flexDirection:'column',
        position: 'relative',
    },
    description:{
        borderWidth:3
    },
    filtro:{
        width: responsiveScreenHeight(5),
        height: responsiveScreenHeight(5),
    },
    pesquisa:{
        width:200,
    },
    impesqui:{
        width: 15
    },
    dropdown:{},
    text:{
        position: 'relative',
    },
});
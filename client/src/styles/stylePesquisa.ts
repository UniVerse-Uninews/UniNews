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
    autocompletesContainer: {
        paddingTop: 0,
        zIndex: 1,
        width: '100%',
        paddingHorizontal: 8,
      },
      plus: {
        position: 'absolute',
        left: 15,
        top: 10,
      },
      input: {maxHeight: 40},
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c7c6c1',
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: '5%',
    width: '100%',
    justifyContent: 'flex-start',
  },
});
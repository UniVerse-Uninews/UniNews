import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  title: {
    width: '20%',
    fontFamily: 'Rubik',
  },
  header: {
    borderBottomColor: '#F3C63B',
  },
  row: {
    width: '100%',
    borderBottomColor: '#F3C63B',
    padding: 10,
  },
  cell: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Rubik',
  },
});

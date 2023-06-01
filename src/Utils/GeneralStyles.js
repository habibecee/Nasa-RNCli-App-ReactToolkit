import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#8294C4',
  secondary: '#ACB1D6',
  tertiary: '#DBDFEA',
  light: '#F6F1F1',
  dark: '#654E92',
  red: '#B70404',

  bgLight: '#FDF4F5',
  bgGreen: '#F6FFDE',
  darkGreen: '#41644A',
  darkShadowGreen: '#AAC8A7',
  darkBlue: '#146C94',

  textDark: '#301E67',
  textLight: '#635985',
  textPrimary: '#393053',
  textSecondary: '#443C68',
  textPrice: '#FF5403',

  red: '#F90716',
  // FF6969
};

export const fonts = {
  light: 'Kalam-Light',
  regular: 'Kalam-Regular',
  bold: 'Kalam-Bold',
};

export const GeneralStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.tertiary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },

  tabIcon: {
    width: 50,
    height: 50,
  },
});

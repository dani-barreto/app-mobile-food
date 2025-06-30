import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const register_styles = StyleSheet.create({
  top: {
      flex: 1,
      flexDirection: "row",
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      marginLeft: 0,
      marginTop: 70
  },
  medium: {
      flex: 6,

      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingTop: 10
  },
  bottom: {
      flex:3,
      alignItems: 'center',
  },
  AreaSubTitle: {
      marginTop: 17,
      flexDirection: 'row'
    },
  AreaButtomBlack: {
    position: "relative",
    marginLeft: 35,
    marginTop: 120,
  },
  radio: {
      flexDirection: 'row',
      justifyContent: "space-between"
  },
  TextRadio:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  window: {
    width,
    height,
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#F1fafa',
  },
  ButtomBlack: {
        width: 343,
        height: 52,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
  },
  ButtomTitleBlack: {
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 15,
      display: 'flex',
      color: '#fff',
      alignItems: 'center',
  },
  ButtomWhite: {
        width: 343,
        height: 52,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
  },
  ButtomTitleWhite: {
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 15,
      display: 'flex',
      color: '#000',
      borderColor: '#000'
  },
  title: {
        fontSize:50,
        marginLeft: 0,
        fontWeight: '600'
  },
  TextInput:{
      borderWidth: 2,
      borderColor: "#000",
      borderRadius: 10,
      width: 343,
      height: 52,
      paddingLeft: 10,
      paddingRight: 10,        
  },
  SubTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 135,
    height: 30,
    position: "relative"
  }, 
  TextSubTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 15,
    display: 'flex',
    textAlign: 'center',
    color: '#000000',
  }
})

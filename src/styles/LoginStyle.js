import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    itemsList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    itemtext: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    main: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#EFE5FF'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
    },
    input: {
      margin: 10,
      paddingLeft: 15,
      paddingRight: 15,
      width: 300,
      backgroundColor: 'rgba(255,255,255,0.4)',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      fontWeight: '100',
      alignSelf: 'center',
      backgroundColor: '#D863FF',
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 60,
      paddingRight: 60,
      borderRadius: 10
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    lblLogin: {
      textAlign: "center",
    },
    logo: {
      marginBottom: 60
    },
    formulario: {
      padding: 30,
      justifyContent: 'space-between'
    }
  });
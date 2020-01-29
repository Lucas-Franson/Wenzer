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
    backgroundColor: '#FFF'
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
    width: 320,
    backgroundColor: '#8100CB',
    color: '#FFF',
    fontSize: 14,
    borderColor: '#707070',
    borderWidth: 1
  },
  buttonText: {
    backgroundColor: '#4ED44E',
    borderRadius: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 125,
    paddingRight: 125,
    fontSize: 64,
    color: '#111',
    fontWeight: '100',
    alignSelf: 'center',
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
    margin: 20

  },
  formulario: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  contorno: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#C144FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#707070',
  }
});
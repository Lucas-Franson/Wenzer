import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

import { LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from '../styles/LoginStyle';
import { addItem } from '../services/Crud';
import { db } from '../services/Config';
import logo from '../img/drawable-xhdpi/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const getItems = db.ref('/items');

export default class App extends Component {
  state = {
    login: [],
    senha: [],
  };

  handleChangeLogin = e => {
    this.setState({
      login: e.nativeEvent.text,
    });
  };

  handleChangeSenha = e => {
    this.setState({
      senha: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    // addItem(this.state.name, 'items');
  };

  componentDidMount() {
    // getItems.on('value', snapshot => {
    //   let data = snapshot.val();
    //   if(data != undefined && data != null){
    //     let items = Object.values(data);
    //     this.setState({ items });
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.logo}>

          <Image source={logo} style={{ width: 112, height: 126 }} />
        </View>
        <View style={styles.contorno}>
          <View style={styles.formulario}>
            <View style={{ flex: 6 }}>
              <View style={styles.inputSection}>
                <TextInput
                  style={[styles.textInput, styles.input]}
                  placeholder="E-mail"
                  placeholderTextColor="#FFF"
                  maxLength={40}
                  autoCompleteType="username"
                  onChange={this.handleChange} />
              </View>

              <View style={styles.inputSection}>

                <TextInput
                  style={[styles.textInput, styles.input]}
                  placeholder="Senha"
                  placeholderTextColor="#FFF"
                  maxLength={40}
                  autoCompleteType="password"
                  secureTextEntry={true}
                  onChange={this.handleChange} />
                <Text style={{ marginLeft: 10, color: '#FFF' }}>Esqueci minha senha</Text>
              </View>
            </View>

            <View style={{ flex: 2 }}>
              <TouchableOpacity
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('Posts')}>
                <Text style={{ color: '#FFF', fontSize: 34 }}>Entrar</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, fontSize: 28, flexDirection: 'row' }}>
              <Text style={{ color: '#FFF' }}>Não tem uma conta? </Text>
              <Text style={{ color: '#4ED44E' }}> Registre-se</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ height: 10, borderBottomColor: '#7400AE', borderBottomWidth: 1, width: 150, margin: 10 }}></View>
              <View>
                <Text style={{ color: '#FFF' }}>ou</Text>
              </View>
              <View style={{ height: 10, borderBottomColor: '#7400AE', borderBottomWidth: 1, width: 150, margin: 10 }}></View>
            </View>

            <View style={{ flex: 3 }}>
              <LoginButton
                style={{ paddingTop: 20, paddingBottom: 20, paddingRight: 120, paddingLeft: 120, backgroundColor: '#485496', borderRadius: 30 }}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("Erro no login: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("Login cancelado.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log(data.accessToken.toString())
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")} />
            </View>

          </View>
        </View>
      </View>
    )
  }
};

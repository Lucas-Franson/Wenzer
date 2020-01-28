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

          <Image source={logo} style={{ width: 192, height: 206 }} />
        </View>
        <View style={styles.contorno}>
          <View style={styles.formulario}>
            <View style={styles.inputSection}>
              <Icon name="email" style={styles.inputEmailIcon} size={20} color="#000" />
              <TextInput
                style={[styles.textInput, styles.input]}
                placeholder="E-mail"
                placeholderTextColor="#FFF"
                maxLength={40}
                autoCompleteType="username"
                onChange={this.handleChange} />
            </View>

            <View style={styles.inputSection}>
              <Icon name="lock" style={styles.inputEmailIcon} size={20} color="#000" />
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

            <View>
              <TouchableOpacity
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('Posts')}>
                <Text>Login</Text>
              </TouchableOpacity>
              <LoginButton
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

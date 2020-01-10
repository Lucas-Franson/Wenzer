import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

import {LoginButton, AccessToken} from 'react-native-fbsdk';
import styles from '../styles/LoginStyle';
import {addItem} from '../services/Crud';
import {db} from '../services/Config';
import logo from '../img/logo-wenzer.png';

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
        {/* <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>

        <View style={styles.itemsList}>
          {this.state.items.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.itemtext}>{item.name}</Text>
              </View>
            );
          })}
        </View> */}
        <View style={styles.logo}>

          <Image source={logo} style={{width: 210, height: 210}} />
        </View>
        <View style={styles.formulario}>
          <View>

            <TextInput 
              style={[styles.textInput, styles.input]}
              placeholder="Usuário"
              maxLength={40}
              autoCompleteType="username"
              onChange={this.handleChange} />
          </View>

          <View>

            <TextInput 
              style={[styles.textInput, styles.input]}
              placeholder="Senha"
              maxLength={40}
              autoCompleteType="password"
              secureTextEntry={true}
              onChange={this.handleChange} />
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
              onLogoutFinished={() => console.log("logout.")}/>
          </View>
        </View>
      </View>
    )
  }
};

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

// import { LoginManager, LoginButton } from 'react-native-fbsdk';
import styles from '../styles/LoginStyle';
import { addItem } from '../services/Crud';
import { db } from '../services/Config';
import logo from '../img/drawable-xhdpi/logo.png';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPassword from '../components/ForgotPassword';

const getItems = db.ref('/items');

export default class App extends Component {
  state = {
    screen: 'login'
  }

  handleChangeScreen (screen) {
    this.setState({screen});
  }

  render() {
    let screen = null;

    if(this.state.screen == 'login')
      screen = <LoginForm handleChangeScreen={this.handleChangeScreen.bind(this)} navigation={this.props.navigation} />
    else if(this.state.screen == 'register')
      screen = <RegisterForm handleChangeScreen={this.handleChangeScreen.bind(this)} />
    else
      screen = <ForgotPassword handleChangeScreen={this.handleChangeScreen.bind(this)} />
    
    return (
      <View style={styles.main}>
        <View style={styles.logo}>
          <Image source={logo} style={{ width: 112, height: 126 }} />
        </View>
        <View style={styles.contorno}>
          {screen}
        </View>
      </View>
    )
  }
};

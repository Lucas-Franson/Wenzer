import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../styles/LoginStyle';

export default class Register extends Component {
  render() {
    return (
      
      <View style={styles.formulario}>
        <View style={{ flex: 1 }}>
            <View style={styles.inputSection}>
                <TextInput
                style={[styles.textInput, styles.input]}
                placeholder="E-mail"
                placeholderTextColor="#FFF"
                maxLength={40}
                autoCompleteType="email"
                onChange={this.handleChange} />
            </View>
            <TouchableOpacity
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('Posts')}>
              <Text style={{ color: '#FFF', fontSize: 28 }}>ENVIAR</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ color: '#FFF', fontSize: 16 }}>Lembrou sua senha? </Text>
          <TouchableOpacity
            onPress={() => this.props.handleChangeScreen('login')}
          >
              <Text style={{ color: '#4ED44E', fontSize: 16 }}> Faça Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

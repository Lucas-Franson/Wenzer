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
        
        <View style={{ flex: 6 }}>
          <View style={styles.inputSection}>
            <TextInput
            style={[styles.textInput, styles.input]}
            placeholder="E-mail"
            placeholderTextColor="#FFF"
            maxLength={40}
            autoCompleteType="email"
            onChange={this.handleChange} />
          </View>
          <View style={styles.inputSection}>
            <TextInput
            style={[styles.textInput, styles.input]}
            placeholder="Nome de usuário"
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
          </View>
          <View style={styles.inputSection}>
            <TextInput
            style={[styles.textInput, styles.input]}
            placeholder="Confirme sua senha"
            placeholderTextColor="#FFF"
            maxLength={40}
            autoCompleteType="password"
            secureTextEntry={true}
            onChange={this.handleChange} />
          </View>
        </View>

        <View style={{ flex: 1}}>
          <TouchableOpacity
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('Posts')}>
              <Text style={{ color: '#FFF', fontSize: 28 }}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ color: '#FFF', fontSize: 16 }}>Já possui uma conta? </Text>
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

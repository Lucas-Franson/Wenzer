import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    TouchableHighlight,
    Alert
} from 'react-native';

import styles from '../styles/LoginStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager } from 'react-native-fbsdk';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: [],
            senha: [],
        };
    }

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

    handleRegister() {

    }

    handleForgotPassword() {
    
    }

    handleFacebookLogin() {
        LoginManager.logInWithPermissions(['email', 'public_profile', 'user_friends']).then(
            function (result) {
                debugger;
            if (result.isCancelled) {
                console.log('Login cancelled')
                Alert.alert("Canceled: "+JSON.stringify(result));
            } else {
                console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                Alert.alert("Success");
            }
            },
            function (error) {
                debugger;
                Alert.alert("error: " + error);
            }
        )
    }

    render() {

        return(
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
                        placeholder="Senha"
                        placeholderTextColor="#FFF"
                        maxLength={40}
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChange={this.handleChange} />
                        <TouchableOpacity
                        onPress={() => this.props.handleChangeScreen('ForgotPassword')}
                        >
                            <Text style={{ marginLeft: 10, color: '#FFF' }}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        style={styles.buttonText}
                        onPress={() => this.props.navigation.navigate('Initial')}>
                        <Text style={{ color: '#FFF', fontSize: 34 }}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ color: '#FFF', fontSize: 16 }}>Não tem uma conta? </Text>
                    <TouchableOpacity
                        onPress={() => this.props.handleChangeScreen('register')}
                    >
                        <Text style={{ color: '#4ED44E', fontSize: 16 }}> Registre-se</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 10, borderBottomColor: '#7400AE', borderBottomWidth: 1, width: 150, margin: 10 }}>

                    </View>
                    <View>
                        <Text style={{ color: '#FFF', fontSize: 16 }}>ou</Text>
                    </View>
                    <View style={{ height: 10, borderBottomColor: '#7400AE', borderBottomWidth: 1, width: 150, margin: 10 }}>
                        
                    </View>
                </View>

                <View style={{ flex: 3 }}>
                    <TouchableHighlight
                        onPress={this.handleFacebookLogin}
                        style={styles.fbButton}
                    >
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Icon name="facebook" style={{ marginLeft: -60 }} size={20} color="#FFF" />
                        <Text style={{ color: '#FFF', marginLeft: 50 }}> FACEBOOK</Text>
                        </View>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}
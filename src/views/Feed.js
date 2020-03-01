import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Picker, Alert } from 'react-native';

import styles from '../styles/PostsStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../img/drawable-ldpi/logo.png';
import CardPost from '../components/card-post';
import user from '../img/user.png';

export default class Home extends Component {

  handleProfile = (itemValue, itemIndex) => {
    if(itemValue == "logout"){
      this.props.navigation.navigate("Login");
    }
  }

  searchProjects = () => {
    Alert.alert("Atenção!", "Não implementado ainda.")
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Image source={logo} style={{ width: 60, height: 65 }} />
            </View>
            <View style={styles.search}>
              <TextInput style={styles.searchField}
                placeholder="Pesquisar Projetos"
                maxLength={100}
              />
              <TouchableOpacity style={styles.searchButton}
                onPress={() => this.searchProjects()}>
                <Icon name='search' size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.profile}>
              <Image source={user} style={{ width: 40, height: 40 }} />
              <Picker style={styles.pickerProfile}
                placeholder=""
                onValueChange={(itemValue, itemIndex) => this.handleProfile(itemValue)}>
                <Picker.Item label="Configurações" value="config" />
                <Picker.Item label="Sair" value="logout" />
              </Picker>
            </View>
          </View>
          <View style={styles.content}>
            <CardPost />
            <CardPost />
            <CardPost />
            <CardPost />
          </View>
        </ScrollView>
      </View>
    );
  }
}
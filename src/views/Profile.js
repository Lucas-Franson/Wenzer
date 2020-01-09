import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles/ProfileStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Gallery' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileData: ''
    }
  }

  chooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        Alert.alert('Atenção!', 'Ocorreu um erro ao adicionar a foto.');
      } else {
        this.setState({
          fileData: response.data
        });
      }
    });
  }

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.foto}
      />
    } else {
      return <Image source={require('../img/user.png')}
        style={styles.foto}
      />
    }
  }

  handlePressHelp = () => {
    
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.image}>
              <TouchableOpacity onPress={this.chooseImage}>
                {this.renderFileData()}
                <View style={styles.iconAdd}>
                  <Icon name="add-circle" size={50} color="#00aa00cc" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.lblDetails}>
              <Text style={{fontWeight: '700', fontSize: 18}}>0</Text>
              <Text>Projetos</Text>
            </View>
            <View style={styles.lblDetails}>
              <Text style={{fontWeight: '700', fontSize: 18}}>0</Text>
              <Text>Seguidores</Text>
            </View>
            <View style={styles.lblDetails}>
              <Text style={{fontWeight: '700', fontSize: 18}}>0</Text>
              <Text>Seguindo</Text>
            </View>
          </View>
          <View style={styles.botoes}>
            <TouchableHighlight 
              onPress={() => this.handlePressHelp()} 
              style={styles.btnActions}>
              <Text>Conquistas</Text>    
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => this.handlePressHelp()} 
              style={styles.btnActions}>
              <Text>Postagens</Text>    
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => this.handlePressHelp()} 
              style={styles.btnActions}>
              <Text>Configurações</Text>    
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => this.handlePressHelp()} 
              style={styles.btnActions}>
              <Text>Ajuda</Text>    
            </TouchableHighlight>
          </View>
          <View style={styles.credits}>
            <Text style={styles.lblCredits}>Desenvolvedor Lucas Franson</Text>
            <Text style={styles.lblCredits}>Designer Matheus</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
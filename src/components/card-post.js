import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import image from '../img/user.png';

export default class CardPost extends Component {

    navigate = () => {
        Alert.alert("Atenção!", "Não implementado ainda.");
    }

    like = () => {
        Alert.alert("Atenção!", "Não implementado ainda.");
    }

    comment = () => {
        Alert.alert("Atenção!", "Não implementado ainda.");
    }

    share = () => {
        Alert.alert("Atenção!", "Não implementado ainda.");
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={image} style={{width: 140, height: 140}} />
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.user}>
                        <Image source={image} style={{width: 40, height: 40, margin: 5}} />
                        <TouchableOpacity onPress={this.navigate}>
                            <Text>Matheus Ferreira</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.like} style={styles.linkButton}>
                            <View style={styles.iconConfig}>
                                <Icon name="heart-outline" size={30} color="#bbb" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.comment} style={styles.linkButton}>
                            <View style={styles.iconConfig}>
                                <Icon name="comment-outline" size={30} color="#bbb" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.share} style={styles.linkButton}>
                            <View style={styles.iconConfig}>
                                <Icon name="share-variant" size={30} color="#bbb" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.note}>
                    <Text>
                        Quero desenvolver um website com foco em jornalismo.
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        margin: 10,
        borderRadius: 15,
        padding: 10
    },
    image: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f00'
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    note: {
        flex: 1
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    linkButton: {
        marginRight: 10
    }
})
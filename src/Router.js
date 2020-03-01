import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/MaterialIcons';

import Login from './views/Login';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Projects from './views/Projects';
import HotProjects from './views/HotProjects';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {
        screen: Feed, navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color="#000" />
        )
      }
    },
    HotProjects: {
        screen: HotProjects, navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconTwo name="whatshot" size={30} color="#000" />
        )
      }
    },
    Projects: {
      screen: Projects, navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <IconTwo name="book" size={30} color="#000" />
        )
      }
    },
    Profile: {
        screen: Profile, navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={30} color="#000" />
        )
      }
    }
  },
  {
    initialRouteName: 'Feed',
    navigationOptions: {
      headerShown: false,
      tabBarButtonComponent: TouchableOpacity
    },
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#856BC6'
    }
  }
);

const StackNavigator = createStackNavigator(
  {
    Login: {screen: Login, navigationOptions: {
      headerShown: false
    }},
    Initial: BottomTabNavigator
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(StackNavigator);

// AppRegistry.registerComponent('AppContainer', () => AppContainer);

export default class Router extends Component {
  render() {
    return <AppContainer />;
  }
}
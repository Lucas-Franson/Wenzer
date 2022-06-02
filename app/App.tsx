import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants'

export default function App() {
  return (
    <View style={styles.container}>
      <WebView 
        style={styles.webview}
        source={{ uri: 'http://wenzer.com.br' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
});

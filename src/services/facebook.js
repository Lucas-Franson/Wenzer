import firebase from 'react-native-firebase';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

// Calling the following function will open the FB login dialogue:
export async function facebookLogin() {
  try {
    const result = await LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      // handle this however suites the flow of your app
      throw new Error('Usuário cancelou a requisição.');
    }

    // console.log(
    //   `Login success with permissions: ${result.grantedPermissions.toString()}`,
    // );

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Ocorreu um erro ao obter o token de acesso.');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.error(e);
  }
}

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAdf0kLvIA8Ell_7z98vJYSrmGpi3ZsXck",
    authDomain: "crwn-db-fd3ab.firebaseapp.com",
    projectId: "crwn-db-fd3ab",
    storageBucket: "crwn-db-fd3ab.appspot.com",
    messagingSenderId: "638874838051",
    appId: "1:638874838051:web:f26e94295fae53b38cbd96",
    measurementId: "G-MV1H4Z904P"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
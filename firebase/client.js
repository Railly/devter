import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDeq-ZusmpMCLIu8uSY3-ceEW3rCWRYkHo',
  authDomain: 'devter-2315d.firebaseapp.com',
  projectId: 'devter-2315d',
  storageBucket: 'devter-2315d.appspot.com',
  messagingSenderId: '739497283174',
  appId: '1:739497283174:web:dbbd77387be249947467a7',
  measurementId: 'G-WE9S7S625Z'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  if (!user) return null
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizeUser)
  })
}

export const loginWithGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

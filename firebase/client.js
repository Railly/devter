import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizeUser)
  })
}

export const loginWithGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizeCreatedAt = new Intl.DateTimeFormat('es-ES').format(
          date
        )

        return {
          ...data,
          id,
          createdAt: normalizeCreatedAt
        }
      })
    })
}

import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAHt5M5DWK5gJeVT_pZLOKFHE3tH1VWuc4",
  authDomain: "videochat-34f5d.firebaseapp.com",
  databaseURL: "https://videochat-34f5d.firebaseio.com",
  projectId: "videochat-34f5d",
  storageBucket: "",
  messagingSenderId: "1052435035942",
  appId: "1:1052435035942:web:3c5cda3c45d68862"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const signup = (email, password,name) => {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        console.log('Signup successfull');
        let obj = {
          email,
          name,
          uid: user.user.uid
        }
        firebase.database().ref('users').child(user.user.uid).set(obj)
        .then(()=>{
          console.log('user added to database')
          resolve(user);
        })
      })
      .catch((e) => {
        const mess = e.message;
        reject({ message: mess })
      })
  })
}

const login = (email, password, ev) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('logged in')
        resolve(user)
        console.log(user.user.uid)
        ev()
      })
      .catch((e) => {
        const mess = e.message
        reject({ message: mess })
      })
  })
}

const logout = () => {
  return new Promise((resolve, reject)=>{
    firebase.auth().signOut()
      .then((user) => {
        resolve(user)
      })
      .catch((e) => {
        console.log(e.message)
        reject({ message: mess })
      })
  })
 
}

const sendRequest = (uid, data, count, address) => {
  let obj = {
    data,
    uid,
    count,
    address
  }
  firebase.database().ref('requests').child(uid).push(obj)
}

const getRequests = (uid) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('requests')
      .on('value', (data) => {
        let userData = data.val()
        resolve(userData)
      })
  })
}

const getUsers = () => {
  return new Promise((resolve, reject)=>{
    firebase.database().ref('users')
    .once('value',data=>{
      let userData = data.val()
      resolve(userData)
    })
    .then(()=>{
      console.log('success')
    })
    .catch((e)=>{
      console.log(e.message)
      reject({ message: mess })
    })
  })
}

export {
  signup,
  login,
  // currentUser,
  getRequests,
  sendRequest,
  getUsers,
  logout
}
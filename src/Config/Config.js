import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyBEafasDMP2ST3wbT31C4aJmrpa9muwmQY",
    authDomain: "taxvisor-project-2.firebaseapp.com",
    databaseURL: "https://taxvisor-project-2.firebaseio.com",
    projectId: "taxvisor-project-2",
    storageBucket: "taxvisor-project-2.appspot.com",
    messagingSenderId: "397648408776",
    appId: "1:397648408776:web:1fdfbcc8420267a085f5fd",
    measurementId: "G-P0JLQBY14D"
};
const fire = firebase.initializeApp(config);
export default  fire

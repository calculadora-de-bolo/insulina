import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzYQvdqJOqwNYThOWG84yR7UKqe1CDvjM",
    authDomain: "calculador-de-insulina.firebaseapp.com",
    projectId: "calculador-de-insulina",
    storageBucket: "calculador-de-insulina.firebasestorage.app",
    messagingSenderId: "602448685358",
    appId: "1:602448685358:web:12e1f9e500b75fd34272bf",
    measurementId: "G-8TD9049S6K"
  };
  //firebase app
  initializeApp(firebaseConfig)

  //base datos
  const db = getFirestore()
  const auth = getAuth()

  /*collection ref
  constRef = collection(db, 'books')

  //queries
  const q=query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(q, (snapchot)=>{
    let books =[]
    snapshotEqual.docs.forEach((doc => {
        books.push({...doc.data(), id:doc.id})
    })
    console.log(books))
})*/

// Registro
const signupForms = document.querySelector('.signup');
signupForms.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const email = signupForms.email.value; 
    const password = signupForms.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('usuario creado', cred.user);
        signupForms.reset();
        
        
    })
    .catch((err) => {
        console.log(err.message);
    });
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWx4aLSJ5yNaBrHZXCvqooHaaAsWAOvvk",
  authDomain: "travel-destinations-auths.firebaseapp.com",
  projectId: "travel-destinations-auths",
  storageBucket: "travel-destinations-auths.firebasestorage.app",
  messagingSenderId: "84579118398",
  appId: "1:84579118398:web:9b80c827c9a9369701d06f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "user.html";
    })
    .catch(err => alert(err.message));
});

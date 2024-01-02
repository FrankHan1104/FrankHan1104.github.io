// Firebase 모듈 가져오기
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
       import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
         import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
   
    
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBCkAmK_Lm5GxaIPV9BYABGJe6oc9Rhtjg",
    authDomain: "idealworldcup-3b2ca.firebaseapp.com",
    projectId: "idealworldcup-3b2ca",
    storageBucket: "idealworldcup-3b2ca.appspot.com",
    messagingSenderId: "682226103350",
    appId: "1:682226103350:web:b76baa33b0c82780681497",
    measurementId: "G-GQ3M0QB222"
  };

     
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
      
  const analytics = getAnalytics(app);
    const db = getFirestore(app);  
    const auth = getAuth(app);
    const database = getDatabase(app);

export function updateWinner(winnerName) {
  const winnerRef = db.collection("hokees01").doc("p1");
     db.runTransaction(transaction => {
        return transaction.get(winnerRef).then(doc => {
            if (!doc.exists) {
		    document.getElementById('statusText').innerText = "에러났다!";
                throw "Document does not exist!";
            }
		 document.getElementById('statusText').innerText = "에러났다2";
            let newScore = doc.data()[winnerName] ? doc.data()[winnerName] + 1 : 1;
            transaction.update(winnerRef, { [winnerName]: newScore });
            return newScore;
        });
    }).then(newScore => {
        document.getElementById('statusText').innerText = "업데이트 완료. 새 점수: " + newScore;
    }).catch(error => {
        console.error("Transaction failed: ", error);
        document.getElementById('statusText').innerText = "오류 발생";
    });
}

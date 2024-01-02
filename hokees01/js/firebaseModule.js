// Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase 구성
const firebaseConfig = {
    apiKey: "AIzaSyBCkAmK_Lm5GxaIPV9BYABGJe6oc9Rhtjg",
    authDomain: "idealworldcup-3b2ca.firebaseapp.com",
    projectId: "idealworldcup-3b2ca",
    storageBucket: "idealworldcup-3b2ca.appspot.com",
    messagingSenderId: "682226103350",
    appId: "1:682226103350:web:b76baa33b0c82780681497",
    measurementId: "G-GQ3M0QB222"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 우승자 업데이트 함수
export function updateWinner(winnerName) {
    const winnerRef = doc(db, "hokees01", "p1");

    runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(winnerRef);
        if (!docSnap.exists()) {
            document.getElementById('statusText').innerText = "에러1!";
            throw new Error("Document does not exist!");
        }
        const currentData = docSnap.data();
        let newScore = currentData[winnerName] ? currentData[winnerName] + 1 : 1;
        transaction.update(winnerRef, { [winnerName]: newScore });
        return newScore;
    }).then(newScore => {
        document.getElementById('statusText').innerText = winnerName+"씨의 선택받은 점수 : " + newScore+"점 !";
    }).catch(error => {
        console.error("Transaction failed: ", error);
        document.getElementById('statusText').innerText = "에러2";
    });
}

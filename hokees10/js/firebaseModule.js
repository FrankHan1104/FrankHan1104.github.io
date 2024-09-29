// Firebase 모듈 가져오기

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, runTransaction, query, collection, getDocs, orderBy, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
    const winnerRef = doc(db, "hokees01", "p10");

    runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(winnerRef);
        if (!docSnap.exists()) {
            document.getElementById('statusText').style.color = "#E21C3D";
            document.getElementById('statusText').innerText = "에러1!";
            throw new Error("Document does not exist!");
        }
        const currentData = docSnap.data();
        let newData = currentData[winnerName] ? [...currentData[winnerName]] : [0, '']; // 배열 복사
        newData[0] += 1; // 점수 증가

        transaction.update(winnerRef, { [winnerName]: newData });
        return newData[0];
    }).then(newScore => {
        document.getElementById('statusText').style.color = "#E21C3D";
        document.getElementById('statusText').innerText = winnerName + "의 총 득표수 : " + newScore + "표!";
    }).catch(error => {
        console.error("Transaction failed: ", error);
        document.getElementById('statusText').style.color = "#E21C3D";
        document.getElementById('statusText').innerText = "에러2";
    });
}

async function showResults() {
    try {
        const docRef = doc(db, "hokees01", "p10");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let resultsArray = [];
            const data = docSnap.data();
            Object.entries(data).forEach(([name, value]) => {
                // value[0]는 점수, value[1]은 이미지 주소
                resultsArray.push({ name, score: value[0], imgSrc: value[1] });
            });

            // 점수에 따라 결과 배열 정렬
            resultsArray.sort((a, b) => b.score - a.score);
            displayResults(resultsArray);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
    }
}

function displayResults(resultsArray) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // 기존 내용 초기화
    resultsDiv.style.textAlign = 'center'; // 텍스트 중앙 정렬
    resultsDiv.style.color = '#E21C3D'; // 텍스트 색상 변경

    const table = document.createElement('table');
    table.style.width = '80%'; // 테이블 너비 설정
    table.style.margin = 'auto'; // 테이블을 중앙에 배치
    table.style.borderCollapse = 'collapse'; // 테두리 겹침 방지

    // 테이블 헤더 생성
    const header = table.insertRow();
    const nameHeader = header.insertCell();
    nameHeader.innerHTML = '이름';
    nameHeader.style.backgroundColor = '#E21C3D'; // 헤더 배경색 설정
    nameHeader.style.color = 'white'; // 헤더 텍스트 색상
    nameHeader.style.padding = '10px';
    nameHeader.style.fontWeight = 'bold';

    const imgHeader = header.insertCell();
    imgHeader.innerHTML = '사진';
    imgHeader.style.backgroundColor = '#E21C3D';
    imgHeader.style.color = 'white';
    imgHeader.style.padding = '10px';
    imgHeader.style.fontWeight = 'bold';

    const scoreHeader = header.insertCell();
    scoreHeader.innerHTML = '득표수';
    scoreHeader.style.backgroundColor = '#E21C3D';
    scoreHeader.style.color = 'white';
    scoreHeader.style.padding = '10px';
    scoreHeader.style.fontWeight = 'bold';

    // 각 결과에 대한 행 추가
    resultsArray.forEach(result => {
        const row = table.insertRow();
        row.style.borderBottom = '1px solid #E21C3D'; // 행 사이에 테두리 설정

        const nameCell = row.insertCell();
        nameCell.innerHTML = result.name;
        nameCell.style.padding = '8px';

        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = result.imgSrc;
        img.style.width = '50px'; // 이미지의 너비를 50px로 설정
        img.style.height = '50px'; // 이미지의 높이를 50px로 설정
        img.style.border = '1px solid #E21C3D';
        imgCell.style.padding = '8px';
        imgCell.appendChild(img);

        const scoreCell = row.insertCell();
        scoreCell.innerHTML = result.score + "표";
        scoreCell.style.padding = '8px';
    });

    resultsDiv.appendChild(table);
}

// 결과 확인 버튼 이벤트 리스너
document.getElementById('resultsButton').addEventListener('click', showResults);

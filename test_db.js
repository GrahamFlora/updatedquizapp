const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  projectId: "gen-lang-client-0323781914",
  appId: "1:1048882285839:web:f8c7c60c7dcd23cbf6027a",
  apiKey: "AIzaSyDuCiKqXsvFbMMTBDvxZpL61t-upp-OlKs",
  authDomain: "gen-lang-client-0323781914.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-updatedquizapp-14c8038c-302c-495b-9b7a-4dd9fd3340a1");

async function run() {
    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        console.log("Users:", usersSnap.docs.length);
        if (usersSnap.docs.length > 0) {
             const uid = usersSnap.docs[0].id;
             console.log("First user UID:", uid);
             const examsSnap = await getDocs(collection(db, \`users/\${uid}/exams\`));
             console.log("Exams for user:", examsSnap.docs.length);
             examsSnap.docs.forEach(d => {
                 console.log(" - Exam ID:", d.id, "Title:", d.data().title);
             });
        }
    } catch(e) {
        console.error(e);
    }
}
run();

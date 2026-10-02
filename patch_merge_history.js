const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const oldHistoryLoad = `                    const historySnapshot = await getDocs(collection(db, \`users/\${user.uid}/history\`));
                    const history = historySnapshot.docs.map(doc => doc.data()).sort((a,b) => b.timestamp - a.timestamp);
                    if (history.length > 0) {
                        setScoreHistory(history);
                    } else {
                        try {
                            const savedHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
                            setScoreHistory(savedHistory);
                            // we would ideally sync these to firebase too, but skipping for simplicity
                        } catch (e) {
                            setScoreHistory([]);
                        }
                    }`;

const newHistoryLoad = `                    const historySnapshot = await getDocs(collection(db, \`users/\${user.uid}/history\`));
                    let history = historySnapshot.docs.map(doc => doc.data());
                    
                    try {
                        const savedHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
                        if (savedHistory.length > 0) {
                            const firebaseTimestamps = new Set(history.map(h => h.timestamp));
                            const localUniqueHistory = savedHistory.filter(h => !firebaseTimestamps.has(h.timestamp));
                            if (localUniqueHistory.length > 0) {
                                history = [...history, ...localUniqueHistory];
                            }
                        }
                    } catch (e) {}
                    
                    history.sort((a,b) => b.timestamp - a.timestamp);
                    setScoreHistory(history);`;

code = code.replace(oldHistoryLoad, newHistoryLoad);
fs.writeFileSync('src/App.js', code);

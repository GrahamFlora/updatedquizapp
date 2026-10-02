const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const target1 = `                            await setDoc(doc(db, \`users/\${user.uid}/exams\`, String(exam.id)), exam);`;
const replace1 = `                            await setDoc(doc(db, \`users/\${user.uid}/exams\`, String(exam.id)), JSON.parse(JSON.stringify(exam)));`;
code = code.replace(target1, replace1);

const target2 = `                    setDoc(doc(db, \`users/\${user.uid}/history\`, String(scoreEntryForStorage.id)), {
                        ...scoreEntryForStorage,
                        timestamp: Date.now()
                    });`;
const replace2 = `                    setDoc(doc(db, \`users/\${user.uid}/history\`, String(scoreEntryForStorage.id)), JSON.parse(JSON.stringify({
                        ...scoreEntryForStorage,
                        timestamp: Date.now()
                    })));`;
code = code.replace(target2, replace2);

fs.writeFileSync('src/App.js', code);

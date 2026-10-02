const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const oldLoadLogic = `                    if (exams.length > 0) {
                        setAllExams(exams);
                    } else {
                        // If firebase is empty, check if we have custom local exams to merge/upload
                        try {
                            const savedExams = JSON.parse(localStorage.getItem('quizAppExams'));
                            if (savedExams && savedExams.length > 0) {
                                setAllExams(savedExams);
                                // This will trigger allExamsEffect to upload them to Firebase!
                            } else {
                                setAllExams(examLibrary);
                            }
                        } catch(e) {
                            setAllExams(examLibrary);
                        }
                    }`;

const newLoadLogic = `                    try {
                        const savedExams = JSON.parse(localStorage.getItem('quizAppExams')) || [];
                        if (exams.length > 0) {
                            // Merge firebase exams with local exams that aren't in firebase
                            const firebaseExamIds = new Set(exams.map(e => String(e.id)));
                            const localUniqueExams = savedExams.filter(e => e.id && !firebaseExamIds.has(String(e.id)) && !firebaseExamIds.has(e.id));
                            if (localUniqueExams.length > 0) {
                                const merged = [...exams, ...localUniqueExams];
                                setAllExams(merged);
                            } else {
                                setAllExams(exams);
                            }
                        } else {
                            if (savedExams && savedExams.length > 0) {
                                setAllExams(savedExams);
                            } else {
                                setAllExams(examLibrary);
                            }
                        }
                    } catch(e) {
                        setAllExams(exams.length > 0 ? exams : examLibrary);
                    }`;

code = code.replace(oldLoadLogic, newLoadLogic);

fs.writeFileSync('src/App.js', code);

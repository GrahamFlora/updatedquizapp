const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

// 1. Update imports
const importTarget = `import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';`;
const importReplace = `import { collection, doc, getDocs, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';`;
code = code.replace(importTarget, importReplace);

// 2. Add sanitizeExam helper before Header or examLibrary
const sanitizeHelper = `const sanitizeExam = (exam) => {
    if (!exam) return exam;
    const { icon, ...rest } = exam;
    return JSON.parse(JSON.stringify(rest));
};

`;

if (!code.includes('const sanitizeExam =')) {
    code = code.replace('const examLibrary = [', sanitizeHelper + 'const examLibrary = [');
}

// 3. Update Header component
const headerTarget = `const Header = ({ onShowHistory, onShowSettings, onGoToDashboard, onShowProfile, user, onSignIn, onSignOut }) => (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm h-[60px]">
        <div className="flex items-center gap-2">
             <button onClick={onGoToDashboard} className="flex items-center gap-2 hover:opacity-80 transition">
                <Logo />
                <h1 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hidden sm:block">Quiz Platform</h1>
            </button>
        </div>
        <UserProfileDropdown onShowHistory={onShowHistory} onShowSettings={onShowSettings} onShowProfile={onShowProfile} user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
    </header>
);`;

const headerReplace = `const Header = ({ onShowHistory, onShowSettings, onGoToDashboard, onShowProfile, user, onSignIn, onSignOut, isSyncing }) => (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm h-[60px]">
        <div className="flex items-center gap-3">
             <button onClick={onGoToDashboard} className="flex items-center gap-2 hover:opacity-80 transition">
                <Logo />
                <h1 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hidden sm:block">Quiz Platform</h1>
            </button>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">{isSyncing ? 'Connecting Cloud...' : 'Cloud Synced'}</span>
            </div>
        </div>
        <UserProfileDropdown onShowHistory={onShowHistory} onShowSettings={onShowSettings} onShowProfile={onShowProfile} user={user} onSignIn={onSignIn} onSignOut={onSignOut} />
    </header>
);`;

code = code.replace(headerTarget, headerReplace);

// 4. Update Header invocations to pass isSyncing
code = code.replaceAll(
    `user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />`,
    `user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} isSyncing={isSyncing} />`
);

// 5. Replace App component body from const App = () => down to before renderContent
const appTargetRegex = /const App = \(\) => \{[\s\S]*?\/\/ --- RENDER LOGIC ---/;

const appBodyReplace = `const App = () => {
    const [user, loading] = useAuthState(auth);
    const [appState, setAppState] = useState('loading');
    const [isSyncing, setIsSyncing] = useState(true);
    
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in", error);
        }
    };
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setAppState('dashboard');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };
    const [allExams, setAllExams] = useState([]);
    const [theme, setTheme] = useState('light');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeExam, setActiveExam] = useState(null);
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [showFinalReview, setShowFinalReview] = useState(false);
    const [completedQuizData, setCompletedQuizData] = useState(null);
    const [reviewingHistoryEntry, setReviewingHistoryEntry] = useState(null);
    const [scoreHistory, setScoreHistory] = useState([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isExitConfirmVisible, setIsExitConfirmVisible] = useState(false);
    
    // Config modal state
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [examToStart, setExamToStart] = useState(null);
    const [examBeingEdited, setExamBeingEdited] = useState(null);
    
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [examToDelete, setExamToDelete] = useState(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    // Real-time Firestore synchronization for Exams (PC, Android, Incognito, all devices)
    useEffect(() => {
        let isMounted = true;
        const examsCol = collection(db, 'exams');

        const unsubscribe = onSnapshot(examsCol, async (snapshot) => {
            if (!isMounted) return;
            setIsSyncing(false);

            if (snapshot.empty) {
                // If Firestore is completely empty on initial startup, seed the default library
                console.log("Seeding default exams to Firestore...");
                const serializableLibrary = examLibrary.map(sanitizeExam);
                for (const exam of serializableLibrary) {
                    try {
                        await setDoc(doc(db, 'exams', String(exam.id)), exam);
                    } catch(e) {
                        console.error("Error seeding exam to Firestore:", exam.id, e);
                    }
                }
                setAllExams(examLibrary);
                try {
                    localStorage.setItem('quizAppExams', JSON.stringify(serializableLibrary));
                } catch(e) {}
                setAppState(prev => prev === 'loading' ? 'dashboard' : prev);
            } else {
                const cloudExams = snapshot.docs.map(docSnap => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setAllExams(cloudExams);
                try {
                    localStorage.setItem('quizAppExams', JSON.stringify(cloudExams.map(sanitizeExam)));
                } catch(e) {}
                setAppState(prev => prev === 'loading' ? 'dashboard' : prev);
            }
        }, (error) => {
            console.error("Firestore onSnapshot error:", error);
            setIsSyncing(false);
            // Fallback to local cache
            try {
                const savedExams = JSON.parse(localStorage.getItem('quizAppExams'));
                if (savedExams && savedExams.length > 0) {
                    setAllExams(savedExams);
                } else {
                    setAllExams(examLibrary);
                }
            } catch(e) {
                setAllExams(examLibrary);
            }
            setAppState(prev => prev === 'loading' ? 'dashboard' : prev);
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    // Real-time User History synchronization
    useEffect(() => {
        if (loading) return;

        if (user) {
            const historyCol = collection(db, \`users/\${user.uid}/history\`);
            const unsubscribe = onSnapshot(historyCol, (snapshot) => {
                const history = snapshot.docs.map(docSnap => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                history.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                setScoreHistory(history);
                try {
                    localStorage.setItem('quizAppHistory', JSON.stringify(history));
                } catch(e) {}
            }, (error) => {
                console.error("Firestore history snapshot error:", error);
                try {
                    const saved = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
                    setScoreHistory(saved);
                } catch(e) { setScoreHistory([]); }
            });

            return () => unsubscribe();
        } else {
            // Guest / Incognito local history
            try {
                const saved = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
                setScoreHistory(saved);
            } catch(e) { setScoreHistory([]); }
        }
    }, [user, loading]);

    useEffect(() => {
        let newTitle = "Exam App";
        if (appState === 'dashboard') newTitle = "Dashboard - Exam App";
        else if (appState === 'quiz' && activeExam) newTitle = \`\${activeExam.title} - Quiz\`;
        else if (appState === 'review' && completedQuizData) newTitle = \`Results for \${completedQuizData.examTitle}\`;
        else if (appState === 'review' && reviewingHistoryEntry) newTitle = \`Reviewing \${reviewingHistoryEntry.examTitle}\`;
        document.title = newTitle;
    }, [appState, activeExam, completedQuizData, reviewingHistoryEntry]);

    // --- HANDLERS ---
    const handleEditExamClick = (exam) => {
        setExamBeingEdited(exam);
        setAppState('edit');
    };

    const handleSaveEditedExam = async (updatedExam) => {
        const sanitized = sanitizeExam(updatedExam);
        // Instant optimistic update
        setAllExams(prev => prev.map(ex => ex.id === updatedExam.id ? updatedExam : ex));
        setExamBeingEdited(null);
        setAppState('dashboard');

        try {
            await setDoc(doc(db, 'exams', String(updatedExam.id)), sanitized);
        } catch(e) {
            console.error("Error saving updated exam to Firestore:", e);
        }
    };

    const handleCancelEdit = () => {
        setExamBeingEdited(null);
        setAppState('dashboard');
    };

    const handleExamsUploaded = async (newExams) => {
        const preparedExams = newExams.map(ex => {
            const sanitized = sanitizeExam(ex);
            return {
                ...sanitized,
                id: sanitized.id || \`uploaded-\${Date.now()}-\${Math.random().toString(36).substr(2, 6)}\`,
                category: sanitized.category || 'Custom'
            };
        });

        // Optimistic UI update
        setAllExams(prev => [...prev, ...preparedExams]);
        alert(\`Successfully loaded \${preparedExams.length} exam(s)! Syncing to cloud...\`);

        // Save each to cloud Firestore
        for (const exam of preparedExams) {
            try {
                await setDoc(doc(db, 'exams', String(exam.id)), exam);
            } catch(e) {
                console.error("Error saving exam to Firestore:", exam.id, e);
            }
        }
    };

    const handlePromptStartExam = (exam) => {
        setExamToStart(exam);
        setIsConfigModalOpen(true);
    };

    const handleStartConfiguredExam = (numQuestionsToTake, orderSelection, rangeStart = 1, rangeEnd = 10) => {
        if (!examToStart) return;

        let selectedQuestions = [...examToStart.questions];
        let finalNumQuestionsToTake = numQuestionsToTake;
        
        if (orderSelection === 'random') {
            selectedQuestions = shuffleArray(selectedQuestions);
            selectedQuestions = selectedQuestions.slice(0, finalNumQuestionsToTake);
        } else {
            const startIdx = Math.max(0, rangeStart - 1);
            const endIdx = Math.min(examToStart.questions.length, rangeEnd);
            selectedQuestions = selectedQuestions.slice(startIdx, endIdx);
            finalNumQuestionsToTake = selectedQuestions.length;
        }
        
        // Calculate proportional time based on number of questions selected vs default questions
        const defaultQs = examToStart.questions.length;
        const totalDurationForMaxQs = examToStart.durationSeconds || (defaultQs * 60); 
        const calculatedTime = Math.ceil((totalDurationForMaxQs / defaultQs) * finalNumQuestionsToTake);

        setActiveExam(examToStart);
        setCurrentQuizQuestions(selectedQuestions);
        setUserAnswers(Array(finalNumQuestionsToTake).fill(null).map(() => []));
        setFlaggedQuestions(Array(finalNumQuestionsToTake).fill(false));
        setCurrentQuestionIndex(0);
        setTimeLeft(calculatedTime);
        setIsQuizActive(true);
        setShowFinalReview(false);
        setCompletedQuizData(null);
        setReviewingHistoryEntry(null);
        setAppState('quiz');
        setIsConfigModalOpen(false);
    };
    
    const handleSubmitQuiz = useCallback(() => {
        try {
            if (!activeExam) return;
            setIsQuizActive(false);

            let totalPoints = 0;
            userAnswers.forEach((selectedIndices, questionIndex) => {
                const question = currentQuizQuestions[questionIndex];
                if (!question) return;
                
                const correctOptionIndices = new Set(question.answerOptions.map((option, index) => (option.isCorrect ? index : -1)).filter(index => index !== -1));
                const userSelectedIndices = new Set(selectedIndices || []);
                if (correctOptionIndices.size > 0) {
                     const isCorrect = correctOptionIndices.size === userSelectedIndices.size && [...userSelectedIndices].every(i => correctOptionIndices.has(i));
                     if (isCorrect) totalPoints += 1;
                }
            });

            const totalQuestions = currentQuizQuestions.length;
            const finalScaledScore = totalQuestions > 0 ? Math.round(((totalPoints / totalQuestions) * 800) + 100) : 100;

            const scoreEntryForStorage = {
                id: new Date().toISOString(),
                examId: activeExam.id,
                examTitle: activeExam.title,
                score: finalScaledScore,
                date: new Date().toISOString(),
                questions: currentQuizQuestions, // We only save the questions you actually answered
                userAnswers: userAnswers,
                rawScore: totalPoints,
                totalQuestions: totalQuestions,
                passingScore: activeExam.passingScore || 700
            };
            
            // The memory state gets the full exam so you can use the "Retake" button smoothly
            setCompletedQuizData({ ...scoreEntryForStorage, exam: activeExam });
            
            // Local history update
            let currentHistory = [];
            try {
                currentHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
            } catch (e) {
                currentHistory = [];
            }
            
            let newHistory = [scoreEntryForStorage, ...currentHistory].slice(0, 20); 
            try {
                localStorage.setItem('quizAppHistory', JSON.stringify(newHistory));
                setScoreHistory(newHistory);
            } catch (storageError) {
                try {
                    newHistory = [scoreEntryForStorage, ...currentHistory].slice(0, 5);
                    localStorage.setItem('quizAppHistory', JSON.stringify(newHistory));
                    setScoreHistory(newHistory);
                } catch (fallbackError) {
                    setScoreHistory([scoreEntryForStorage, ...currentHistory].slice(0, 20)); 
                }
            }

            // Firebase sync
            if (user) {
                try {
                    setDoc(doc(db, \`users/\${user.uid}/history\`, String(scoreEntryForStorage.id)), JSON.parse(JSON.stringify({
                        ...scoreEntryForStorage,
                        timestamp: Date.now()
                    })));
                } catch(e) { console.error("Firebase history sync error", e); }
            }

            setAppState('review');
            setShowFinalReview(false);
            
        } catch (error) {
            console.error("Critical error calculating quiz:", error);
            alert("There was a critical error calculating your score. Please try again.");
        }
    }, [activeExam, userAnswers, currentQuizQuestions, user]);

    const handleAnswerOptionClick = (answerIndex) => {
        const question = currentQuizQuestions[currentQuestionIndex];
        const correctAnswersCount = question.answerOptions.filter(opt => opt.isCorrect).length;
        const nextUserAnswers = [...userAnswers];
        let currentAnswers = [...(nextUserAnswers[currentQuestionIndex] || [])];

        if (correctAnswersCount > 1) {
            const answerPosition = currentAnswers.indexOf(answerIndex);
            if (answerPosition > -1) currentAnswers.splice(answerPosition, 1);
            else currentAnswers.push(answerIndex);
            nextUserAnswers[currentQuestionIndex] = currentAnswers;
        } else {
            nextUserAnswers[currentQuestionIndex] = [answerIndex];
        }
        setUserAnswers(nextUserAnswers);
    };

    const handleToggleFlag = () => {
        const newFlags = [...flaggedQuestions];
        newFlags[currentQuestionIndex] = !newFlags[currentQuestionIndex];
        setFlaggedQuestions(newFlags);
    };

    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < currentQuizQuestions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
        } else {
            setShowFinalReview(true);
        }
    };

    const handleReviewHistory = (entry) => {
        const examForHistory = allExams.find(e => e.id === entry.examId);
        setReviewingHistoryEntry({ ...entry, exam: examForHistory });
        setAppState('review');
        setIsHistoryVisible(false);
    };

    const clearHistory = () => {
        localStorage.removeItem('quizAppHistory');
        setScoreHistory([]);
    };

    const handlePromptDelete = (entryId) => setEntryToDelete(entryId);

    const handleConfirmDelete = async () => {
        if (!entryToDelete) return;
        const entryId = entryToDelete;
        setEntryToDelete(null);

        const currentHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
        const newHistory = currentHistory.filter(entry => entry.id !== entryId);
        try {
            localStorage.setItem('quizAppHistory', JSON.stringify(newHistory));
        } catch(e) {}
        setScoreHistory(newHistory);

        if (user) {
            try {
                await deleteDoc(doc(db, \`users/\${user.uid}/history\`, String(entryId)));
            } catch(e) {
                console.error("Error deleting history entry from Firestore:", e);
            }
        }
    };
    
    const handleDeleteExam = (examId) => {
        setExamToDelete(examId);
    };

    const handleConfirmDeleteExam = async () => {
        if (!examToDelete) return;
        const examId = examToDelete;
        setExamToDelete(null);

        // Optimistic UI update
        const newExams = allExams.filter(e => e.id !== examId);
        setAllExams(newExams);
        try {
            localStorage.setItem('quizAppExams', JSON.stringify(newExams.map(sanitizeExam)));
        } catch(e) {}

        // Delete from cloud Firestore
        try {
            await deleteDoc(doc(db, 'exams', String(examId)));
        } catch(e) {
            console.error("Error deleting exam from Firestore:", e);
        }
        
        if (user) {
            try {
                await deleteDoc(doc(db, \`users/\${user.uid}/exams\`, String(examId)));
            } catch(e) {}
        }
    };

    const handleGoToDashboard = () => {
        if (appState === 'quiz') setIsExitConfirmVisible(true);
        else {
            setAppState('dashboard');
            setActiveExam(null);
            setCompletedQuizData(null);
            setReviewingHistoryEntry(null);
        }
    };

    const confirmExitQuiz = () => {
        setAppState('dashboard');
        setIsExitConfirmVisible(false);
    };

    // --- HOOKS ---
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
        ]).then(() => setScriptsLoaded(true)).catch(e => console.error("PDF scripts failed to load", e));
        
    }, []);

    useEffect(() => {
        if (!isQuizActive) return;
        if (timeLeft <= 0) {
            handleSubmitQuiz();
            return;
        }
        const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, isQuizActive, handleSubmitQuiz]);
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('quiz-app-theme') || 'light';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('quiz-app-theme', theme);
    }, [theme]);

    // --- RENDER LOGIC ---`;

code = code.replace(appTargetRegex, appBodyReplace);

fs.writeFileSync('src/App.js', code);
console.log("Patch applied successfully!");

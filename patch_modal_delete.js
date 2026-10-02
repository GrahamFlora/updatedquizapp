const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const stateTarget = `    const [entryToDelete, setEntryToDelete] = useState(null);`;
const stateReplace = `    const [entryToDelete, setEntryToDelete] = useState(null);
    const [examToDelete, setExamToDelete] = useState(null);`;
code = code.replace(stateTarget, stateReplace);

const fnTarget = `    const handleDeleteExam = async (examId) => {
        if (!window.confirm("Are you sure you want to delete this exam?")) return;
        
        const newExams = allExams.filter(e => e.id !== examId);
        setAllExams(newExams);
        
        try {
            const serializableExams = newExams.map(exam => {
                const { icon, ...rest } = exam;
                return rest;
            });
            localStorage.setItem('quizAppExams', JSON.stringify(serializableExams));
        } catch(e) {}
        
        if (user) {
            try {
                await deleteDoc(doc(db, \`users/\${user.uid}/exams\`, String(examId)));
            } catch(e) { console.error("Error deleting exam from Firebase", e); }
        }
    };`;
const fnReplace = `    const handleDeleteExam = (examId) => {
        setExamToDelete(examId);
    };

    const handleConfirmDeleteExam = async () => {
        if (!examToDelete) return;
        const examId = examToDelete;
        const newExams = allExams.filter(e => e.id !== examId);
        setAllExams(newExams);
        
        try {
            const serializableExams = newExams.map(exam => {
                const { icon, ...rest } = exam;
                return rest;
            });
            localStorage.setItem('quizAppExams', JSON.stringify(serializableExams));
        } catch(e) {}
        
        if (user) {
            try {
                await deleteDoc(doc(db, \`users/\${user.uid}/exams\`, String(examId)));
            } catch(e) { console.error("Error deleting exam from Firebase", e); }
        }
        setExamToDelete(null);
    };`;
code = code.replace(fnTarget, fnReplace);

const modalTarget = `            <Modal
                isOpen={!!entryToDelete}
                onClose={() => setEntryToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Score?"
            >
                Are you sure you want to delete this score entry? This action cannot be undone.
            </Modal>
        </div>`;
const modalReplace = `            <Modal
                isOpen={!!entryToDelete}
                onClose={() => setEntryToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Score?"
            >
                Are you sure you want to delete this score entry? This action cannot be undone.
            </Modal>
            
            <Modal
                isOpen={!!examToDelete}
                onClose={() => setExamToDelete(null)}
                onConfirm={handleConfirmDeleteExam}
                title="Delete Exam?"
            >
                Are you sure you want to delete this exam? This action cannot be undone.
            </Modal>
        </div>`;
code = code.replace(modalTarget, modalReplace);

fs.writeFileSync('src/App.js', code);

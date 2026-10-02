const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const targetApp = `    const handleGoToDashboard = () => {`;
const replaceApp = `    const handleDeleteExam = async (examId) => {
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
    };

    const handleGoToDashboard = () => {`;
code = code.replace(targetApp, replaceApp);

const targetDashProps = `const DashboardPage = ({ allExams, filteredExams, onSelectExam, selectedCategory, onSelectCategory, searchTerm, onSearchChange, scoreHistory, onClearFilters, onExamsUploaded, onEditExam }) => {`;
const replaceDashProps = `const DashboardPage = ({ allExams, filteredExams, onSelectExam, selectedCategory, onSelectCategory, searchTerm, onSearchChange, scoreHistory, onClearFilters, onExamsUploaded, onEditExam, onDeleteExam }) => {`;
code = code.replace(targetDashProps, replaceDashProps);

const targetDashCall = `                            onEditExam={handleEditExamClick}
                        />`;
const replaceDashCall = `                            onEditExam={handleEditExamClick}
                            onDeleteExam={handleDeleteExam}
                        />`;
code = code.replace(targetDashCall, replaceDashCall);

const targetButtons = `                            <div className="p-4 pt-0 mt-auto flex gap-2">
                                <button onClick={() => onEditExam(exam)} className="flex-none bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center group/editbtn" title="Edit Exam">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover/editbtn:text-gray-700 dark:group-hover/editbtn:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => onSelectExam(exam)} className="flex-1 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-gray-700 dark:text-gray-200 hover:text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn">
                                    Configure & Start
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>`;

const replaceButtons = `                            <div className="p-4 pt-0 mt-auto flex gap-2">
                                <button onClick={() => onDeleteExam(exam.id)} className="flex-none bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center group/delbtn" title="Delete Exam">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 group-hover/delbtn:text-red-700 dark:group-hover/delbtn:text-red-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                                <button onClick={() => onEditExam(exam)} className="flex-none bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center group/editbtn" title="Edit Exam">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover/editbtn:text-gray-700 dark:group-hover/editbtn:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => onSelectExam(exam)} className="flex-1 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-gray-700 dark:text-gray-200 hover:text-white font-bold py-3.5 px-3 sm:px-4 rounded-xl transition-colors flex items-center justify-center gap-1 sm:gap-2 group/btn whitespace-nowrap">
                                    <span className="truncate">Configure & Start</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>`;
code = code.replace(targetButtons, replaceButtons);

fs.writeFileSync('src/App.js', code);

const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

// Patch Dashboard search
const oldDashboardSearch = `<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                    <input type="file" ref={fileInputRef} accept=".json,.txt,.csv" className="hidden" onChange={onFileChange} />
                    <button 
                        onClick={handleFileUploadClick} 
                        className="px-4 py-2.5 md:py-3 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-bold hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors shrink-0 flex items-center justify-center gap-2 border border-indigo-100 dark:border-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className={\`\${(isSearchExpanded || searchTerm) ? 'hidden md:inline' : 'inline'}\`}>Upload</span>
                    </button>
                    <div className={\`relative transition-all duration-300 ease-in-out flex justify-end shrink-0 \${isSearchExpanded || searchTerm ? 'w-full sm:w-64 lg:w-80' : 'w-[42px] sm:w-[48px]'}\`}>`;

const newDashboardSearch = `<div className="flex flex-row items-center justify-end gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                    <input type="file" ref={fileInputRef} accept=".json,.txt,.csv" className="hidden" onChange={onFileChange} />
                    
                    <div className={\`relative transition-all duration-300 ease-in-out flex justify-end shrink-0 \${isSearchExpanded || searchTerm ? 'flex-1 sm:w-64 lg:w-80' : 'w-[42px] sm:w-[48px]'}\`}>`;

const dashUploadBtnAdd = `                                </div>
                            )}
                        </div>`;
const dashUploadBtnNew = `                                </div>
                            )}
                        </div>
                        <button 
                            onClick={handleFileUploadClick} 
                            className="px-3 py-2.5 md:px-4 md:py-3 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-bold hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors shrink-0 flex items-center justify-center gap-2 border border-indigo-100 dark:border-gray-600 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className={\`\${(isSearchExpanded || searchTerm) ? 'hidden sm:inline' : 'hidden sm:inline md:inline'}\`}>Upload</span>
                        </button>`;
                        
// Exam Editor Search
const oldEditorSearch = `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Questions ({questions.length})</h3>
                    <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
                        <div className={\`relative transition-all duration-300 ease-in-out flex justify-end shrink-0 \${isSearchExpanded || searchTerm ? 'w-full sm:w-64' : 'w-[36px]'}\`}>`;

const newEditorSearch = `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Questions ({questions.length})</h3>
                    <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
                        <div className={\`relative transition-all duration-300 ease-in-out flex justify-end shrink-0 \${isSearchExpanded || searchTerm ? 'flex-1 sm:w-64' : 'w-[36px]'}\`}>`;

const oldEditorAddBtn = `                        <button onClick={addQuestion} className="px-3 py-1.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm font-bold hover:bg-green-100 dark:hover:bg-green-800 transition-colors flex items-center gap-1 border border-green-200 dark:border-green-800 whitespace-nowrap shadow-sm">
                            + Add Question
                        </button>`;
const newEditorAddBtn = `                        <button onClick={addQuestion} className="px-3 py-1.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm font-bold hover:bg-green-100 dark:hover:bg-green-800 transition-colors flex items-center gap-1 border border-green-200 dark:border-green-800 whitespace-nowrap shadow-sm">
                            <span className="hidden sm:inline">+ Add Question</span>
                            <span className="sm:hidden">+ Add</span>
                        </button>`;


code = code.replace(oldDashboardSearch, newDashboardSearch);
code = code.replace(dashUploadBtnAdd, dashUploadBtnNew);
code = code.replace(oldEditorSearch, newEditorSearch);
code = code.replace(oldEditorAddBtn, newEditorAddBtn);

fs.writeFileSync('src/App.js', code);

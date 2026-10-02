const fs = require('fs');
let code = fs.readFileSync('src/App.js', 'utf8');

const badUploadButton = `                        <button 
                            onClick={handleFileUploadClick} 
                            className="px-3 py-2.5 md:px-4 md:py-3 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-bold hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors shrink-0 flex items-center justify-center gap-2 border border-indigo-100 dark:border-gray-600 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className={\`\${(isSearchExpanded || searchTerm) ? 'hidden sm:inline' : 'hidden sm:inline md:inline'}\`}>Upload</span>
                        </button>
                        <button onClick={addQuestion}`;

code = code.replace(badUploadButton, '                        <button onClick={addQuestion}');

fs.writeFileSync('src/App.js', code);

import React, { useState, useEffect, useCallback, useRef } from 'react';
// FIXED: Removed imports. Scripts will be loaded dynamically in the App component.


// =================================================================================
// === DATA & CONFIGURATION ========================================================
// =================================================================================

// SVG Icons for different exam categories are defined before being used.
const CompTiaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const GoogleCloudIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 dark:text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" />
    </svg>
);

const examLibrary = [
    {
        id: 'comptia-sy0-701',
        category: 'CompTIA',
        title: 'Security+ SY0-701',
        description: 'Test your knowledge for the CompTIA Security+ certification exam.',
        questionsPerQuiz: 90,
        durationSeconds: 90 * 60,
        passingScore: 750,
        icon: <CompTiaIcon />,
        questions: [
            { id: 'q1', questionText: 'Which of the following threat actors is most likely to be hired by a foreign government?', answerOptions: [{ answerText: 'Hacktivist', isCorrect: false }, { answerText: 'Organized crime', isCorrect: true }], explanation: 'Organized crime groups have the resources and sophistication for state-level attacks.' },
            { id: 'q2', questionText: 'What is used to add complexity before a one-way data transformation?', answerOptions: [{ answerText: 'Key stretching', isCorrect: false }, { answerText: 'Salting', isCorrect: true }], explanation: 'Salting adds random data to prevent rainbow table attacks.' },
            { id: 'q3', questionText: 'Which incident response phase aims to minimize disruption?', answerOptions: [{ answerText: 'Recovery', isCorrect: false }, { answerText: 'Containment', isCorrect: true }], explanation: 'Containment is focused on stopping the spread of an incident.' },
            { id: 'sec-q4', questionText: 'What is the primary purpose of a TPM (Trusted Platform Module)?', answerOptions: [{ answerText: 'To filter network traffic', isCorrect: false }, { answerText: 'To store cryptographic keys securely at a hardware level', isCorrect: true }, { answerText: 'To increase computer processing speed', isCorrect: false }, { answerText: 'To manage user permissions', isCorrect: false }], explanation: 'A TPM is a dedicated microchip designed to secure hardware by integrating cryptographic keys into devices.' },
            { id: 'sec-q5', questionText: 'During a penetration test, a tester uses a tool to send a flood of SYN packets to a server without responding to the SYN-ACK replies. What type of attack is this?', answerOptions: [{ answerText: 'Phishing attack', isCorrect: false }, { answerText: 'Man-in-the-middle attack', isCorrect: false }, { answerText: 'SYN flood attack', isCorrect: true }, { answerText: 'Brute-force attack', isCorrect: false }], explanation: 'A SYN flood is a type of Denial-of-Service (DoS) attack that exploits the TCP three-way handshake.' },
            { id: 'sec-q6', questionText: 'Which of the following is a primary benefit of implementing multifactor authentication (MFA)?', answerOptions: [{ answerText: 'It guarantees protection against all types of cyberattacks.', isCorrect: false }, { answerText: 'It adds a significant layer of security beyond just a password.', isCorrect: true }, { answerText: 'It reduces the need for complex passwords.', isCorrect: false }, { answerText: 'It improves network performance.', isCorrect: false }], explanation: 'MFA requires more than one method of authentication from independent categories of credentials to verify the user\'s identity for a login or other transaction.' },
            { id: 'sec-q7', questionText: 'A security analyst discovers that an employee\'s credentials were stolen and used to access the network from an unrecognized country. This is an example of what type of attack?', answerOptions: [{ answerText: 'Denial-of-Service', isCorrect: false }, { answerText: 'Insider Threat', isCorrect: false }, { answerText: 'Credential Theft / Account Takeover', isCorrect: true }, { answerText: 'Watering Hole Attack', isCorrect: false }], explanation: 'Account takeover occurs when a malicious third party gains unauthorized access to and control over a user\'s account.' },
            { id: 'sec-q8', questionText: 'A company wants to improve its email security to prevent email spoofing and phishing. Which of the following protocols should they implement? (Choose TWO).', answerOptions: [{ answerText: 'SPF', isCorrect: true }, { answerText: 'SMTP', isCorrect: false }, { answerText: 'DKIM', isCorrect: true }, { answerText: 'IMAP', isCorrect: false }, { answerText: 'POP3', isCorrect: false }], explanation: 'SPF (Sender Policy Framework) and DKIM (DomainKeys Identified Mail) are email authentication methods designed to detect forged sender addresses in emails, a technique often used in phishing and spam.' },
        ]
    },
    {
        id: 'comptia-n10-008',
        category: 'CompTIA',
        title: 'Network+ N10-008',
        description: 'Validate your skills in networking fundamentals for the Network+ exam.',
        questionsPerQuiz: 75,
        durationSeconds: 90 * 60,
        passingScore: 720,
        icon: <CompTiaIcon />,
        questions: [
             { id: 'net-q1', questionText: 'A corporate wireless network uses 802.1X. What is required to connect?', answerOptions: [{ answerText: 'MAC filtering', isCorrect: false }, { answerText: 'Username and password', isCorrect: true }], explanation: '802.1X is a standard for Port-Based Network Access Control and uses credentials for authentication.' },
             { id: 'net-q2', questionText: 'Which of the following IP addresses is a private, non-routable address according to RFC 1918?', answerOptions: [{ answerText: '172.32.10.5', isCorrect: false }, { answerText: '10.1.1.5', isCorrect: true }, { answerText: '192.169.1.10', isCorrect: false }, { answerText: '8.8.8.8', isCorrect: false }], explanation: 'The RFC 1918 private address ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.' },
             { id: 'net-q3', questionText: 'A network technician needs to connect two switches together. Which type of cable should be used to directly connect the two switches?', answerOptions: [{ answerText: 'Rollover', isCorrect: false }, { answerText: 'Straight-through', isCorrect: false }, { answerText: 'Crossover', isCorrect: true }, { answerText: 'Coaxial', isCorrect: false }], explanation: 'A crossover cable is used to connect two like devices, such as two switches or two PCs, directly.' },
             { id: 'net-q4', questionText: 'What is the default subnet mask for a Class C IP address?', answerOptions: [{ answerText: '255.0.0.0', isCorrect: false }, { answerText: '255.255.0.0', isCorrect: false }, { answerText: '255.255.255.0', isCorrect: true }, { answerText: '255.255.255.255', isCorrect: false }], explanation: 'Class C addresses use the first three octets for the network portion, leaving the last octet for hosts, which corresponds to a 255.255.255.0 subnet mask.' },
             { id: 'net-q5', questionText: 'A technician is looking at the following network diagram. A user at PC1 cannot access the Web Server. The technician has verified that PC1 has a valid IP address and can ping its default gateway (R1). What is the most likely cause of the issue?', imageUrl: 'https://placehold.co/600x200/e2e8f0/4a5568?text=PC1----[Router+R1]----[Router+R2]----WebServer', answerOptions: [{ answerText: 'The cable between PC1 and R1 is faulty.', isCorrect: false }, { answerText: 'Router R1 has a missing or incorrect route to the Web Server\'s network.', isCorrect: true }, { answerText: 'PC1 is on the wrong VLAN.', isCorrect: false }, { answerText: 'The Web Server is powered off.', isCorrect: false }], explanation: 'Since PC1 can reach its gateway (R1), the local connection is fine. The inability to reach a remote server points to a routing issue, where R1 does not know how to forward the traffic to the destination network.' },
             { id: 'net-q6', questionText: 'Which wireless standard operates exclusively in the 5 GHz frequency band and offers high throughput?', answerOptions: [{ answerText: '802.11b', isCorrect: false }, { answerText: '802.11g', isCorrect: false }, { answerText: '802.11n', isCorrect: false }, { answerText: '802.11ac', isCorrect: true }], explanation: '802.11ac (Wi-Fi 5) operates only in the 5 GHz band and provides significantly higher speeds than its predecessors.' },
        ]
    },
    {
        id: 'google-pca',
        category: 'Google Cloud',
        title: 'Professional Cloud Architect',
        description: 'Prepare for the Google Cloud Professional Cloud Architect certification.',
        questionsPerQuiz: 50,
        durationSeconds: 120 * 60, // 2 hours
        passingScore: 700, // Adjusted to reflect 70-80% range
        icon: <GoogleCloudIcon />,
        questions: [
             { id: 'gcp-q1', questionText: 'Which Google Cloud service is best for running a managed relational database?', answerOptions: [{ answerText: 'Cloud Spanner', isCorrect: false }, { answerText: 'Cloud SQL', isCorrect: true }], explanation: 'Cloud SQL is Google Cloud\'s fully managed relational database service for MySQL, PostgreSQL, and SQL Server.' },
             { id: 'gcp-q2', questionText: 'A company needs to store petabytes of unstructured data for long-term archival with the lowest possible cost. Which Google Cloud storage solution is the most appropriate?', answerOptions: [{ answerText: 'Cloud Storage Standard', isCorrect: false }, { answerText: 'Cloud Storage Nearline', isCorrect: false }, { answerText: 'Cloud Storage Archive', isCorrect: true }, { answerText: 'Persistent Disk', isCorrect: false }], explanation: 'Archive storage is the lowest-cost, highly-durable storage service for data archiving, online backup, and disaster recovery.' },
             { id: 'gcp-q3', questionText: 'Which Google Cloud service provides a fully managed, serverless platform for running containerized applications?', answerOptions: [{ answerText: 'Google Kubernetes Engine (GKE)', isCorrect: false }, { answerText: 'Cloud Run', isCorrect: true }, { answerText: 'Compute Engine', isCorrect: false }, { answerText: 'App Engine', isCorrect: false }], explanation: 'Cloud Run is a managed compute platform that enables you to run stateless containers that are invocable via web requests or Pub/Sub events.' },
             { id: 'gcp-q4', questionText: 'What is the primary purpose of a VPC (Virtual Private Cloud) in Google Cloud?', answerOptions: [{ answerText: 'To provide a physical connection to Google\'s network.', isCorrect: false }, { answerText: 'To provide a logically isolated section of the Google Cloud network for your resources.', isCorrect: true }, { answerText: 'To manage billing for all Google Cloud services.', isCorrect: false }, { answerText: 'To store and manage container images.', isCorrect: false }], explanation: 'A VPC provides networking functionality to your Compute Engine virtual machine (VM) instances, Google Kubernetes Engine (GKE) clusters, and App Engine flexible environment instances.' },
             { id: 'gcp-q5', questionText: 'A developer needs to run a batch processing job that can be interrupted and is not time-sensitive. To minimize costs, what type of Compute Engine VM should be used?', answerOptions: [{ answerText: 'Standard VM', isCorrect: false }, { answerText: 'Preemptible VM', isCorrect: true }, { answerText: 'High-Memory VM', isCorrect: false }, { answerText: 'N2 VM', isCorrect: false }], explanation: 'Preemptible VMs are short-lived, affordable compute instances suitable for batch jobs and fault-tolerant workloads. They offer the same machine types and options as regular compute instances and last for up to 24 hours.' },
             { id: 'gcp-q6', questionText: 'A global application requires a database solution that can handle high-throughput transactional workloads with strong consistency. Which services are key components of such a solution? (Choose TWO).', answerOptions: [{ answerText: 'BigQuery', isCorrect: false }, { answerText: 'Cloud Spanner', isCorrect: true }, { answerText: 'Cloud Storage', isCorrect: false }, { answerText: 'Cloud Load Balancing', isCorrect: true }], explanation: 'Cloud Spanner provides a globally distributed, strongly consistent database service. Cloud Load Balancing is essential to distribute user traffic across multiple regions to the Spanner backends.' },
        ]
    }
];


// =================================================================================
// === HELPER FUNCTIONS ============================================================
// =================================================================================
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getScoreMessage = (score, passingScore) => {
    if (score >= passingScore) {
        return { message: "Congratulations, you passed!", color: "text-green-500" };
    } else if (score >= passingScore - 150) {
        return { message: "You're so close!", color: "text-orange-500" };
    } else {
        return { message: "Keep reviewing the key concepts.", color: "text-blue-500" };
    }
};

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// =================================================================================
// === UI & VIEW COMPONENTS ========================================================
// =================================================================================

const Logo = () => (
    <svg className="h-10 w-10 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

const UserProfileDropdown = ({ onShowHistory, onShowSettings }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            <p className="truncate"><span className="font-semibold">Welcome,</span> User</p>
                        </div>
                        <button onClick={() => { onShowSettings(); setIsOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</button>
                        <button onClick={() => { onShowHistory(); setIsOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">View History</button>
                    </div>
                </div>
            )}
        </div>
    );
};


const Header = ({ onShowHistory, onShowSettings, onGoToDashboard }) => (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
             <button onClick={onGoToDashboard} className="flex items-center gap-3">
                <Logo />
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Quiz Platform</h1>
            </button>
        </div>
        <UserProfileDropdown onShowHistory={onShowHistory} onShowSettings={onShowSettings} />
    </header>
);

const DashboardPage = ({ allExams, filteredExams, onSelectExam, selectedCategory, onSelectCategory, searchTerm, onSearchChange }) => {
    const categories = ['All', ...new Set(allExams.map(exam => exam.category))];

    return (
        <div className="p-4 md:p-8 flex-grow">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Exam Dashboard</h1>
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder="Search for an exam..."
                        className="w-full p-3 pl-10 text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            selectedCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredExams.map(exam => (
                        <div key={exam.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="flex items-start gap-4 mb-4">
                                    {exam.icon}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{exam.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-400">{exam.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <button onClick={() => onSelectExam(exam)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
                                    Start Exam
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Exams Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your category or search term.</p>
                </div>
            )}
        </div>
    );
};


const Modal = ({ isOpen, onClose, onConfirm, title, children, showConfirm = true, confirmButtonColor = 'red' }) => {
    if (!isOpen) return null;

    const colorClasses = {
        red: 'bg-red-600 hover:bg-red-700',
        green: 'bg-green-600 hover:bg-green-700'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
                <div className="text-gray-600 dark:text-gray-300 mb-6">{children}</div>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-semibold">
                        {showConfirm ? 'Cancel' : 'Close'}
                    </button>
                    {showConfirm && (
                        <button onClick={onConfirm} className={`px-4 py-2 rounded-lg text-white font-semibold ${colorClasses[confirmButtonColor] || colorClasses.red}`}>Confirm</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SettingsModal = ({ isVisible, onClose, theme, onThemeChange }) => {
    const handleToggle = () => {
        onThemeChange(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Modal isOpen={isVisible} onClose={onClose} title="Settings" showConfirm={false}>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center gap-3">
                        <span className={`text-xl ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-400'}`}>🌙</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Dark Mode</span>
                    </div>
                    <button
                        onClick={handleToggle}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                            theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const ReviewQuestionGrid = ({ questions, userAnswers, onGoToQuestion }) => {
    const isCorrect = (question, userAnswerIndices) => {
        const correctIndices = new Set(question.answerOptions.map((opt, i) => opt.isCorrect ? i : -1).filter(i => i !== -1));
        const userIndices = new Set(userAnswerIndices || []);
        if (correctIndices.size !== userIndices.size) return false;
        return [...userIndices].every(i => correctIndices.has(i));
    };

    return (
        <div className="flex overflow-x-auto space-x-2 pb-4">
            {questions.map((q, i) => {
                const userAnswer = userAnswers[i];
                const answeredCorrectly = isCorrect(q, userAnswer);
                const wasAnswered = userAnswer && userAnswer.length > 0;

                let buttonClass = 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200'; // Unanswered
                if (wasAnswered && answeredCorrectly) {
                    buttonClass = 'bg-green-500 hover:bg-green-600 text-white'; // Correct
                } else if (wasAnswered && !answeredCorrectly) {
                    buttonClass = 'bg-red-500 hover:bg-red-600 text-white'; // Incorrect
                }

                return (
                    <button
                        key={i}
                        onClick={() => onGoToQuestion(i)}
                        className={`h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold rounded-lg transition-colors shadow-md ${buttonClass}`}
                    >
                        {i + 1}
                    </button>
                );
            })}
        </div>
    );
};


const ScoreScreen = ({ scoreData, onRestart, onBackToDashboard, onShowHistory, onBackToHistory, isFromHistory, scriptsLoaded }) => {
    const { score, rawScore, totalQuestions, questions, userAnswers, exam } = scoreData;
    const { message, color } = getScoreMessage(score, exam.passingScore);
    
    const [reviewFilter, setReviewFilter] = useState('all');
    const [explanationVisibility, setExplanationVisibility] = useState({});
    const [isReviewVisible, setIsReviewVisible] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPdf = () => {
        const reviewContent = document.getElementById('review-content');
        if (!reviewContent) {
            console.error("Review content element not found.");
            return;
        }
        if (!scriptsLoaded || typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
            console.error("PDF generation libraries (jsPDF, html2canvas) are not loaded.");
            return;
        }

        setIsDownloading(true);
        const { jsPDF } = window.jspdf;
        const html2canvas = window.html2canvas;

        html2canvas(reviewContent, { 
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 210; 
            const pdfHeight = 297; 
            const imgHeight = canvas.height * pdfWidth / canvas.width;
            let heightLeft = imgHeight;

            const pdf = new jsPDF('p', 'mm', 'a4');
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
              heightLeft -= pdfHeight;
            }

            const date = new Date().toLocaleDateString('en-CA');
            const safeTitle = exam.title.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = `${safeTitle}_Review_${date}.pdf`;
            
            pdf.save(fileName);
            setIsDownloading(false);
        }).catch(error => {
            console.error("Error generating PDF:", error);
            setIsDownloading(false);
        });
    };

    useEffect(() => {
        let questionsToDisplay = [...questions];
        if (reviewFilter === 'incorrect') {
            questionsToDisplay = questionsToDisplay.filter((question, index) => {
                const correctIndices = new Set(question.answerOptions.map((opt, i) => opt.isCorrect ? i : -1).filter(i => i !== -1));
                const userIndices = new Set(userAnswers[index] || []);
                if (correctIndices.size !== userIndices.size) return true;
                return ![...userIndices].every(i => correctIndices.has(i));
            });
        }
        setFilteredQuestions(questionsToDisplay);
    }, [reviewFilter, questions, userAnswers]);

    const handleFilterClick = (filter) => {
        if (isReviewVisible && reviewFilter === filter) setIsReviewVisible(false);
        else { setReviewFilter(filter); setIsReviewVisible(true); }
    };

    const toggleExplanation = (index) => setExplanationVisibility(prev => ({ ...prev, [index]: !prev[index] }));
    
    const handleGoToQuestion = (index) => {
        const element = document.getElementById(`review-card-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">{isFromHistory ? 'Reviewing Past Quiz' : 'Quiz Completed!'}</h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 text-center mb-8">{exam.title}</p>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <p className="text-lg text-gray-600 dark:text-gray-300">Your Score</p>
                            <p className="text-7xl font-bold text-purple-700 dark:text-purple-400 my-1">{score}</p>
                            <p className="text-md text-gray-500 dark:text-gray-400">(Passing Score: {exam.passingScore})</p>
                        </div>
                        <div className="flex-grow text-center">
                             <p className={`text-2xl font-bold mb-2 ${color}`}>{message}</p>
                             <p className="text-lg text-gray-700 dark:text-gray-200">You answered {rawScore} out of {totalQuestions} questions correctly.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={() => onRestart(exam)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">
                                {isFromHistory ? 'Restart Exam' : 'Try Again'}
                            </button>
                            {isFromHistory ? (
                                <button onClick={onBackToHistory} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">Back to History</button>
                            ) : (
                                <button onClick={onBackToDashboard} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-lg">Dashboard</button>
                            )}
                             <button onClick={onShowHistory} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">View History</button>
                        </div>
                    </div>
                </div>
            
                <div className="text-left">
                    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Review Your Answers</h3>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleFilterClick('all')} className={`px-4 py-2 rounded-lg font-semibold ${reviewFilter === 'all' && isReviewVisible ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>All</button>
                                <button onClick={() => handleFilterClick('incorrect')} className={`px-4 py-2 rounded-lg font-semibold ${reviewFilter === 'incorrect' && isReviewVisible ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>Incorrect</button>
                                {isReviewVisible && (
                                    <button onClick={handleDownloadPdf} disabled={isDownloading || !scriptsLoaded} className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed">
                                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                                    </button>
                                )}
                            </div>
                        </div>
                        {isReviewVisible && <ReviewQuestionGrid questions={questions} userAnswers={userAnswers} onGoToQuestion={handleGoToQuestion} />}
                    </div>

                    {isReviewVisible && (
                        <div id="review-content" className="mt-6">
                            {filteredQuestions.map((question, index) => {
                                const originalQuestionIndex = questions.findIndex(q => q.id === question.id);
                                return (
                                    <div key={question.id} id={`review-card-${originalQuestionIndex}`} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 scroll-mt-24">
                                        <p className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-2 whitespace-pre-wrap">{originalQuestionIndex + 1}. {question.questionText}</p>
                                        <ul className="flex flex-col gap-2">
                                            {question.answerOptions.map((option, optionIndex) => {
                                                const isUserAnswer = userAnswers[originalQuestionIndex] && userAnswers[originalQuestionIndex].includes(optionIndex);
                                                const isCorrectAnswer = option.isCorrect;
                                                let styleClass = 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200';
                                                let label = null;
                                                if (isCorrectAnswer) {
                                                    styleClass = 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-700 text-green-800 dark:text-green-200';
                                                    label = <span className="ml-auto pl-4 font-semibold">Correct Answer</span>;
                                                }
                                                if (isUserAnswer) {
                                                    if (isCorrectAnswer) {
                                                        label = <div className="ml-auto pl-4 flex flex-col items-end text-right"><span className="font-semibold text-green-700 dark:text-green-300">Correct Answer</span><span className="font-semibold text-blue-700 dark:text-blue-300 text-sm">(Your Answer)</span></div>;
                                                    } else {
                                                        styleClass = 'bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-700 text-red-800 dark:text-red-200';
                                                        label = <span className="ml-auto pl-4 font-semibold">Your Answer</span>;
                                                    }
                                                }
                                                return (
                                                    <li key={optionIndex} className={`p-2 md:p-3 rounded-lg border-2 flex items-center ${styleClass}`}>
                                                        <span className="mr-3 font-bold h-6 w-6 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">{String.fromCharCode(65 + optionIndex)}</span>
                                                        <span className="flex-grow">{option.answerText}</span>
                                                        {label}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        {question.explanation && (
                                            <div className="mt-4 text-left">
                                                <button onClick={() => toggleExplanation(originalQuestionIndex)} className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 font-semibold py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm-7.071 0a1 1 0 001.414 1.414l.707-.707a1 1 0 10-1.414-1.414l-.707.707zM10 16a1 1 0 100 2 1 1 0 000-2z" /></svg>
                                                    {explanationVisibility[originalQuestionIndex] ? 'Hide' : 'Show'} Explanation
                                                </button>
                                                {explanationVisibility[originalQuestionIndex] && (
                                                    <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-900 border-l-4 border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-200"><p className="font-bold">Explanation</p><p className="mt-1 whitespace-pre-wrap">{question.explanation}</p></div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const QuestionGrid = ({ totalQuestions, userAnswers, flaggedQuestions, currentQuestionIndex, onGoToQuestion }) => {
    return (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Question Navigator</h3>
            <div className="flex overflow-x-auto space-x-2 pb-4">
                {Array.from({ length: totalQuestions }, (_, i) => {
                    const isAnswered = userAnswers[i] && userAnswers[i].length > 0;
                    const isCurrent = i === currentQuestionIndex;
                    const isFlagged = flaggedQuestions[i];

                    let buttonClass = 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200';
                    if (isAnswered) {
                        buttonClass = 'bg-blue-500 hover:bg-blue-600 text-white';
                    }
                    if (isCurrent) {
                        buttonClass = 'bg-purple-600 hover:bg-purple-700 text-white';
                    }
                    if (isFlagged) {
                        buttonClass = 'bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600 text-black dark:text-gray-900';
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => onGoToQuestion(i)}
                            className={`h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold rounded-lg transition-colors shadow-md ${buttonClass}`}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


const QuestionView = ({ currentQuestionData, currentQuestionIndex, totalQuestions, userAnswers, onAnswer, onFlag, onNext, onPrev, flaggedQuestions, timeLeft, onGoToQuestion }) => {
    const mainContentRef = useRef(null);
    
    useEffect(() => {
        if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
    }, [currentQuestionIndex]);

    return (
        <div className="relative p-4 md:p-8">
            <div className="pb-4">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                        <span>Question {currentQuestionIndex + 1}</span>/{totalQuestions}
                    </div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-inner">
                        {formatTime(timeLeft)}
                    </div>
                </div>
                <div className="text-lg font-medium text-gray-800 dark:text-gray-100 mt-3 mb-6 text-left whitespace-pre-wrap">
                    {currentQuestionData.questionText}
                </div>
                {currentQuestionData.imageUrl && (
                    <div className="my-4 flex justify-center">
                        <img 
                            src={currentQuestionData.imageUrl} 
                            alt="Question diagram" 
                            className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x200/e2e8f0/4a5568?text=Image+Not+Found'; }}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-3">
                    {currentQuestionData.answerOptions.map((answerOption, index) => {
                        const isSelected = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].includes(index);
                        let buttonClass = 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600';
                        if (isSelected) buttonClass = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-400 dark:border-blue-600 ring-2 ring-blue-300 dark:ring-blue-500';
                        return (
                            <button key={index} onClick={() => onAnswer(index)} className={`w-full font-medium py-3 px-4 rounded-lg border-2 transition duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-opacity-75 ${buttonClass} hover:scale-102 cursor-pointer text-left flex items-center`}>
                                <span className="mr-3 font-bold h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex-shrink-0">{String.fromCharCode(65 + index)}</span>
                                <span>{answerOption.answerText}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <button onClick={onFlag} className={`font-bold py-3 px-5 md:py-3 md:px-6 text-sm md:text-base rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${flaggedQuestions[currentQuestionIndex] ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400' : 'bg-yellow-300 hover:bg-yellow-400 text-yellow-800 focus:ring-yellow-300'}`}>
                        {flaggedQuestions[currentQuestionIndex] ? 'Unflag' : 'Flag'}
                    </button>
                    <div className="flex gap-2 md:gap-4">
                        {currentQuestionIndex > 0 && <button onClick={onPrev} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-5 md:py-3 md:px-8 text-sm md:text-base rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Back</button>}
                        <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 md:py-3 md:px-8 text-sm md:text-base rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                            {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </div>
                <QuestionGrid
                    totalQuestions={totalQuestions}
                    userAnswers={userAnswers}
                    flaggedQuestions={flaggedQuestions}
                    currentQuestionIndex={currentQuestionIndex}
                    onGoToQuestion={onGoToQuestion}
                />
            </div>
        </div>
    );
};

const FinalReviewScreen = ({ flaggedQuestions, unansweredQuestions, onGoToQuestion, onSubmitFinal }) => (
    <div className="p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Final Review</h2>
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Flagged Questions</h3>
            {flaggedQuestions.length > 0 ? (
                <div className="flex flex-wrap gap-2">{flaggedQuestions.map(qIndex => <button key={`flagged-${qIndex}`} onClick={() => onGoToQuestion(qIndex)} className="h-10 w-10 flex items-center justify-center font-bold rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors">{qIndex + 1}</button>)}</div>
            ) : <p className="text-gray-500 dark:text-gray-400">No questions flagged for review.</p>}
        </div>
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Unanswered Questions</h3>
            {unansweredQuestions.length > 0 ? (
                <div className="flex flex-wrap gap-2">{unansweredQuestions.map(qIndex => <button key={`unanswered-${qIndex}`} onClick={() => onGoToQuestion(qIndex)} className="h-10 w-10 flex items-center justify-center font-bold rounded-md text-white bg-gray-400 hover:bg-gray-500 transition-colors">{qIndex + 1}</button>)}</div>
            ) : <p className="text-gray-500 dark:text-gray-400">All questions have been answered.</p>}
        </div>
        <div className="mt-12 text-center">
            <button onClick={onSubmitFinal} className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                Submit Final Answers
            </button>
        </div>
    </div>
);

const HistoryPanel = ({ isVisible, onClose, history, onReview, onClear, onPromptDelete }) => {
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    const handleClearConfirm = () => {
        onClear();
        setIsClearModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isClearModalOpen} onClose={() => setIsClearModalOpen(false)} onConfirm={handleClearConfirm} title="Clear History">
                Are you sure you want to clear your entire score history? This action cannot be undone.
            </Modal>
            <div className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isVisible ? '' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={onClose}></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-500 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Score History</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {history.length > 0 ? (
                                <ul className="space-y-4">
                                    {history.map((entry) => (
                                        <li key={entry.id} className={`rounded-lg flex justify-between items-center text-left transition-colors group relative ${entry.score >= entry.passingScore ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                            <button onClick={() => onReview(entry)} className={`w-full p-4 text-left hover:${entry.score >= entry.passingScore ? 'bg-green-200 dark:bg-green-800' : 'bg-red-200 dark:bg-red-800'} rounded-lg transition-colors`}>
                                                <div className="flex-grow pr-8">
                                                    <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{entry.examTitle}</p>
                                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{Math.round(entry.rawScore)} / {entry.totalQuestions} correct</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(entry.date).toLocaleString()}</p>
                                                </div>
                                                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 absolute top-1/2 right-4 -translate-y-1/2">{entry.score}</p>
                                            </button>
                                            <button 
                                                onClick={() => onPromptDelete(entry.id)}
                                                className="absolute top-1 right-1 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-200 dark:hover:bg-red-800 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Delete entry"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No scores recorded yet.</p>}
                        </div>
                        {history.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <button onClick={() => setIsClearModalOpen(true)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Clear All History
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


// =================================================================================
// === MAIN APP COMPONENT ==========================================================
// =================================================================================
const App = () => {
    const [appState, setAppState] = useState('loading');
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
    const [isExitConfirmVisible, setIsExitConfirmVisible] = useState(false);
    const [isStartConfirmVisible, setIsStartConfirmVisible] = useState(false);
    const [examToStart, setExamToStart] = useState(null);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    // --- HANDLERS ---
    const handleSelectExam = (exam) => {
        setActiveExam(exam);
        const questionsForQuiz = shuffleArray([...exam.questions]).slice(0, exam.questionsPerQuiz);
        setCurrentQuizQuestions(questionsForQuiz);
        setUserAnswers(Array(questionsForQuiz.length).fill(null).map(() => []));
        setFlaggedQuestions(Array(questionsForQuiz.length).fill(false));
        setCurrentQuestionIndex(0);
        setTimeLeft(exam.durationSeconds);
        setIsQuizActive(true);
        setShowFinalReview(false);
        setCompletedQuizData(null);
        setReviewingHistoryEntry(null);
        setAppState('quiz');
    };

    const handlePromptStartExam = (exam) => {
        setExamToStart(exam);
        setIsStartConfirmVisible(true);
    };

    const handleConfirmStartExam = () => {
        if (examToStart) {
            handleSelectExam(examToStart);
        }
        setIsStartConfirmVisible(false);
        setExamToStart(null);
    };
    
    const handleSubmitQuiz = useCallback(() => {
        if (!activeExam) return;
        setIsQuizActive(false);

        let totalPoints = 0;
        userAnswers.forEach((selectedIndices, questionIndex) => {
            const question = currentQuizQuestions[questionIndex];
            const correctOptionIndices = new Set(question.answerOptions.map((option, index) => (option.isCorrect ? index : -1)).filter(index => index !== -1));
            const userSelectedIndices = new Set(selectedIndices || []);
            if (correctOptionIndices.size > 0) {
                 const isCorrect = correctOptionIndices.size === userSelectedIndices.size && [...userSelectedIndices].every(i => correctOptionIndices.has(i));
                 if (isCorrect) totalPoints += 1;
            }
        });

        const totalQuestions = currentQuizQuestions.length;
        const finalScaledScore = totalQuestions > 0 ? Math.round(((totalPoints / totalQuestions) * 800) + 100) : 100;

        const scoreEntry = {
            id: new Date().toISOString(), // Use timestamp as a unique ID
            examId: activeExam.id,
            examTitle: activeExam.title,
            score: finalScaledScore,
            date: new Date().toISOString(),
            questions: currentQuizQuestions,
            userAnswers: userAnswers,
            rawScore: totalPoints,
            totalQuestions: totalQuestions,
            exam: activeExam,
            passingScore: activeExam.passingScore
        };
        
        setCompletedQuizData(scoreEntry);
        
        // Save to localStorage
        const currentHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
        const newHistory = [scoreEntry, ...currentHistory];
        localStorage.setItem('quizAppHistory', JSON.stringify(newHistory));
        setScoreHistory(newHistory);

        setAppState('review');
        setShowFinalReview(false);
    }, [activeExam, userAnswers, currentQuizQuestions]);

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
        if (examForHistory) {
            setReviewingHistoryEntry({ ...entry, exam: examForHistory });
            setAppState('review');
            setIsHistoryVisible(false);
        } else {
            console.error("Could not find the original exam for this history entry.");
        }
    };

    const clearHistory = () => {
        localStorage.removeItem('quizAppHistory');
        setScoreHistory([]);
    };

    const handlePromptDelete = (entryId) => {
        setEntryToDelete(entryId);
    };

    const handleConfirmDelete = () => {
        const currentHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
        const newHistory = currentHistory.filter(entry => entry.id !== entryToDelete);
        localStorage.setItem('quizAppHistory', JSON.stringify(newHistory));
        setScoreHistory(newHistory);
        setEntryToDelete(null);
    };
    
    const handleGoToDashboard = () => {
        if (appState === 'quiz') {
            setIsExitConfirmVisible(true);
        } else {
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
        // Dynamically load scripts for PDF generation
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
        ]).then(() => {
            setScriptsLoaded(true);
        }).catch(error => {
            console.error("Failed to load PDF generation scripts:", error);
        });
        
        // Load exams from local library
        setAllExams(examLibrary);
        
        // Load history from localStorage
        const savedHistory = JSON.parse(localStorage.getItem('quizAppHistory')) || [];
        setScoreHistory(savedHistory);
        
        // App is ready to go
        setAppState('dashboard');
    }, []);
    
    useEffect(() => {
        if (!isQuizActive) return;
        if (timeLeft === 0) {
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
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('quiz-app-theme', theme);
    }, [theme]);

    // --- RENDER LOGIC ---
    const renderContent = () => {
        if (appState === 'loading') {
             return <div className="text-center p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">Loading...</div>;
        }

        const filteredExams = allExams.filter(exam => {
            const categoryMatch = selectedCategory === 'All' || exam.category === selectedCategory;
            const searchTermMatch = searchTerm === '' || 
                                    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    exam.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchTermMatch;
        });

        switch (appState) {
            case 'dashboard':
                return (
                    <div className="relative bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen">
                        <Header 
                            onShowHistory={() => setIsHistoryVisible(true)} 
                            onShowSettings={() => setIsSettingsVisible(true)}
                            onGoToDashboard={handleGoToDashboard}
                        />
                        <DashboardPage 
                            allExams={allExams}
                            filteredExams={filteredExams} 
                            onSelectExam={handlePromptStartExam}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            searchTerm={searchTerm}
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                );
            case 'quiz':
            case 'review':
                 return (
                    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
                        <Header 
                           onShowHistory={() => setIsHistoryVisible(true)} 
                           onShowSettings={() => setIsSettingsVisible(true)}
                           onGoToDashboard={handleGoToDashboard}
                        />
                        <main className="flex-grow overflow-y-auto">
                           {appState === 'quiz' && (
                                <>
                                {showFinalReview ? (
                                    <FinalReviewScreen 
                                        flaggedQuestions={flaggedQuestions.map((f, i) => f ? i : -1).filter(i => i !== -1)} 
                                        unansweredQuestions={userAnswers.map((a, i) => (!a || a.length === 0) ? i : -1).filter(i => i !== -1)} 
                                        onGoToQuestion={(qIndex) => { setCurrentQuestionIndex(qIndex); setShowFinalReview(false); }} 
                                        onSubmitFinal={handleSubmitQuiz} 
                                    />
                                ) : (
                                    currentQuizQuestions.length > 0 && <QuestionView 
                                        currentQuestionData={currentQuizQuestions[currentQuestionIndex]} 
                                        currentQuestionIndex={currentQuestionIndex} 
                                        totalQuestions={currentQuizQuestions.length} 
                                        userAnswers={userAnswers} 
                                        onAnswer={handleAnswerOptionClick} 
                                        onFlag={handleToggleFlag} 
                                        onNext={handleNextOrSubmit} 
                                        onPrev={() => setCurrentQuestionIndex(i => i - 1)} 
                                        flaggedQuestions={flaggedQuestions} 
                                        timeLeft={timeLeft} 
                                        onGoToQuestion={setCurrentQuestionIndex}
                                    />
                                )}
                                </>
                           )}
                           {appState === 'review' && (
                                (reviewingHistoryEntry || completedQuizData) ? (
                                    <ScoreScreen 
                                        scoreData={reviewingHistoryEntry || completedQuizData} 
                                        onRestart={handlePromptStartExam} 
                                        onBackToDashboard={() => { setReviewingHistoryEntry(null); setAppState('dashboard'); }} 
                                        onShowHistory={() => setIsHistoryVisible(true)}
                                        isFromHistory={!!reviewingHistoryEntry}
                                        onBackToHistory={() => { setReviewingHistoryEntry(null); setIsHistoryVisible(true); }}
                                        scriptsLoaded={scriptsLoaded}
                                    />
                                ) : <div>Loading review...</div>
                           )}
                        </main>
                    </div>
                );
            default:
                return <div className="text-center p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">An unexpected error occurred. Please refresh.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <div className="w-full h-full">
                {renderContent()}
                <HistoryPanel 
                    isVisible={isHistoryVisible} 
                    onClose={() => setIsHistoryVisible(false)} 
                    history={scoreHistory}
                    onReview={handleReviewHistory}
                    onClear={clearHistory}
                    onPromptDelete={handlePromptDelete}
                />
                <SettingsModal
                    isVisible={isSettingsVisible}
                    onClose={() => setIsSettingsVisible(false)}
                    theme={theme}
                    onThemeChange={setTheme}
                />
                <Modal
                    isOpen={isExitConfirmVisible}
                    onClose={() => setIsExitConfirmVisible(false)}
                    onConfirm={confirmExitQuiz}
                    title="Exit Quiz?"
                >
                    Are you sure you want to exit? Your current progress will be lost.
                </Modal>
                <Modal
                    isOpen={isStartConfirmVisible}
                    onClose={() => {
                        setIsStartConfirmVisible(false);
                        setExamToStart(null);
                    }}
                    onConfirm={handleConfirmStartExam}
                    title="Start Exam?"
                    confirmButtonColor="green"
                >
                    {examToStart && (
                        <p>Are you sure you want to start the <strong>{examToStart.title}</strong> exam?</p>
                    )}
                </Modal>
                <Modal
                    isOpen={!!entryToDelete}
                    onClose={() => setEntryToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Score?"
                >
                    Are you sure you want to delete this score entry? This action cannot be undone.
                </Modal>
            </div>
        </div>
    );
};

export default App;

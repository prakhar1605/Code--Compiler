// Global State
let editor = null;
let currentUser = null;
let currentLanguage = 'java';
let currentCode = '';
let savedCodes = [];
let isCodeModified = false;

// Mock Data from provided JSON
const mockData = {
  sampleCode: {
    "java": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World! This is Java.\");\n        \n        // Example of variables and operations\n        int number1 = 10;\n        int number2 = 20;\n        int sum = number1 + number2;\n        \n        System.out.println(\"Sum of \" + number1 + \" and \" + number2 + \" is: \" + sum);\n        \n        // Example of loop\n        System.out.println(\"Counting from 1 to 5:\");\n        for(int i = 1; i <= 5; i++) {\n            System.out.println(\"Count: \" + i);\n        }\n    }\n}",
    "python": "print(\"Hello, World! This is Python.\")\n\n# Example of variables and operations\nnumber1 = 10\nnumber2 = 20\nsum_result = number1 + number2\n\nprint(f\"Sum of {number1} and {number2} is: {sum_result}\")\n\n# Example of loop\nprint(\"Counting from 1 to 5:\")\nfor i in range(1, 6):\n    print(f\"Count: {i}\")\n\n# Example of list operations\nfruits = [\"apple\", \"banana\", \"orange\"]\nprint(\"\\nFruits list:\")\nfor fruit in fruits:\n    print(f\"- {fruit}\")"
  },
  mockUsers: [
    {
      "id": "user1",
      "username": "developer",
      "email": "dev@example.com",
      "password": "password123",
      "savedCodes": ["code1", "code2"]
    },
    {
      "id": "user2", 
      "username": "student",
      "email": "student@example.com",
      "password": "student123",
      "savedCodes": ["code3"]
    }
  ],
  mockSavedCodes: [
    {
      "id": "code1",
      "userId": "user1",
      "name": "Calculator Program",
      "language": "java",
      "code": "import java.util.Scanner;\n\npublic class Calculator {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.print(\"Enter first number: \");\n        double num1 = scanner.nextDouble();\n        \n        System.out.print(\"Enter second number: \");\n        double num2 = scanner.nextDouble();\n        \n        System.out.println(\"Addition: \" + (num1 + num2));\n        System.out.println(\"Subtraction: \" + (num1 - num2));\n        System.out.println(\"Multiplication: \" + (num1 * num2));\n        System.out.println(\"Division: \" + (num1 / num2));\n        \n        scanner.close();\n    }\n}",
      "createdAt": "2025-01-27T10:00:00Z",
      "updatedAt": "2025-01-27T10:30:00Z"
    },
    {
      "id": "code2",
      "userId": "user1", 
      "name": "Array Operations",
      "language": "java",
      "code": "public class ArrayExample {\n    public static void main(String[] args) {\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        System.out.println(\"Array elements:\");\n        for(int i = 0; i < numbers.length; i++) {\n            System.out.println(\"Index \" + i + \": \" + numbers[i]);\n        }\n        \n        // Find sum\n        int sum = 0;\n        for(int num : numbers) {\n            sum += num;\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n}",
      "createdAt": "2025-01-27T11:00:00Z",
      "updatedAt": "2025-01-27T11:15:00Z"
    },
    {
      "id": "code3",
      "userId": "user2",
      "name": "Python Data Analysis",
      "language": "python", 
      "code": "# Simple data analysis example\nimport math\n\n# Sample data\nscores = [85, 92, 78, 96, 88, 76, 90, 89, 84, 91]\n\nprint(\"Student Scores Analysis\")\nprint(\"=\" * 25)\nprint(f\"Scores: {scores}\")\nprint(f\"Number of students: {len(scores)}\")\nprint(f\"Highest score: {max(scores)}\")\nprint(f\"Lowest score: {min(scores)}\")\nprint(f\"Average score: {sum(scores) / len(scores):.2f}\")\n\n# Count grades\ngrade_a = sum(1 for score in scores if score >= 90)\ngrade_b = sum(1 for score in scores if 80 <= score < 90)\ngrade_c = sum(1 for score in scores if 70 <= score < 80)\n\nprint(f\"\\nGrade Distribution:\")\nprint(f\"A grades (90+): {grade_a}\")\nprint(f\"B grades (80-89): {grade_b}\")\nprint(f\"C grades (70-79): {grade_c}\")",
      "createdAt": "2025-01-27T09:00:00Z",
      "updatedAt": "2025-01-27T09:45:00Z"
    }
  ],
  executionResults: {
    "java_success": {
      "status": "success",
      "output": "Hello, World! This is Java.\nSum of 10 and 20 is: 30\nCounting from 1 to 5:\nCount: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5",
      "errors": "",
      "executionTime": "1.2s"
    },
    "python_success": {
      "status": "success", 
      "output": "Hello, World! This is Python.\nSum of 10 and 20 is: 30\nCounting from 1 to 5:\nCount: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n\nFruits list:\n- apple\n- banana\n- orange",
      "errors": "",
      "executionTime": "0.8s"
    },
    "java_error": {
      "status": "error",
      "output": "",
      "errors": "Error: Line 3: ';' expected\nError: Line 5: cannot find symbol - variable x",
      "executionTime": "0.5s"
    },
    "python_error": {
      "status": "error",
      "output": "",
      "errors": "SyntaxError: invalid syntax (line 2)\nNameError: name 'undefined_variable' is not defined (line 4)",
      "executionTime": "0.3s"
    }
  },
  codeTemplates: {
    "java": {
      "hello_world": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
      "scanner_input": "import java.util.Scanner;\n\npublic class InputExample {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.print(\"Enter your name: \");\n        String name = scanner.nextLine();\n        \n        System.out.println(\"Hello, \" + name + \"!\");\n        \n        scanner.close();\n    }\n}",
      "loops": "public class LoopExample {\n    public static void main(String[] args) {\n        // For loop\n        for(int i = 1; i <= 5; i++) {\n            System.out.println(\"For loop: \" + i);\n        }\n        \n        // While loop\n        int j = 1;\n        while(j <= 3) {\n            System.out.println(\"While loop: \" + j);\n            j++;\n        }\n    }\n}"
    },
    "python": {
      "hello_world": "print(\"Hello, World!\")",
      "user_input": "name = input(\"Enter your name: \")\nprint(f\"Hello, {name}!\")",
      "loops": "# For loop\nfor i in range(1, 6):\n    print(f\"For loop: {i}\")\n\n# While loop\nj = 1\nwhile j <= 3:\n    print(f\"While loop: {j}\")\n    j += 1\n\n# List iteration\nfruits = ['apple', 'banana', 'orange']\nfor fruit in fruits:\n    print(f\"Fruit: {fruit}\")"
    }
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeMonacoEditor();
  initializeEventListeners();
  loadInitialCode();
  updateUI();
});

// Monaco Editor Initialization
function initializeMonacoEditor() {
  require.config({ 
    paths: { 
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
    }
  });
  
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
      value: mockData.sampleCode.java,
      language: 'java',
      theme: 'vs-dark',
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      automaticLayout: true
    });

    // Track changes
    editor.onDidChangeModelContent(() => {
      isCodeModified = true;
      currentCode = editor.getValue();
      updateFileStatus();
    });

    currentCode = editor.getValue();
  });
}

// Event Listeners
function initializeEventListeners() {
  // Authentication
  document.getElementById('loginBtn').addEventListener('click', showLoginModal);
  document.getElementById('registerBtn').addEventListener('click', showRegisterModal);
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Modal controls
  document.getElementById('closeLogin').addEventListener('click', hideLoginModal);
  document.getElementById('closeRegister').addEventListener('click', hideRegisterModal);
  document.getElementById('closeSave').addEventListener('click', hideSaveModal);
  document.getElementById('closeShare').addEventListener('click', hideShareModal);
  
  // Forms
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
  document.getElementById('saveForm').addEventListener('submit', handleSaveCode);
  
  // Editor controls
  document.getElementById('runBtn').addEventListener('click', runCode);
  document.getElementById('saveBtn').addEventListener('click', showSaveModal);
  document.getElementById('shareBtn').addEventListener('click', shareCode);
  document.getElementById('clearBtn').addEventListener('click', clearCode);
  document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);
  
  // Language and settings
  document.getElementById('languageSelect').addEventListener('change', changeLanguage);
  document.getElementById('fontSizeSelect').addEventListener('change', changeFontSize);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Template buttons - Fixed to properly handle template loading
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const template = e.target.dataset.template;
      loadTemplate(template);
    });
  });
  
  // Refresh saved files
  document.getElementById('refreshSavedBtn').addEventListener('click', loadSavedFiles);
  
  // Copy share link
  document.getElementById('copyLinkBtn').addEventListener('click', copyShareLink);
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideAllModals();
      }
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Close notifications
  document.querySelector('.notification-close').addEventListener('click', hideNotification);
}

// Authentication Functions
function showLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('loginUsername').focus();
}

function hideLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
  document.getElementById('loginError').classList.add('hidden');
  document.getElementById('loginForm').reset();
}

function showRegisterModal() {
  document.getElementById('registerModal').classList.remove('hidden');
  document.getElementById('registerUsername').focus();
}

function hideRegisterModal() {
  document.getElementById('registerModal').classList.add('hidden');
  document.getElementById('registerError').classList.add('hidden');
  document.getElementById('registerForm').reset();
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simulate API call
  const user = mockData.mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    currentUser = user;
    hideLoginModal();
    updateUI();
    loadSavedFiles();
    showNotification('Login successful!', 'success');
  } else {
    showError('loginError', 'Invalid username or password');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  
  // Check if username exists
  const existingUser = mockData.mockUsers.find(u => u.username === username);
  
  if (existingUser) {
    showError('registerError', 'Username already exists');
    return;
  }
  
  // Create new user
  const newUser = {
    id: 'user' + (mockData.mockUsers.length + 1),
    username,
    email,
    password,
    savedCodes: []
  };
  
  mockData.mockUsers.push(newUser);
  currentUser = newUser;
  
  hideRegisterModal();
  updateUI();
  showNotification('Registration successful!', 'success');
}

function logout() {
  currentUser = null;
  updateUI();
  loadSavedFiles();
  showNotification('Logged out successfully!', 'success');
}

// Code Execution
function runCode() {
  if (!editor) return;
  
  const code = editor.getValue().trim();
  if (!code) {
    showNotification('Please enter some code to execute', 'error');
    return;
  }
  
  showExecutionSpinner();
  updateExecutionStatus('running', 'Executing...');
  
  // Simulate API call delay
  setTimeout(() => {
    const result = simulateCodeExecution(code, currentLanguage);
    displayExecutionResult(result);
    hideExecutionSpinner();
  }, 1500);
}

function simulateCodeExecution(code, language) {
  // Simple simulation logic
  const isDefaultCode = code === mockData.sampleCode[language];
  const hasBasicSyntax = language === 'java' ? code.includes('public static void main') : code.includes('print');
  const hasSyntaxErrors = code.includes('syntax_error') || code.includes('undefined_variable');
  
  if (hasSyntaxErrors) {
    return mockData.executionResults[language + '_error'];
  } else if (isDefaultCode || hasBasicSyntax) {
    return mockData.executionResults[language + '_success'];
  } else {
    // Custom code simulation
    return {
      status: 'success',
      output: 'Program executed successfully!\nOutput would appear here in a real implementation.',
      errors: '',
      executionTime: '0.9s'
    };
  }
}

function displayExecutionResult(result) {
  const outputContent = document.getElementById('outputContent');
  const executionStatus = document.getElementById('executionStatus');
  
  if (result.status === 'success') {
    outputContent.textContent = result.output || 'Program executed successfully!';
    outputContent.classList.remove('error');
    updateExecutionStatus('success', `Success (${result.executionTime})`);
  } else {
    outputContent.textContent = result.errors || 'Execution failed';
    outputContent.classList.add('error');
    updateExecutionStatus('error', `Error (${result.executionTime})`);
  }
}

function showExecutionSpinner() {
  document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideExecutionSpinner() {
  document.getElementById('loadingSpinner').classList.add('hidden');
}

function updateExecutionStatus(status, message) {
  const statusElement = document.getElementById('executionStatus');
  statusElement.className = `execution-status ${status}`;
  statusElement.textContent = message;
}

// Code Management
function showSaveModal() {
  if (!currentUser) {
    showNotification('Please login to save code', 'error');
    showLoginModal();
    return;
  }
  
  document.getElementById('saveModal').classList.remove('hidden');
  document.getElementById('saveFileName').focus();
}

function hideSaveModal() {
  document.getElementById('saveModal').classList.add('hidden');
  document.getElementById('saveError').classList.add('hidden');
  document.getElementById('saveForm').reset();
}

function handleSaveCode(e) {
  e.preventDefault();
  
  if (!currentUser || !editor) return;
  
  const fileName = document.getElementById('saveFileName').value.trim();
  if (!fileName) {
    showError('saveError', 'Please enter a file name');
    return;
  }
  
  const code = editor.getValue();
  const newCode = {
    id: 'code' + Date.now(),
    userId: currentUser.id,
    name: fileName,
    language: currentLanguage,
    code: code,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockData.mockSavedCodes.push(newCode);
  currentUser.savedCodes.push(newCode.id);
  
  hideSaveModal();
  loadSavedFiles();
  isCodeModified = false;
  updateFileStatus();
  showNotification('Code saved successfully!', 'success');
}

function loadSavedFiles() {
  const savedFilesList = document.getElementById('savedFilesList');
  
  if (!currentUser) {
    savedFilesList.innerHTML = '<p class="empty-state">Login to see saved files</p>';
    return;
  }
  
  const userSavedCodes = mockData.mockSavedCodes.filter(code => 
    currentUser.savedCodes.includes(code.id)
  );
  
  if (userSavedCodes.length === 0) {
    savedFilesList.innerHTML = '<p class="empty-state">No saved files</p>';
    return;
  }
  
  savedFilesList.innerHTML = userSavedCodes.map(code => `
    <div class="saved-file-item" onclick="loadSavedCode('${code.id}')">
      <div class="saved-file-info">
        <div class="saved-file-name">${code.name}</div>
        <div class="saved-file-meta">${code.language} • ${formatDate(code.updatedAt)}</div>
      </div>
      <div class="saved-file-actions">
        <button class="delete-file-btn" onclick="deleteSavedCode('${code.id}', event)">🗑</button>
      </div>
    </div>
  `).join('');
}

function loadSavedCode(codeId) {
  const code = mockData.mockSavedCodes.find(c => c.id === codeId);
  if (!code || !editor) return;
  
  currentLanguage = code.language;
  editor.setValue(code.code);
  monaco.editor.setModelLanguage(editor.getModel(), code.language);
  
  document.getElementById('languageSelect').value = code.language;
  document.getElementById('currentFileName').textContent = code.name + '.' + code.language;
  
  isCodeModified = false;
  updateFileStatus();
  updateEditorTheme();
  
  showNotification(`Loaded "${code.name}"`, 'success');
}

function deleteSavedCode(codeId, event) {
  event.stopPropagation();
  
  if (confirm('Are you sure you want to delete this file?')) {
    // Remove from mockSavedCodes
    const index = mockData.mockSavedCodes.findIndex(c => c.id === codeId);
    if (index > -1) {
      mockData.mockSavedCodes.splice(index, 1);
    }
    
    // Remove from user's saved codes
    if (currentUser) {
      const userIndex = currentUser.savedCodes.indexOf(codeId);
      if (userIndex > -1) {
        currentUser.savedCodes.splice(userIndex, 1);
      }
    }
    
    loadSavedFiles();
    showNotification('File deleted successfully', 'success');
  }
}

// Language and Template Management
function changeLanguage() {
  const newLanguage = document.getElementById('languageSelect').value;
  if (newLanguage === currentLanguage || !editor) return;
  
  currentLanguage = newLanguage;
  const extension = newLanguage === 'java' ? '.java' : '.py';
  
  // Load default template for new language
  editor.setValue(mockData.sampleCode[newLanguage]);
  monaco.editor.setModelLanguage(editor.getModel(), newLanguage);
  
  document.getElementById('currentFileName').textContent = 'Untitled' + extension;
  
  isCodeModified = false;
  updateFileStatus();
  updateEditorTheme();
  
  showNotification(`Switched to ${newLanguage.charAt(0).toUpperCase() + newLanguage.slice(1)}`, 'success');
}

// Fixed template loading function
function loadTemplate(templateName) {
  if (!editor) return;
  
  // Map template names to match HTML data attributes
  const templateMap = {
    'hello_world': 'hello_world',
    'scanner_input': 'user_input', // Map scanner_input to user_input for Python
    'loops': 'loops'
  };
  
  // Get the correct template key
  let templateKey = templateName;
  if (currentLanguage === 'python' && templateName === 'scanner_input') {
    templateKey = 'user_input';
  }
  
  const template = mockData.codeTemplates[currentLanguage][templateKey];
  
  if (template) {
    editor.setValue(template);
    isCodeModified = false;
    updateFileStatus();
    
    // Update filename based on template
    const extension = currentLanguage === 'java' ? '.java' : '.py';
    const templateNames = {
      'hello_world': 'HelloWorld',
      'scanner_input': 'InputExample',
      'user_input': 'InputExample',
      'loops': 'LoopExample'
    };
    
    const fileName = templateNames[templateKey] || 'Untitled';
    document.getElementById('currentFileName').textContent = fileName + extension;
    
    showNotification(`Loaded ${templateName.replace('_', ' ')} template`, 'success');
  } else {
    console.error(`Template ${templateKey} not found for language ${currentLanguage}`);
    showNotification(`Template not available for ${currentLanguage}`, 'error');
  }
}

// UI Updates
function updateUI() {
  const userSection = document.getElementById('userSection');
  const userInfo = document.getElementById('userInfo');
  const saveBtn = document.getElementById('saveBtn');
  
  if (currentUser) {
    userSection.classList.add('hidden');
    userInfo.classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.username;
    saveBtn.disabled = false;
  } else {
    userSection.classList.remove('hidden');
    userInfo.classList.add('hidden');
    saveBtn.disabled = true;
  }
}

function updateFileStatus() {
  const fileStatus = document.getElementById('fileStatus');
  fileStatus.className = 'file-status' + (isCodeModified ? ' modified' : '');
}

// Theme Management
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = body.getAttribute('data-color-scheme');
  
  if (currentTheme === 'dark') {
    body.setAttribute('data-color-scheme', 'light');
    themeIcon.textContent = '🌙';
  } else {
    body.setAttribute('data-color-scheme', 'dark');
    themeIcon.textContent = '☀️';
  }
  
  updateEditorTheme();
}

function updateEditorTheme() {
  if (!editor) return;
  
  const isDark = document.body.getAttribute('data-color-scheme') === 'dark' || 
                 window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs');
}

function changeFontSize() {
  const fontSize = parseInt(document.getElementById('fontSizeSelect').value);
  if (editor) {
    editor.updateOptions({ fontSize: fontSize });
  }
}

// Sharing
function shareCode() {
  const code = editor ? editor.getValue() : '';
  if (!code.trim()) {
    showNotification('Please enter some code to share', 'error');
    return;
  }
  
  // Generate a mock shareable link
  const codeHash = btoa(encodeURIComponent(code)).substring(0, 8);
  const shareUrl = `${window.location.origin}${window.location.pathname}?shared=${codeHash}&lang=${currentLanguage}`;
  
  document.getElementById('shareLink').value = shareUrl;
  document.getElementById('shareModal').classList.remove('hidden');
}

function copyShareLink() {
  const shareLink = document.getElementById('shareLink');
  shareLink.select();
  document.execCommand('copy');
  showNotification('Link copied to clipboard!', 'success');
}

function hideShareModal() {
  document.getElementById('shareModal').classList.add('hidden');
}

// Utility Functions
function clearCode() {
  if (confirm('Are you sure you want to clear all code?')) {
    if (editor) {
      editor.setValue('');
      isCodeModified = false;
      updateFileStatus();
    }
  }
}

function clearOutput() {
  document.getElementById('outputContent').textContent = 'Ready to execute code...';
  document.getElementById('outputContent').classList.remove('error');
  document.getElementById('executionStatus').textContent = '';
  document.getElementById('executionStatus').className = 'execution-status';
}

function loadInitialCode() {
  // Check for shared code in URL
  const urlParams = new URLSearchParams(window.location.search);
  const sharedCode = urlParams.get('shared');
  
  if (sharedCode) {
    // In a real implementation, this would fetch the shared code
    showNotification('Shared code loaded!', 'success');
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const messageElement = notification.querySelector('.notification-message');
  
  messageElement.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    hideNotification();
  }, 3000);
}

function hideNotification() {
  document.getElementById('notification').classList.add('hidden');
}

function hideAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
  
  // Reset error messages
  document.querySelectorAll('.error-message').forEach(error => {
    error.classList.add('hidden');
  });
  
  // Reset forms
  document.querySelectorAll('form').forEach(form => {
    form.reset();
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function handleKeyboardShortcuts(e) {
  // Ctrl+S - Save
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    if (currentUser) {
      showSaveModal();
    }
  }
  
  // Ctrl+R - Run
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    runCode();
  }
  
  // Escape - Close modals
  if (e.key === 'Escape') {
    hideAllModals();
    hideNotification();
  }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial theme based on system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-color-scheme', 'dark');
    document.getElementById('themeIcon').textContent = '☀️';
  }
  
  // Update editor theme when system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateEditorTheme);
});
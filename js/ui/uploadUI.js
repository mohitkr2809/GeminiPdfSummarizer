/**
 * Upload UI Controller Module
 * Manages UI interactions and state
 */

export class UploadUI {
    constructor() {
        this.selectedFile = null;
        this.apiKey = this.loadApiKey();
        this.initializeElements();
        this.attachEventListeners();
        this.updateUI();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.removeFileBtn = document.getElementById('removeFile');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.summarizeBtn = document.getElementById('summarizeBtn');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultSection = document.getElementById('resultSection');
        this.summaryContent = document.getElementById('summaryContent');
        this.errorSection = document.getElementById('errorSection');
        this.errorMessage = document.getElementById('errorMessage');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });

        // File input change
        this.fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            this.handleFileSelect(file);
        });

        // Remove file
        this.removeFileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clearFile();
        });

        // API key input
        this.apiKeyInput.addEventListener('input', (e) => {
            this.apiKey = e.target.value;
            this.saveApiKey(this.apiKey);
            this.updateUI();
        });

        // Set initial API key value
        if (this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
        }
    }

    /**
     * Handle file selection
     * @param {File} file - Selected file
     */
    handleFileSelect(file) {
        if (!file) return;

        if (file.type !== 'application/pdf') {
            this.showError('Please select a PDF file');
            return;
        }

        this.selectedFile = file;
        this.updateUI();
    }

    /**
     * Clear selected file
     */
    clearFile() {
        this.selectedFile = null;
        this.fileInput.value = '';
        this.updateUI();
    }

    /**
     * Update UI based on current state
     */
    updateUI() {
        const hasFile = !!this.selectedFile;
        const hasApiKey = !!this.apiKey && this.apiKey.trim().length > 0;

        // Show/hide file info
        this.fileInfo.style.display = hasFile ? 'block' : 'none';
        if (hasFile) {
            this.fileName.textContent = this.selectedFile.name;
        }

        // Enable/disable summarize button
        this.summarizeBtn.disabled = !(hasFile && hasApiKey);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.loadingSection.style.display = 'block';
        this.resultSection.style.display = 'none';
        this.errorSection.style.display = 'none';
        this.summarizeBtn.disabled = true;
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.loadingSection.style.display = 'none';
        this.summarizeBtn.disabled = false;
        this.updateUI();
    }

    /**
     * Show summary result
     * @param {string} summary - Summary text
     */
    showSummary(summary) {
        this.summaryContent.textContent = summary;
        this.resultSection.style.display = 'block';
        this.errorSection.style.display = 'none';
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorSection.style.display = 'block';
        this.resultSection.style.display = 'none';
    }

    /**
     * Get selected file
     * @returns {File|null} Selected file
     */
    getSelectedFile() {
        return this.selectedFile;
    }

    /**
     * Get API key
     * @returns {string} API key
     */
    getApiKey() {
        return this.apiKey;
    }

    /**
     * Save API key to localStorage
     * @param {string} key - API key
     */
    saveApiKey(key) {
        if (key) {
            localStorage.setItem('gemini_api_key', key);
        } else {
            localStorage.removeItem('gemini_api_key');
        }
    }

    /**
     * Load API key from localStorage
     * @returns {string|null} API key
     */
    loadApiKey() {
        return localStorage.getItem('gemini_api_key');
    }
}


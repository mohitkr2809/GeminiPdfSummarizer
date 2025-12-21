/**
 * Main Application Module
 * Orchestrates the PDF summarization workflow
 */

import { GeminiClient } from './api/gemini.js';
import { FileHandler } from './utils/fileHandler.js';
import { UploadUI } from './ui/uploadUI.js';

class PDFSummarizerApp {
    constructor() {
        this.ui = new UploadUI();
        this.geminiClient = null;
        this.initializeApp();
    }

    /**
     * Initialize the application
     */
    initializeApp() {
        const summarizeBtn = document.getElementById('summarizeBtn');
        summarizeBtn.addEventListener('click', () => this.handleSummarize());
    }

    /**
     * Handle summarize button click
     */
    async handleSummarize() {
        const file = this.ui.getSelectedFile();
        const apiKey = this.ui.getApiKey();

        if (!file || !apiKey) {
            this.ui.showError('Please select a PDF file and enter your API key');
            return;
        }

        // Validate file
        if (!FileHandler.isValidPDF(file)) {
            this.ui.showError('Please select a valid PDF file');
            return;
        }

        if (!FileHandler.isValidFileSize(file)) {
            this.ui.showError('File size exceeds 20MB limit');
            return;
        }

        try {
            this.ui.showLoading();
            this.geminiClient = new GeminiClient(apiKey);

            // Use base64 method directly (more reliable for browser-based apps)
            // This matches the documentation's inline PDF approach
            const fileData = await this.geminiClient.uploadFileBase64(file);
            const summary = await this.geminiClient.generateSummaryFromBase64(
                fileData.data,
                fileData.mimeType
            );

            this.ui.hideLoading();
            this.ui.showSummary(summary);

        } catch (error) {
            console.error('Error:', error);
            this.ui.hideLoading();
            this.ui.showError(`Error: ${error.message || 'An unexpected error occurred'}`);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFSummarizerApp();
});


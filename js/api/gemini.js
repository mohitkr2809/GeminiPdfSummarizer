/**
 * Gemini API Client Module
 * Handles all interactions with Google Gemini API
 */

export class GeminiClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    }

    /**
     * Upload a PDF file to Gemini using Files API
     * @param {File} file - The PDF file to upload
     * @returns {Promise<Object>} File upload response with name and URI
     */
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        
        // Create metadata blob
        const metadata = {
            displayName: file.name
        };
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

        console.log('Uploading file:', file.name, 'Size:', file.size);
        
        const response = await fetch(
            `${this.baseUrl}/files?key=${this.apiKey}`,
            {
                method: 'POST',
                body: formData
            }
        );

        const responseText = await response.text();
        console.log('Response status:', response.status);
        console.log('Response text:', responseText);

        if (!response.ok) {
            let error;
            try {
                error = JSON.parse(responseText);
            } catch {
                throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
            }
            throw new Error(error.error?.message || `Failed to upload file: ${response.status}`);
        }

        // Handle empty response - might indicate CORS or API issue
        if (!responseText || responseText.trim() === '' || responseText === '{}') {
            console.warn('Empty response received. This might indicate a CORS issue or API format problem.');
            // Try alternative approach with base64
            throw new Error('File upload returned empty response. Trying alternative method...');
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Invalid JSON response: ${responseText}`);
        }

        console.log('Upload result:', result);
        return result;
    }

    /**
     * Upload file using base64 encoding (alternative method)
     * @param {File} file - The PDF file to upload
     * @returns {Promise<Object>} File data with base64 content
     */
    async uploadFileBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve({
                    name: file.name,
                    mimeType: file.type,
                    data: base64
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Get file status
     * @param {string} fileName - The file name from upload response
     * @returns {Promise<Object>} File status information
     */
    async getFileStatus(fileName) {
        // Ensure fileName starts with 'files/'
        const filePath = fileName.startsWith('files/') ? fileName : `files/${fileName}`;
        
        const response = await fetch(
            `${this.baseUrl}/${filePath}?key=${this.apiKey}`,
            {
                method: 'GET'
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to get file status: ${response.status} ${response.statusText}`);
            }
            throw new Error(error.error?.message || 'Failed to get file status');
        }

        return await response.json();
    }

    /**
     * Wait for file to be processed
     * @param {string} fileName - The file name to check
     * @param {Function} onStatusUpdate - Callback for status updates
     * @returns {Promise<Object>} Processed file information
     */
    async waitForFileProcessing(fileName, onStatusUpdate = null) {
        let fileStatus = await this.getFileStatus(fileName);
        
        // Handle different response structures
        const getState = (status) => status.state || status.file?.state;
        
        while (getState(fileStatus) === 'PROCESSING') {
            const currentState = getState(fileStatus);
            if (onStatusUpdate) {
                onStatusUpdate(currentState);
            }
            
            await new Promise(resolve => setTimeout(resolve, 5000));
            fileStatus = await this.getFileStatus(fileName);
        }

        if (getState(fileStatus) === 'FAILED') {
            throw new Error('File processing failed');
        }

        return fileStatus;
    }

    /**
     * Generate content summary using Gemini with file URI
     * @param {string} fileUri - The URI of the uploaded file
     * @param {string} mimeType - MIME type of the file
     * @returns {Promise<string>} Generated summary text
     */
    async generateSummary(fileUri, mimeType) {
        const requestBody = {
            contents: [{
                parts: [
                    { text: 'Summarize this document' },
                    {
                        fileData: {
                            fileUri: fileUri,
                            mimeType: mimeType
                        }
                    }
                ]
            }]
        };

        const response = await fetch(
            `${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to generate summary');
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates[0] && result.candidates[0].content) {
            const textParts = result.candidates[0].content.parts
                .filter(part => part.text)
                .map(part => part.text);
            return textParts.join('\n');
        }

        throw new Error('No summary generated');
    }

    /**
     * Generate content summary using Gemini with base64 file data (alternative method)
     * @param {string} base64Data - Base64 encoded file data
     * @param {string} mimeType - MIME type of the file
     * @returns {Promise<string>} Generated summary text
     */
    async generateSummaryFromBase64(base64Data, mimeType) {
        const requestBody = {
            contents: [{
                parts: [
                    { text: 'Summarize this document' },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    }
                ]
            }]
        };

        const response = await fetch(
            `${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to generate summary: ${response.status} ${response.statusText}`);
            }
            throw new Error(error.error?.message || 'Failed to generate summary');
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates[0] && result.candidates[0].content) {
            const textParts = result.candidates[0].content.parts
                .filter(part => part.text)
                .map(part => part.text);
            return textParts.join('\n');
        }

        throw new Error('No summary generated');
    }
}


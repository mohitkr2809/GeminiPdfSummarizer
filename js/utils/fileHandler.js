/**
 * File Handler Utility Module
 * Handles file operations and validation
 */

export class FileHandler {
    /**
     * Validate if file is a PDF
     * @param {File} file - File to validate
     * @returns {boolean} True if valid PDF
     */
    static isValidPDF(file) {
        return file && file.type === 'application/pdf';
    }

    /**
     * Get file size in human-readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Convert File to base64 (if needed for alternative approach)
     * @param {File} file - File to convert
     * @returns {Promise<string>} Base64 string
     */
    static async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Validate file size (max 20MB for Gemini API)
     * @param {File} file - File to validate
     * @param {number} maxSizeMB - Maximum size in MB
     * @returns {boolean} True if file size is valid
     */
    static isValidFileSize(file, maxSizeMB = 20) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    }
}


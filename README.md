# PDF Summarizer - AI-Powered Document Summarization

A modern, elegant web application that transforms lengthy PDF documents into concise, intelligent summaries using Google's Gemini AI.

![PDF Summarizer](https://img.shields.io/badge/AI-Gemini-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Drag & Drop Upload** - Intuitive file upload with drag-and-drop support
- **AI-Powered Summarization** - Leverages Google Gemini AI for intelligent document analysis
- **Beautiful UI** - Modern, animated interface with glassmorphism effects
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Secure** - API keys stored locally in browser, never sent to external servers
- **Real-time Processing** - Live loading indicators during PDF analysis
- **Copy to Clipboard** - Easy one-click summary copying
- **File Management** - Preview uploaded files with size information and remove option

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdf-summarizer.git
   cd pdf-summarizer
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Access the app**
   - Navigate to `http://localhost:8000` (or simply open `index.html`)

## 📖 Usage

1. **Upload PDF**
   - Drag and drop a PDF file onto the upload area, or
   - Click the upload area to browse and select a file
   - Supported file size: up to 20MB

2. **Enter API Key**
   - Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Paste the API key in the secure input field
   - Toggle visibility using the eye icon if needed

3. **Generate Summary**
   - Click the "Generate Summary" button
   - Wait for the AI to process your document
   - View the comprehensive summary

4. **Copy Summary**
   - Click the "Copy" button to copy the summary to clipboard
   - Use the summary in your documents, notes, or reports

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: Google Gemini API
- **PDF Processing**: PDF.js library
- **Styling**: Custom CSS with animations and glassmorphism
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
pdf-summarizer/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── js/
│   └── app.js         # Application logic and API integration
├── README.md          # Project documentation
└── .gitattributes     # Git configuration
```

## 🎨 Design Features

- **Animated Starfield Background** - Dynamic, moving star field effect
- **Glassmorphism** - Modern frosted glass card designs
- **Smooth Animations** - Fluid transitions and hover effects
- **Gradient Accents** - Beautiful color gradients throughout
- **Dark Theme** - Easy on the eyes with a modern dark interface
- **Responsive Layout** - Adapts to all screen sizes

## 🔒 Privacy & Security

- **Local Storage Only** - API keys are stored in your browser's local storage
- **No Data Collection** - No user data is collected or transmitted to third parties
- **Secure API Calls** - Direct communication with Gemini API over HTTPS
- **Client-Side Processing** - All file handling happens in your browser

## ⚙️ Configuration

### API Key Storage
The application uses browser's `localStorage` to securely store your API key:
```javascript
localStorage.setItem('geminiApiKey', 'your-api-key');
```

### Maximum File Size
Currently set to 20MB. To modify, update the validation in `app.js`:
```javascript
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
```

## 🐛 Troubleshooting

### Common Issues

**"Invalid API Key" Error**
- Verify your API key is correct
- Ensure the API key has proper permissions
- Check if the Gemini API is enabled in your Google Cloud Console

**PDF Not Loading**
- Ensure the PDF is not password-protected
- Verify the file size is under 20MB
- Check browser console for specific error messages

**Summary Not Generating**
- Check your internet connection
- Verify the PDF contains extractable text (not just images)
- Ensure you haven't exceeded API rate limits

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini AI for powerful summarization capabilities
- PDF.js for PDF processing
- Inter font family by Rasmus Andersson
- Icons inspired by Feather Icons

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🔮 Future Enhancements

- [ ] Support for multiple file formats (DOCX, TXT)
- [ ] Customizable summary length
- [ ] Multiple language support
- [ ] Export summaries to different formats
- [ ] Batch processing multiple PDFs
- [ ] Summary comparison feature
- [ ] Dark/Light theme toggle
- [ ] Progressive Web App (PWA) support

---

Made with ❤️ using Google Gemini AI

# Visivo - Multimodal AI Assistant

Visivo is an advanced AI-powered application that combines visual analysis with speech synthesis to provide an
accessible and interactive experience. The application allows users to upload images for analysis and receive detailed
descriptions with optional realistic speech audio playback and download capabilities.

## Demo : [Vercel](https://visivo.vercel.app/) | [Netlify](https://viisivo.netlify.app/)

## Features

- **Multiple Image Upload**: Users can upload up to 3 images at once.
- **Drag and Drop**: Easy image upload via drag and drop functionality.
- **File Validation**: Automatic checks for file type and size (max 20MB).
- **AI-Powered Image Analysis**: Utilizes advanced AI to analyze uploaded images.
- **Text-to-Speech Synthesis**: Converts analysis results into spoken audio.
- **Audio Playback Controls**: Users can play, pause, and seek through the audio description.
- **Audio Download**: Option to download the generated audio file for offline use.
- **User Authentication**: Secure access to features through user authentication.
- **Multi-Format File Processing**: Supports analysis of various file types, including documents, audio, video, and
  images, with tailored insights for each format.
- **Chat-Interface**: Chat with you files, either documents, music or video files.

## Project Workflow

1. **User Authentication**: Users sign in to access the application features.
2. **Image Upload**: Users can upload up to 3 images through drag-and-drop or file selection.
3. **Image Validation**: The system checks file types (JPEG, PNG, WEBP, HEIC, HEIF) and sizes (max 20MB).
4. **Image Analysis**: Uploaded images are sent to the AI service for analysis.
5. **Result Display**: Analysis results are displayed for each image.
6. **Audio Synthesis**: The system generates audio descriptions of the analysis results.
7. **Audio Interaction**: Users can listen to audio descriptions and control playback.
8. **Audio Download**: Users can download the generated audio files for offline use.

## Technologies Used

- Next.js 15.0.3 with App Router
- React 18.2.0
- Google Gemini Gemini 1.5 Flash for image analysis
- Azure Cognitive Services Speech SDK for text-to-speech
- NextAuth.js for authentication
- Framer Motion for animations
- Tailwind CSS for styling

## Prerequisites

- Node.js 18.0 or later [ [Download Node.js](https://nodejs.org/en/download/package-manager) ]
- Google Cloud Platform account with Gemini API access [ [Create API Key](https://aistudio.google.com/apikey) ]
- Azure account with Speech Services set up [ [Create API Key](https://speech.microsoft.com/portal/speechtotexttool) ]
- GitHub OAuth application (for authentication) [ [Setup OAuth](https://github.com/settings/developers) ]
- Discord Developer application (for authentication) [ [Setup OAuth](https://discord.com/developers/applications) ]

## Installation Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/exyreams/Visivo.git
   cd Visivo
2. **Install dependencies:**

   ```shellscript
   npm install
   ```


3. **Set up environment variables:**
   Create a **`.env.local`** or **`.env`** file in the root directory with the following content:
   ```plaintext
   GEMINI_API_KEY=your_gemini_api_key
   AZURE_SPEECH_KEY=your_azure_speech_key
   AZURE_SPEECH_REGION=your_azure_speech_region
   GITHUB_ID=your_github_oauth_client_id
   GITHUB_SECRET=your_github_oauth_client_secret
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
    - **`GEMINI_API_KEY`**: Create an Api key from [AI Studio](https://aistudio.google.com/apikey).
    - **`AZURE Speech Keys`** :
      Create New application from [Speech](https://speech.microsoft.com/portal/speechtotexttool)    .
        - **`AZURE_SPEECH_KEY`**: Use your Resource key here.
        - **`AZURE_SPEECH_REGION`**: Use the region that you selected while creating application.
    - **`GITHUB`**    : Create new from [OAuth application](https://github.com/settings/developers) & use ID & Secret.
    - **`DISCORD`** : Create new application from [here](https://discord.com/developers/applications), once application
      is created go to Oauth2 use those credentials.
    - **`NEXTAUTH_SECRET`**: Generate new key by running following command in your terminal.
      ```shellscript
      openssl rand -base64 32
      ```
4. **Set up authentication providers:**
    - **For using Locally:**
        - Create a GitHub OAuth application and add the callback URL: `http://localhost:3000/api/auth/callback/github`
        - Create a Discord application and add the callback URL: `http://localhost:3000/api/auth/callback/discord`
    - **For using in own URL:**
        - Create a GitHub OAuth application and add the callback URL: `http://`**your-custom-url**
          `/api/auth/callback/github`
        - Create a Discord application and add the callback URL: `http://`**your-custom-url**
          `/api/auth/callback/discord`

5. **Start the development server:**
   ```shellscript
   npm run dev
       // or
   npx next dev
   ```

6. Open `http://localhost:3000` in your browser to view the application.

## Usage

1. Sign in using GitHub or Discord authentication.
2. Upload images by dragging and dropping or clicking the upload area.
3. Click "Analyze Images" to process the uploaded image(s).
4. View the analysis results for each image.
5. Use the audio controls to play, pause, or seek through the audio description.
6. Click the download button to save the audio file to your device.

## API Routes

- `/api/analyze`: Handles image analysis using Google Gemini AI and text-to-speech conversion using Azure Speech
  Services.
- `/api/auth/[...nextauth]`: Handles authentication using NextAuth.js.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Cloud Platform for Gemini AI services
- Microsoft Azure for Speech Services
- Next.js team for the amazing framework
- All contributors and users of the application
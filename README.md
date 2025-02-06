
1. Set Up Your Environment:

1. Download and install Node.js.
2.  Download and install an IDE like Visual Studio Code.
3. Download the code from this GitHub repository:
hps://github.com/rihanamsaddek/ai-assistant-chatbot (Click "Code" >
"Download ZIP").
4. Unzip the downloaded folder to your desired development directory.
5. Obtain an API key from hps://aistudio.google.com/ and store it securely.

2. Configure the Chatbot:
1. Open the code folder in your IDE.
2. Create a new le named .env in the root of your project directory.
3. Add the following line to the .env le, replacing "Paste API Key here" with your
actual API key: API_KEY="Paste API Key here"

3. Run the Chatbot:
1. Open your IDE's terminal.
2. Navigate to your project directory.
3. Run the command npm install to install the necessary dependencies.
4. Run the command node server.js to start the chatbot server.
5. Open a web browser and go to hp://localhost:3000/ to access the chatbot.

4. Customize the Chatbot : To improve or customize the chatbot's responses, modify
the prompt within the history and role sections of the server.js le. Save the changes
and restart the server using node server.js to see the eects.

## Installation
1. Install Nodejs if not installed already : https://nodejs.org/en/download/package-manager | prebuilt installer : https://nodejs.org/en/download/prebuilt-installer
2. create .env file and add your API key as:
     API_KEY="Paste API Key here"

   If you don't have an API Key yet, follow these instructions :
   Visit : https://aistudio.google.com/
   Click on Get API Key
   Click on Create API key
   Generate an API key
   
4. run node server.js

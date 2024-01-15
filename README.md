## Real Time Chat App Using React and Twilio Programmable Chat Api

In this repository, you will learn how to build chat app using react and twilio programmable chat api

## Prerequisites

- Node.js
- JavaScript package manager of your choice; npm or yarn
- Twilio Account

## Getting Started

First, create .env file in the backend (i.e., sdk-starter-node folder) at root level and add below enviroment varibles using your twilio account credentials.

```
  - TWILIO_ACCOUNT_SID=
  - TWILIO_API_KEY=
  - TWILIO_API_SECRET=
  - TWILIO_CHAT_SERVICE_SID=
  - TWILIO_Auth_Token=
  - PORT=5000
  
```

Now, create .env file in the frontend (i.e., twilio-chat-app folder) at root level and add below enviroment varibles using your twilio account credentials.

```
  - VITE_APP_TokenUrl=(add link if you have deploy your backend to any hosting website)
  - VITE_APP_NODE_ENV=production(if you have deploy your backend to any hosting website) / development(if backend is running at localhost)
```

## List of all packages used in the project with their usage

  ### Dependencies

   - "@mui/icons-material": "^5.15.2",
   - "@mui/material": "^5.15.2",
   - "axios": "^1.6.3",
   - "react-router-dom": "^6.21.1",
   - "twilio-chat": "^6.0.0",
   - "cors": "^2.8.5",
   - "dotenv": "^10.0.0",
   - "express": "^4.17.1",
   - "extend": "^3.0.2",
   - "nodemon": "^3.0.2",
   - "pug": "^3.0.2",
   - "twilio": "^3.66.0"

Go the sdk-starter-node folder, Install all the dependencies and then start the server.

- For installing dependencies

```
  - yarn add
    # or
  - npm install
```

- For Starting server

```
  - yarn start
    # or
  - npm start
```

Now go the Twilio-chat-app folder, Install all the dependencies and then start the server.

- For installing dependencies

```
  - yarn add
    # or
  - npm install
```

- For Starting server

```
  - yarn dev
    # or
  - npm run dev
```

## Output:

[Screencast from 15-01-24 10:59:03 AM IST.webm](https://github.com/mdkamran25/Twilio-Real-Time-Chat-App/assets/75973307/7412a6c6-c481-4309-ba72-11f191929ad6)

### Check Live:

<a href="https://twilio-chat-app.netlify.app/">Twilio Chat App</a>

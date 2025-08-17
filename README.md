# Virtual Assistant

## Features

## Setup Instructions
we have backend and frontend, 
cd in to your backend and npm these packages to install
npm init
npm i express mongoose dotenv nodemon jsonwebtoken bcryptjs cookie-parser cloudinary multer cors 
now go to your package.json and update your script as:
"scripts": {
    "dev": "nodemon index.js"
  }, 
  and add a line: "type": "module", 

  To connect mongodb: go to mongodb> sign in or signup> view all projects> create a new project> enter the name of your project> click on "next"> and click on "create project"> now go to your project overview and click on "+ create" in your cluster> deploy your cluster within free and click on "create deployment" > youll now see a popup connect to cluster0> enter password for your database if needed to access later> click on "choose a connection method" > access your data through tools under it select "mongodb for vscode" if you are working on vscode. youll now see a url generated to connect to your mongodb database, copy that link>come to your backend folders ".env" file and write MONGODB_URL=url/virtualassistant; if you get an error, try MONGODB_URL="url/virtualassistant"; 
  now on your mongodb> security> network access> delete the ip address showing and create a new one> click on "allow access from anywhere" and then confirm. now you are good to go :)
  





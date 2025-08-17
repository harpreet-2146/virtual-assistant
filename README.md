# Virtual Assistant

## Features

## Setup Instructions
The project is split into two parts: the backend and the frontend. Follow these steps to set up each one.

###**1. Backend Setup** 
Navigate into the backend directory.

**cd backend**

Initialize a new Node.js project and install the necessary packages.

**npm init -y
npm i express mongoose dotenv nodemon jsonwebtoken bcryptjs cookie-parser cloudinary multer cors**

Open the package.json file and update the scripts section and add the type field.

**"scripts": {
  "dev": "nodemon index.js"
},
"type": "module"**

**2. MongoDB Connection**
To connect your backend to the database, follow these steps:

Go to your MongoDB Atlas account, sign in or sign up, and create a new project.

Inside your project, create a new cluster (select the free tier).

Once the cluster is deployed, click Connect.

Choose "Connect your application" and copy the generated URL.

In your backend folder, create a .env file and add your MongoDB URL to it.

**MONGODB_URL=url/virtualassistant;**
*If you get an error, try putting quotes around the URL: **MONGODB_URL="url/virtualassistant";**

Next, go to Security > Network Access in MongoDB Atlas.

Delete any existing IP addresses.

Add a new IP address, select "Allow Access from Anywhere", and click Confirm. You're now good to go!
  





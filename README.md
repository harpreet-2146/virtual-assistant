# Virtual Assistant

## Features

## Setup Instructions
The project is split into two parts: the backend and the frontend. Follow these steps to set up each one.

### Backend Setup

Navigate into the backend directory.

**cd backend**

Initialize a new Node.js project and install the necessary packages.

`npm init -y
<br>npm i express mongoose dotenv nodemon jsonwebtoken bcryptjs cookie-parser cloudinary multer cors`

Open the `package.json` file and update the `scripts` section and add the `type` field.

`"scripts": {
  "dev": "nodemon index.js"
}, <br>
"type": "module"`

2. MongoDB Connection
To connect your backend to the database, follow these steps:

Go to your MongoDB Atlas account, sign in or sign up, and create a new project.

Inside your project, create a new cluster (select the free tier).

Once the cluster is deployed, click Connect.

Choose "Connect your application" and copy the generated URL.

In your backend folder, create a .env file and add your MongoDB URL to it.

`MONGODB_URL=url/virtualassistant;`
*If you get an error, try putting quotes around the URL: **MONGODB_URL="url/virtualassistant";**

Next, go to Security > Network Access in MongoDB Atlas.

Delete any existing IP addresses.

Add a new IP address, select "Allow Access from Anywhere", and click Confirm. You're now good to go!

Cloudinary setup:

go to https://cloudinary.com/users/register_free
setup your account
go to api keys> generate new api key
you can change the key name if you want.
its clearly mentioned api key, api secret and cloud name
the data given you need to put that up in your `.env` file
``CLOUDINARY_CLOUD_NAME="cloud_name"
CLOUDINARY_API_KEY="api_key"
CLOUDINARY_API_SECRET="api_secret"``

### Frontend Setup

Open a new powershell and `cd frontend`

Here you need to install the following packages:
 `npm create vite@latest`

For your project name just put a `.` your framework is `react` and your variant is `javascript`. 
and then:
`npm i`

Now for installing tailwindcss we are using the steps mentioned at https://tailwindcss.com/docs/installation/using-vite 
 `npm install tailwindcss @tailwindcss/vite`

 update your vite.config.js:
 ```import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})```

Next install:
 `npm i react-router-dom react-icons axios`

 WE ARE SO BACK

 

 






   





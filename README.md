
Cloning and Forking a Next.js GitHub Admin Panel for Another Client:



🪐 //RUNNING THE SAME PROJECT LOCALY:  Clone the Next.js Admin Panel Repository

💎 Go to the GitHub repository of the Next.js admin panel you want to clone.
💎 Click on the "Code" button and copy the HTTPS or SSH URL of the repository.
💎 Open your terminal or command prompt.
💎 Navigate to the directory where you want to clone the repository.
💎 Use the git clone command followed by the repository URL to clone it locally. For example:
bash
Copy code
git clone https://github.com/username/admin-panel.git


🪐//OR FORK THE PROJECT TO CREATE A CLONE OF THE INITIAL PROJECT IF YOU WANT TO TAKE IT INTO ANOTHER DIRECTION OR FOR ANOTHER CLIENT
:: Forking the Repository for Another Client

💎 Go to your GitHub account and navigate to the cloned repository.
💎 Click on the "Fork" button in the upper right corner.
💎 Choose the account or organization where you want to fork the repository.
💎 Once forked, you will have a new repository under your account.


🪐 Setting Up Environment Variables ALWAYS

💎 In the root directory of the cloned repository, create a file named .env.local.
Add the following environment variables with their respective values:

💎 NEXTAUTH_URL=""
💎 NEXTAUTH_SECRET=""
💎 MONGO_URI=""
You can use any mongoDB database you want, create a new one or find the credentials for the existing one.
💎 JWT_SECRET=""s


Step 4: Running the Project Locally

💎 Ensure you have Node.js and npm installed on your system.
💎 Open your terminal or command prompt.
💎 Navigate to the directory of the cloned repository.
💎 Run npm install to install project dependencies.
💎 Run npm run dev to start the development server.
Open your web browser and go to http://localhost:3000 to view the admin panel.

🪐 Deploying a Next.js Project on Contabo:


Unfortunately, Contabo's specific deployment process may vary, but here's a general guide:
Prepare your Next.js application for deployment:

💎https://dev.to/igorfilippov3/deploy-nextjs-to-contabo-vps-56f7
I do not quite remember if this was the exact tutorial I used to deploy it to Contabo. But the process was pretty straightfoward if done correctly.
This is an already deployed project so you can further look into it. For more information about deployment contact Mr Chris.

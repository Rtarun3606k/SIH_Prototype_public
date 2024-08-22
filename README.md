8write a readm e for activitating the backend and front end elobrately and add commands for all plartform and format it# Activating Backend and Frontend
Here is the updated markdown content:

To activate the backend and frontend of the project, follow the steps below:

## Backend Activation

1. Install Git on your system. You can download it from the official website or use a package manager like Homebrew (for macOS) or apt-get (for Ubuntu).
2. Clone the repository using the following command:
   ```
   git clone <link>
   ```
   Replace `<link>` with the actual URL of the repository.
3. Navigate to the backend directory:
   ```
   cd backend
   ```
4. Install virtualenv and activate the environment. Virtualenv allows you to create isolated Python environments for your projects. To install virtualenv, run the following command:
   ```
   pip install virtualenv
   ```
   Once installed, create a new virtual environment:
   ```
   virtualenv env
   ```
   Activate the environment:
   - For Windows:
     ```
     .\env\Scripts\activate
     ```
   - For macOS/Linux:
     ```
     source env/bin/activate
     ```
5. Install the required dependencies. Make sure you are in the `backend` directory and the virtual environment is activated. Run the following command:
   ```
   pip install -r requirements.txt
   ```
   This will install all the necessary Python packages specified in the `requirements.txt` file.
6. Run the application. Ensure you are still in the `backend` directory and the virtual environment is active. Execute the following command:
   ```
   python wsgi.py
   ```

## Frontend Activation

The frontend of the application is built with React. To activate the frontend, follow these steps:

1. Open a terminal window.
2. Navigate to the frontend directory using the command `cd prototype/frontend`.
3. Install the required dependencies by running `npm install`.
4. Start the frontend development server with the command `npm run dev`.

## Platform-Specific Commands

### Windows

- Frontend Activation:
  - Navigate to the frontend directory: `cd prototype/frontend`
  - Install dependencies: `npm install`
  - Start the frontend development server: `npm run dev`

### macOS/Linux

- Frontend Activation:
  - Navigate to the frontend directory: `cd prototype/frontend`
  - Install dependencies: `npm install`
  - Start the frontend development server: `npm start`

Remember to activate the backend before starting the frontend to ensure proper functionality.

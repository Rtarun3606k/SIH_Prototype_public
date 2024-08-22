<!-- Guide on how to strat the app-->

Here are the detailed steps to set up the backend of the application:

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

   This will start the backend application.

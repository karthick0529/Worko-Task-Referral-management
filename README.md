# Candidate Referral Management System

## Features Implemented

1. User Authentication:

      Secure user registration and login.
        
      Token-based authentication using localStorage for session management.
        
      Logout functionality for clearing user data.

2. Candidate Referral Management:

      Refer a Candidate: Form to submit candidate details such as name, email, job title, and resume.
        
      Dashboard: Displays a list of referred candidates, searchable and filterable by job title or status.
        
      Candidate Status Updates: Allows updating the status of candidates (e.g., Pending, Reviewed, Hired).

3. Search Functionality:

      Dynamic filtering of candidates based on job title or status.
        
      Real-time updates as users type in the search bar.

4. Statistics Overview:

      Displays total candidates referred.
        
      Shows a breakdown of candidates by status (e.g., Pending, Reviewed, Hired).

5. Responsive Design:

      Fully responsive UI ensuring usability on desktops, tablets, and mobile devices using CSS media queries.

## Steps to Run the Project Locally

### Prerequisites:

  Ensure Node.js and npm (or yarn) are installed on your system.
  
  Install a code editor like Visual Studio Code.

### Instructions:

  Clone the Repository:
    
    git clone <repository-url>
    cd <repository-folder>
    
  Install Dependencies:
    
    npm install

### Set Up Backend:

  Ensure the backend API is running (if using a separate service).
  
  If backend code is included, navigate to the backend directory and follow its setup instructions.
  
  Update the API URL in the frontend (e.g., axios calls) to match your local backend URL.

  Start the Project:

    npm run dev

  This starts the project on a local development server, typically accessible at http://localhost:5173.

## Access the Application:

  Open your browser and navigate to the URL shown in the terminal (http://localhost:5173).

## Assumptions or Limitations

### Assumptions:

  Users are authenticated using a token stored in localStorage.
  
  The backend API is running and accessible at the specified URL.
  
  Each candidate has a unique identifier (_id) for status updates.

### Limitations:

  No server-side validation for user input (relies on backend for validation).
  
  Limited scalability for large datasets due to client-side search and filtering.
  
  No role-based access control (e.g., admin vs. standard user permissions).

# Live Demo

  Backend: https://worko-task-referral-management.onrender.com
  
  Frontend: https://dazzling-daffodil-78755a.netlify.app/

## Sample Credentials:

  Email: karthi@guvi.com
  
  Password: Test@123

# Hospital Management System

This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to manage hospital workflows including user management, doctor approvals, and appointment scheduling with role-based access control.

---

## Overview

The system supports three types of users:
- Admin
- Doctor
- Patient

Each role has specific permissions and functionalities implemented using JWT-based authentication and middleware for route protection.

---

## Features

### Authentication and Authorization
- Secure user registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control

### Admin Functionalities
- View all users and doctors
- Approve or reject doctor applications
- Delete users
- Manage all appointments
- Mark appointments as completed

### Doctor Functionalities
- Apply for doctor role
- View assigned appointments
- Update appointment status (completed / not completed)

### Patient Functionalities
- Register and login
- View approved doctors
- Book appointments
- Track appointment status

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcryptjs

---

## Project Structure

DoctorAppointment-master/
│
├── client/ # Frontend (React)
│
├── server/ # Backend (Node + Express)
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── models/ # Database schemas
│ └── middleware/ # Authentication middleware
│
└── README.md

---

## Workflow

1. User registers with a specific role (Patient or Doctor)
2. Doctor applies for approval
3. Admin reviews and approves/rejects doctor
4. Patient views doctors and books appointment
5. Doctor and Admin manage appointment status
6. Admin has full control over users and system

---

## API Endpoints

### User
- POST /api/user/register
- POST /api/user/login
- GET /api/user/getallusers
- GET /api/user/getuser/:id

### Doctor
- GET /api/doctor/getalldoctors
- POST /api/doctor/applyfordoctor

### Appointment
- POST /api/appointment/bookappointment
- GET /api/appointment/getallappointments

---

## Installation

### Clone Repository
git clone https://github.com/sagarvirmaniii/HospitalManagementSystem.git

### Install Dependencies

Backend:
cd server
npm install

Frontend:
cd client
npm install

---

## Environment Variables

Create a .env file inside the server folder:

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

## Run Project

Start backend:
cd server
npm start

Start frontend:
cd client
npm start

---

## Future Enhancements

- Online video consultation
- Payment integration
- Real-time notifications
- Admin analytics dashboard

---

## License

This project is developed for educational purposes.

---

## Repository

https://github.com/sagarvirmaniii/HospitalManagementSystem

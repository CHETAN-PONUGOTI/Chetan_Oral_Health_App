# OralVis Healthcare - Dental Scan Management System 🦷

OralVis Healthcare is a full-stack web application designed to streamline the workflow between dental technicians and dentists. This application provides a secure, role-based platform where technicians can upload patient dental scans, and dentists can view these scans, access patient details, and generate downloadable PDF reports.

---

### ## Problem Statement

In many dental clinics, the process of transferring patient scans from a technician to a dentist involves manual steps, such as using shared drives or physical media. This can lead to delays, version control issues, and potential data security risks. OralVis Healthcare solves this by creating a centralized, secure web portal that digitizes and simplifies this entire workflow, ensuring that dentists have immediate access to the latest patient scans in an organized manner.

---

### ## Live Demo

* **Frontend Application:** `https://chetan-oral-health-app.vercel.app/login`
* **Backend API:** `https://oralvis-backend-ne0x.onrender.com`

---

### ## Key Features

* **Role-Based Authentication:** Secure login for two distinct user roles: Technician and Dentist.
* **JWT Sessions:** User sessions are managed securely using JSON Web Tokens.
* **Cloud Image Uploads:** Technicians can upload patient scan images, which are stored securely on Cloudinary.
* **Dynamic Scan Viewer:** Dentists have a dedicated dashboard to view all uploaded scans in a clean, grid-based layout.
* **PDF Report Generation:** Dentists can generate and download a PDF report for any scan, which includes patient details and the scan image.

---

### ## Technology Stack

| Category         | Technology                                                              |
| :--------------- | :---------------------------------------------------------------------- |
| **Frontend** | React (Vite), React Router, Axios, jsPDF, jwt-decode                    |
| **Backend** | Node.js, Express.js                                                     |
| **Database** | SQLite                                                                  |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js                                        |
| **File Storage** | Cloudinary                                                              |
| **Deployment** | Vercel (Frontend), Render (Backend with Persistent Storage for SQLite) |

---

### ## Screenshots


*Login page for user authentication.*


*Technician's:
  emai : tech@oralvis.com
  password: password123


*Dentist's:
  emai : dentist@oralvis.com
  password: password123

---

### ## Local Development Setup

To run this project on your local machine, follow these steps.

#### **Prerequisites**
* Node.js (v18 or later)
* Git
* A free [Cloudinary](https://cloudinary.com/) account

## Future Improvements 🚀

While the core functionality of OralVis Healthcare is complete, there are several features that could be added to enhance the application further:

#### **Frontend & User Experience**
* **Search & Filtering:** Implement a search bar on the Dentist Dashboard to find scans by patient name or ID. Add filters to sort scans by date or scan type.
* **Pagination:** If the number of scans becomes very large, add pagination to the Dentist Dashboard to improve performance and usability.
* **Real-time Notifications:** Use WebSockets (e.g., with Socket.IO) to notify dentists in real-time when a new scan has been uploaded, eliminating the need to refresh the page.
* **Image Viewer Modal:** Instead of opening the full image in a new tab, implement an in-app modal for a more seamless viewing experience, potentially with zoom and pan capabilities.
* **Enhanced UI Feedback:** Add more detailed loading states (like skeleton loaders) and more specific user-friendly error messages.

---
#### **Backend & API**
* **API Validation:** Add server-side validation for all incoming data (e.g., using libraries like `Joi` or `express-validator`) to ensure data integrity and security.
* **Scan-to-Technician Association:** Modify the `scans` table to include a `technicianId` foreign key, linking each scan to the technician who uploaded it.
* **User Management:** Create an "Admin" role with a dashboard to add, edit, or remove technician and dentist accounts through the UI, rather than modifying the database script.

---
#### **Database & Security**
* **Database Migration:** For a production environment, migrate from SQLite to a more robust database like **PostgreSQL**. This would improve scalability and concurrent access. Render offers free-tier PostgreSQL instances that can be easily integrated.
* **Password Reset:** Implement a "Forgot Password" feature that securely sends a password reset link to the user's email address.
* **Refresh Tokens:** Enhance the JWT authentication system by implementing refresh tokens to provide longer, more secure user sessions without requiring frequent logins.

---
#### **Testing**
* **Unit & Integration Tests:** Write automated tests for the backend API endpoints using a framework like **Jest** and **Supertest** to ensure reliability.
* **Frontend Component Tests:** Add tests for the React components using **Vitest** and **React Testing Library** to verify UI behavior and prevent regressions.

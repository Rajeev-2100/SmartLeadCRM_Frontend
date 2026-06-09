# 🚀 CRM Frontend Dashboard

![React](https://img.shields.io/badge/React-19-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
![MongoDB](https://img.shields.io/badge/MongoDB-green)
![Express](https://img.shields.io/badge/Express-black)
![Node.js](https://img.shields.io/badge/Node.js-green)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

A modern Customer Relationship Management (CRM) dashboard built with React.js for managing sales leads, agents, comments, and reports. The application integrates with a RESTful backend API and provides a responsive interface for tracking the entire sales pipeline.

---

## 🌐 Live Demo

### Frontend

https://major-project-frontend1.vercel.app/

### Backend API

https://crm-backend-tawny.vercel.app

---

## 🔗 Repository

### Frontend Repository

https://github.com/Rajeev-2100/CRM_Frontend

### Backend Repository

https://github.com/Rajeev-2100/CRM_Backend

---

## 📌 Features

### 📊 Dashboard

* Overview of all leads
* Lead status summary
* Quick lead filtering
* Navigation to all CRM modules

### 📋 Lead Management

* View all leads
* Create new leads
* Update existing leads
* Delete leads
* View lead details
* Assign leads to sales agents
* Manage lead priorities
* Track estimated time to close

### 💬 Lead Comments

* Add comments to leads
* View comment history
* Select comment author
* Display comment timestamps

### 👨‍💼 Sales Agent Management

* View all sales agents
* Add new sales agents
* Delete sales agents
* View leads assigned to agents

### 🔍 Advanced Filtering

Filter leads by:

* Status
* Priority
* Assigned Agent
* Time To Close

### 📈 Reports & Analytics

* Lead Status Distribution
* Closed Lead Analytics
* Lead Distribution Charts
* Sales Agent Performance Visualization

### ⚙️ Settings

* Manage sales agents
* Manage lead records
* Delete agents
* Delete leads

### 📱 Responsive Design

* Mobile-friendly layout
* Tablet support
* Desktop optimized
* Bootstrap 5 components

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API
* Bootstrap 5
* JavaScript (ES6+)
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Deployment

* Vercel

---

## 📂 Project Structure

```bash
src
│
├── components
│   ├── Header
│   └── Footer
│
├── context
│   ├── LeadContext.jsx
│   └── AgentsContext.jsx
│
├── pages
│   ├── Leads.jsx
│   ├── LeadManagement.jsx
│   ├── AddLeadForm.jsx
│   ├── EditedManagement.jsx
│   ├── AgentsList.jsx
│   ├── AddNewAgents.jsx
│   ├── LeadStatusView.jsx
│   ├── Reports.jsx
│   └── Setting.jsx
│
├── Chart
│   ├── PieChart.jsx
│   ├── PieChart1.jsx
│   ├── PieChart2.jsx
│   └── VerticalChart.jsx
│
├── useFetch.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Rajeev-2100/CRM_Frontend.git
cd CRM_Frontend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:5173
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://crm-backend-tawny.vercel.app
```

Example Usage:

```javascript
fetch(`https://crm-backend-tawny.vercel.app)/leads`)
```

---

## 🔗 API Endpoints Used

### Agents

```http
GET    /agents
POST   /agents
DELETE /agents/:salesPerson
```

### Leads

```http
GET    /leads
POST   /leads
PUT    /leads/:leadId
DELETE /leads/:leadId
GET    /leads/status-count
GET    /leads/:status
```

### Comments

```http
GET    /leads/:leadId/comments
POST   /leads/:leadId/comments
```

### Reports

```http
GET /report/last-week
GET /report/pipeline
```

---

## 🧠 State Management

The application uses React Context API.

### LeadContext

Handles:

* Lead Data
* Lead Creation
* Lead Updates
* Lead Deletion
* Lead Status Counts
* Dynamic Filters

### AgentsContext

Handles:

* Agent Data
* Agent Creation
* Agent Deletion
* Agent Form State

---

## 📸 Application Screenshots

### Dashboard

<img width="1920" height="1020" alt="Dashboard" src="https://github.com/user-attachments/assets/068b2a54-280b-442e-ab5a-3b09b0df1460" />

<img width="1920" height="1020" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/ec570ead-38ca-4164-a0a6-6f600d9c2534" />

---

### Leads

<img width="1920" height="1020" alt="Leads" src="https://github.com/user-attachments/assets/47503628-3f32-4b4f-9f23-6378f59bf240" />

---

### Lead Details

<img width="1920" height="1020" alt="Lead Details" src="https://github.com/user-attachments/assets/34d42644-6354-475e-8e61-d6954e41f8fe" />

<img width="1920" height="1020" alt="Comments" src="https://github.com/user-attachments/assets/07633900-9b20-4350-b3b6-a5f09055d3ef" />

---

### Add Lead

<img width="1920" height="1020" alt="Add Lead" src="https://github.com/user-attachments/assets/7356642e-6fad-4010-b3a3-81739eed9868" />

---

### Edit Lead

<img width="1920" height="1020" alt="Edit Lead" src="https://github.com/user-attachments/assets/93f5a794-69c2-4a0a-a617-a891130bc2a8" />

---

### Agents

<img width="1920" height="1020" alt="Agents" src="https://github.com/user-attachments/assets/a12c0ce5-8e50-438e-afee-a2f36fa0fc46" />

---

### Add Agent

<img width="1920" height="1020" alt="Add Agent" src="https://github.com/user-attachments/assets/b65ca109-c020-4351-a864-b97c1e3b6779" />

---

### Sales View

<img width="1920" height="1020" alt="Sales View" src="https://github.com/user-attachments/assets/509d5bfb-5ea2-4d6d-9693-e3d601000d0d" />

---

### Reports Dashboard

<img width="1920" height="1020" alt="Reports Dashboard" src="https://github.com/user-attachments/assets/8a8f8f87-064e-43be-9b6e-9b6d38a2b9a1" />

---

### Settings

<img width="1920" height="1020" alt="Settings" src="https://github.com/user-attachments/assets/dab5806e-9076-48ae-b5ca-45733a557c64" />

---

## 📊 Available Lead Statuses

* New
* Contacted
* Qualified
* Proposal Sent
* Closed

---

## 🎯 Lead Priorities

* High
* Medium
* Low

---

## 🚀 Key Functionalities

✅ Create Leads

✅ Update Leads

✅ Delete Leads

✅ Manage Sales Agents

✅ Lead Status Tracking

✅ Comment System

✅ Reporting Dashboard

✅ Dynamic Filtering

✅ Responsive Design

✅ REST API Integration

---

## 📚 What I Learned

* React Context API State Management
* Custom Hooks Development
* CRUD Operations
* REST API Integration
* React Router Navigation
* Data Filtering Techniques
* MongoDB Relationships
* Full Stack Application Development
* Deployment with Vercel
* Component-Based Architecture

---

## 🔮 Future Enhancements

* User Authentication
* Role-Based Access Control
* Search Functionality
* Pagination
* Export Reports (CSV/PDF)
* Real-Time Notifications
* Dark Mode
* Advanced Analytics Dashboard

---

## ⭐ Project Purpose

This project was built as part of my Full Stack Development learning journey to practice building a complete CRM application using React, Express.js, MongoDB, and REST APIs.

---

## 👨‍💻 Author

### Rajeev Rawat

Aspiring Full Stack Developer passionate about building scalable web applications using React, Node.js, Express, and MongoDB.

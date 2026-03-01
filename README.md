# 🏢 Property Management System (MERN + Supabase)

A scalable full-stack Property Management web application built using React, Node.js, Express, TypeScript, and Supabase.

This platform enables property owners to manage multiple buildings, rooms, apartment units (1BHK, 2BHK, etc.), tenants, and occupancy tracking from a centralized dashboard.

---

## 🚀 Live Demo

Frontend: _Coming Soon_  
Backend API: _Coming Soon_

---

# 📌 Problem Statement

Managing multiple rental buildings manually becomes complex as the number of tenants and rooms increases.

This system provides a structured digital solution that allows property owners to:

- Manage multiple buildings
- Track room and apartment availability
- Maintain tenant records
- Allocate tenants to units
- Monitor occupancy in real time

---

# 🏗️ System Architecture

```
Client (React + Vite)  →  Port 5173
        ↓ REST API
Server (Node + Express + TypeScript) → Port 3000
        ↓
Supabase (PostgreSQL Database)
```

### Architecture Flow

- Frontend handles UI rendering and API requests
- Backend manages routing, business logic, and validation
- Supabase stores relational property and tenant data

---

# 🛠️ Tech Stack

## 🔹 Frontend
- React.js (Vite)
- Axios
- Component-based architecture
- Responsive UI

## 🔹 Backend
- Node.js
- Express.js (TypeScript)
- RESTful API structure
- Modular folder architecture
- Environment-based configuration

## 🔹 Database
- Supabase (PostgreSQL)
- Relational data modeling
- Secure API-based access

## 🔹 Deployment
- Frontend → Netlify
- Backend → Railway
- Environment variables configured for production

---

# 📂 Project Structure

```
property-management/
│
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   └── vite.config.js
│
├── server/                    # Express Backend (TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── config/
│   │   └── index.ts
│   ├── dist/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# ✨ Core Features

## 🏢 Building Management
- Create and manage multiple buildings
- Store building name, type, and address

## 🛏️ Room Management
- Support for 1–4 occupancy rooms
- Track room capacity and availability
- Assign tenants to rooms

## 🏠 Apartment Management
- Support for 1BHK, 2BHK, etc.
- Manage unit details and availability
- Allocate tenants to apartments

## 👤 Tenant Management
- Store tenant personal information
- Track occupancy status
- Link tenants to specific units

## 📊 Availability Tracking
- Real-time vacant vs occupied tracking
- Dynamic updates on tenant allocation

---

# ⚙️ Local Development Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/property-management.git
cd property-management
```

---

## 2️⃣ Backend Setup (Runs on Port 3000)

```bash
cd server
npm install
npm run dev
```

Backend URL:

```
http://localhost:3000
```

For production build:

```bash
npm run build
npm start
```

---

## 3️⃣ Frontend Setup (Vite – Runs on Port 5173)

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret_key
```

⚠️ Do NOT commit `.env` to GitHub.

---

# 🔗 Frontend–Backend Communication

Frontend API example:

```javascript
axios.get("http://localhost:3000/api/buildings");
```

Enable CORS in backend:

```typescript
app.use(cors({
  origin: "http://localhost:5173"
}));
```

---

# 📡 Sample API Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/buildings | Fetch all buildings |
| POST | /api/buildings | Create building |
| GET | /api/rooms | Get all rooms |
| POST | /api/tenants | Add tenant |
| PUT | /api/rooms/:id | Update room occupancy |
| DELETE | /api/apartments/:id | Delete apartment |

---

# 🧠 Database Design

### Entities

- Buildings
- Rooms
- Apartments
- Tenants

### Relationships

- One Building → Many Rooms
- One Building → Many Apartments
- One Room → Multiple Tenants (based on capacity)
- One Apartment → Multiple Tenants

Database handled via Supabase (PostgreSQL).

---

# 🚀 Deployment

## Backend (Railway)

- Root directory: `/server`
- Build command: `npm run build`
- Start command: `npm start`
- Environment variables added in Railway dashboard

## Frontend (Netlify)

- Base directory: `/client`
- Build command: `npm run build`
- Publish directory: `dist`

---

# 📈 Future Improvements

- Authentication & role-based access
- Rent payment tracking
- Maintenance request system
- Admin analytics dashboard
- Notification system
- Docker support
- CI/CD pipeline integration

---

# 🎯 Key Learning Outcomes

- Full-stack architecture implementation
- TypeScript backend development
- REST API design
- Relational database modeling
- Cloud deployment workflow
- Environment-based configuration management

---

# 👨‍💻 Author

**Subham Sabat**  
Full Stack Developer  
Focused on building scalable and production-ready applications.

---

# 📄 License

Licensed under the MIT License.

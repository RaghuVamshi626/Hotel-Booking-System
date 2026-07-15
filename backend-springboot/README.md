# Aura Haven Resort Booking System — Spring Boot Backend

This directory houses the highly robust, enterprise-ready **Spring Boot & REST API** Java backend for your **Hotel Booking System**. It coordinates user authentication, live hotel/suite catalogs, room inventory logs, and guest checkouts with database mapping.

---

## 🛠️ Tech Stack & Key Features
- **Java 17** & **Spring Boot 3.2+**
- **Spring Data JPA** for robust database mapping & repository querying
- **H2 In-Memory Database** (configured for zero-setup local development out of the box)
- **PostgresSQL Integration** (ready for production deployment, configured inside properties)
- **REST Endpoints & CORS Enabled** matching your Vite React frontend exactly
- **Lombok** integration for boilerplate-free POJO code

---

## 💻 Opening & Running inside IntelliJ IDEA

Follow these simple steps to import your full-stack Java code:

1. **Open IntelliJ IDEA**.
2. Click **Open** (or **File > Open**) and select this `/backend-springboot` directory (IntelliJ will auto-detect the `pom.xml` Maven settings).
3. Wait for IntelliJ to complete the Maven dependency indexing.
4. Open `/src/main/java/com/hotel/booking/BookingApplication.java`.
5. Click the green **Run** arrow button (or press `Shift + F10`) to boot up your Spring Boot server.
6. Your backend server is now running locally on **`http://localhost:8080`**!

---

## 🗄️ Interactive H2 Database Console
While your Spring Boot server is active:
- Access the local H2 Database Viewer: **`http://localhost:8080/h2-console`**
- **JDBC URL**: `jdbc:h2:mem:hoteldb`
- **Username**: `sa`
- **Password**: *(leave blank)*
- Click **Connect** to visually query tables, checkouts, and guest profile schemas.

---

## 🔗 Hooking up with your React Frontend
To swap the Mock Node express controllers and directly query this live Spring Boot REST API:
1. Inside your React code, change your fetch endpoints from `/api/*` to reference your Spring Boot URL: `http://localhost:8080/api/*`.
2. Ensure Spring Boot is running before initializing your React dev server.

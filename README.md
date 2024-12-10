# Corporate Financial Control System

## Overview
The **Corporate Financial Control System** is a robust, multi-layered application designed to manage financial data for businesses. The project includes backend and frontend implementations, providing essential functionalities such as revenue and expense tracking, data visualization through charts, and secure data handling practices. The system adheres to SOLID principles to ensure maintainability, scalability, and reliability.

## Features
- **Revenue and Expense Management**: Register, update, and delete financial records.
- **Category Management**: Manage financial categories with CRUD operations.
- **Data Visualization**: Display financial insights through bar and pie charts.
- **Security and Integrity**: Prevent SQL injection and ensure data integrity with prepared statements and input validation.
- **Compliance with SOLID Principles**: Promotes clean architecture and separation of concerns.

## Technologies Used
### Backend:
- **Java** with **Spring Framework**
- **MySQL** for database management

### Frontend:
- **React** for building dynamic user interfaces
- **Recharts** for data visualization

### Other Tools:
- **Docker** for containerization
- **Postman** for API testing

## Prerequisites
Before running the application, ensure the following are installed:
- **Java 17** or higher
- **Node.js** and **npm**
- **MySQL**
- **Docker** (optional for containerization)

## Setup Instructions
### Backend:
1. Clone the repository:
   ```bash
   git clone https://github.com/pedroanicio/Decision_support_systems_work.git
   cd financial-control-system/backend
   ```
2. Configure the database connection in `DatabaseConfig.java`:
   ```java
   public static final String URL = "jdbc:mysql://localhost:3306/financial_db";
   public static final String USER = "your_username";
   public static final String PASSWORD = "your_password";
   ```
3. Configure the environment variables in application.properties;
   
4. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend:
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

### Accessing the Application
- Open your browser and navigate to `http://localhost:3000` to access the frontend.

## Project Structure
```
financial-control-system/
|-- backend/
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/com/br/corporateFinancialControl/
|   |   |   |   |-- service/
|   |   |   |   |-- controller/
|   |   |   |   |-- model/
|   |   |   |   |-- repository/
|   |   |   |-- resources/application.properties
|   |-- pom.xml
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- App.js
|   |-- package.json
```

## Security Measures
- **SQL Injection Prevention**: All database queries use `PreparedStatement`.
- **Input Validation**: Ensures user inputs are sanitized.
- **Error Handling**: Comprehensive exception handling prevents data leaks.

## SOLID Principles Applied
- **Single Responsibility Principle**: Each class has a single, focused responsibility.
- **Open/Closed Principle**: The architecture is designed for easy extension without modifying existing code.
- **Dependency Inversion Principle**: High-level modules depend on abstractions, not concrete implementations.

## Future Enhancements
- Add authentication and role-based access control.
- Implement encryption for sensitive data.
- Integrate additional visualizations for enhanced reporting.





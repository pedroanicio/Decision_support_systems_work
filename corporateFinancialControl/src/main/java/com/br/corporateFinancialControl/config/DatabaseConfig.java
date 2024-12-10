package com.br.corporateFinancialControl.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConfig {

    private static final String URL = "jdbc:mysql://localhost:3306/CorporateFinancialControl?useTimezone=true&serverTimezone=UTC";
    private static final String USER = "suporte";
    private static final String PASSWORD = "Pedro1001@";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}

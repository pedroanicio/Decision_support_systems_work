package com.br.corporateFinancialControl.repository;

import com.br.corporateFinancialControl.config.DatabaseConfig;
import com.br.corporateFinancialControl.model.Categoria;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoriaRepository {

    public Categoria buscarPorId(int id) {
        Categoria categoria = null;
        String sql = "SELECT * FROM categorias WHERE id = ?";

        // Conexão fornecida pelo DatabaseConfig
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNome(rs.getString("nome"));
                categoria.setDescricao(rs.getString("descricao"));
            } else {
                throw new RuntimeException("Categoria não encontrada com ID: " + id);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar categoria: " + e.getMessage(), e);
        }
        return categoria;
    }

    public List<Categoria> listarTodas() {
        List<Categoria> categorias = new ArrayList<>();
        String sql = "SELECT * FROM categorias";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Categoria categoria = new Categoria();
                categoria.setId(rs.getInt("id"));
                categoria.setNome(rs.getString("nome"));
                categoria.setDescricao(rs.getString("descricao"));
                categorias.add(categoria);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar categorias: " + e.getMessage(), e);
        }

        return categorias;
    }

    public Categoria salvar(Categoria categoria) {
        String sql = "INSERT INTO categorias (nome, descricao) VALUES (?, ?)";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, categoria.getNome());
            stmt.setString(2, categoria.getDescricao());

            stmt.executeUpdate();

            // Obter o ID gerado automaticamente
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    categoria.setId(rs.getInt(1));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar categoria: " + e.getMessage(), e);
        }
        return categoria;
    }

    public Categoria atualizar(int id, Categoria categoria){
        String sql = "UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?";

        try(Connection conn = DatabaseConfig.getConnection();
        PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setString(1, categoria.getNome());
            stmt.setString(2, categoria.getDescricao());
            stmt.setInt(3, id);


            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Categoria não encontrada para atualização com ID: " + id);
            }

        } catch (SQLException e){
            throw new RuntimeException("Erro ao atualizar a categoria. " + e.getMessage(), e);
        }
        return categoria;
    }

    public void deletar(int id){
        String sql = "DELETE FROM categorias WHERE id = ?";

        try(Connection conn = DatabaseConfig.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Categoria não encontrada para exclusão com ID: " + id);
            }

        } catch (SQLException e){
            throw new RuntimeException("Erro ao deletar a categoria. " + e.getMessage(), e);
        }
    }

}

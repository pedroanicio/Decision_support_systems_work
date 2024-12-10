package com.br.corporateFinancialControl.repository;

import com.br.corporateFinancialControl.config.DatabaseConfig;
import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.model.Receita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;



@Repository
public class ReceitaRepository{

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Receita buscarPorId(int id){
        Receita receita = null;

        String sql = "SELECT * FROM receitas WHERE id = ?";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()){
                receita = new Receita();
                receita.setId(rs.getInt("id"));
                receita.setDescricao(rs.getString("descricao"));
                receita.setValor(rs.getDouble("valor"));
                receita.setData(rs.getDate("data").toLocalDate());
                receita.setFonte(rs.getString("fonte"));
                receita.setRecorrente(rs.getBoolean("recorrente"));

                // Obter o ID da categoria e carregar o objeto Categoria
                int categoriaId = rs.getInt("categoria");
                Categoria categoria = categoriaRepository.buscarPorId(categoriaId);
                receita.setCategoria(categoria);

            } else {
                throw new RuntimeException("Receita não encontrada.");
            }

        }catch (SQLException e){
            throw new RuntimeException("Erro ao buscar receita. " + e.getMessage(), e);
        }
        return receita;
    }

    public List<Receita> listarTodas(){
        List<Receita> receitas = new ArrayList<>();
        String sql = "SELECT * FROM receitas";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()){
                Receita receita = new Receita();
                receita.setId(rs.getInt("id"));
                receita.setDescricao(rs.getString("descricao"));
                receita.setValor(rs.getDouble("valor"));
                receita.setData(rs.getDate("data").toLocalDate());
                receita.setFonte(rs.getString("fonte"));
                receita.setRecorrente(rs.getBoolean("recorrente"));

                // Obter o ID da categoria e carregar o objeto Categoria
                int categoriaId = rs.getInt("categoria");
                Categoria categoria = categoriaRepository.buscarPorId(categoriaId);
                receita.setCategoria(categoria);


                receitas.add(receita);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar receitas: " + e.getMessage(), e);
        }
        return receitas;
    }

    public Receita salvar(Receita receita){
        String sql = "INSERT INTO receitas (descricao, valor, data, categoria, fonte, recorrente) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, receita.getDescricao());
            stmt.setDouble(2, receita.getValor());
            stmt.setDate(3, Date.valueOf(receita.getData()));
            stmt.setInt(4, receita.getCategoria().getId());
            stmt.setString(5, receita.getFonte());
            stmt.setBoolean(6, receita.getRecorrente());

            stmt.executeUpdate();


            // Obter o ID gerado automaticamente
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    receita.setId(rs.getInt(1));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar receita: " + e.getMessage(), e);
        }
        return receita;
    }

    public Receita atualizar(int id, Receita receita){
        String sql = "UPDATE receitas SET descricao = ?, valor = ?, data = ?, categoria = ?, fonte = ?, recorrente = ? WHERE id = ?";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, receita.getDescricao());
            stmt.setDouble(2, receita.getValor());
            stmt.setDate(3, Date.valueOf(receita.getData()));
            stmt.setInt(4, receita.getCategoria().getId());
            stmt.setString(5, receita.getFonte());
            stmt.setBoolean(6, receita.getRecorrente());
            stmt.setInt(7, id);

            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Receita não encontrada para atualização com ID: " + id);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar receita: " + e.getMessage(), e);
        }
        return receita;
    }

    public void deletar(int id){
        String sql = "DELETE FROM receitas WHERE id = ?";

        try(Connection conn = DatabaseConfig.getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Receta não encontrada para exclusão com ID: " + id);
            }

        } catch (SQLException e){
            throw new RuntimeException("Erro ao deletar a Receita. " + e.getMessage(), e);
        }
    }
}

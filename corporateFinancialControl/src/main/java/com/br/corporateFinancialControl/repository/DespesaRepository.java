package com.br.corporateFinancialControl.repository;


import com.br.corporateFinancialControl.config.DatabaseConfig;
import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.model.Despesa;
import com.br.corporateFinancialControl.model.Receita;
import com.br.corporateFinancialControl.model.enums.FormatosPagamento;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


@Repository
public class DespesaRepository {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Despesa buscarPorId(int id){
        Despesa despesa = null;

        String sql = "SELECT * FROM despesas WHERE id = ?";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)){

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()){
                despesa = new Despesa();
                despesa.setId(rs.getInt("id"));
                despesa.setDescricao(rs.getString("descricao"));
                despesa.setValor(rs.getDouble("valor"));
                despesa.setData(rs.getDate("data").toLocalDate());
                despesa.setDataVencimento(rs.getDate("data_vencimento").toLocalDate());

                // Obter o ID da categoria e carregar o objeto Categoria
                int categoriaId = rs.getInt("categoria");
                Categoria categoria = categoriaRepository.buscarPorId(categoriaId);
                despesa.setCategoria(categoria);

                // Formato de pagamento
                despesa.setFormatoPagamento(FormatosPagamento.valueOf(rs.getString("formato_pagamento")));

            } else {
                throw new RuntimeException("Despesa não encontrada.");
            }

        }catch (SQLException e){
            throw new RuntimeException("Erro ao buscar despesa. " + e.getMessage(), e);
        }
        return despesa;
    }

    public List<Despesa> listarTodas(){
        List<Despesa> despesas = new ArrayList<>();
        String sql = "SELECT * FROM despesas";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()){
                Despesa despesa = new Despesa();
                despesa.setId(rs.getInt("id"));
                despesa.setDescricao(rs.getString("descricao"));
                despesa.setValor(rs.getDouble("valor"));
                despesa.setData(rs.getDate("data").toLocalDate());
                despesa.setDataVencimento(rs.getDate("data_vencimento").toLocalDate());

                // Obter o ID da categoria e carregar o objeto Categoria
                int categoriaId = rs.getInt("categoria");
                Categoria categoria = categoriaRepository.buscarPorId(categoriaId);
                despesa.setCategoria(categoria);

                // Formato de pagamento
                despesa.setFormatoPagamento(FormatosPagamento.valueOf(rs.getString("formato_pagamento")));

                despesas.add(despesa);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao listar despesas: " + e.getMessage(), e);
        }
        return despesas;
    }

    public Despesa salvar(Despesa despesa) {
        String sql = "INSERT INTO despesas (descricao, valor, data, data_vencimento, categoria, formato_pagamento) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, despesa.getDescricao());
            stmt.setDouble(2, despesa.getValor());
            stmt.setDate(3, Date.valueOf(despesa.getData()));
            stmt.setDate(4, Date.valueOf(despesa.getDataVencimento()));
            stmt.setInt(5, despesa.getCategoria().getId());
            stmt.setString(6, despesa.getFormatoPagamento().toString());

            stmt.executeUpdate();

            // Obter o ID gerado automaticamente
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    despesa.setId(rs.getInt(1));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar despesa: " + e.getMessage(), e);
        }
        return despesa;
    }

    public Despesa atualizar(int id, Despesa despesaAtualizada) {
        String sql = "UPDATE despesas SET descricao = ?, valor = ?, data = ?, data_vencimento = ?, categoria = ?, formato_pagamento = ? WHERE id = ?";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, despesaAtualizada.getDescricao());
            stmt.setDouble(2, despesaAtualizada.getValor());
            stmt.setDate(3, Date.valueOf(despesaAtualizada.getData()));
            stmt.setDate(4, Date.valueOf(despesaAtualizada.getDataVencimento()));
            stmt.setInt(5, despesaAtualizada.getCategoria().getId());
            stmt.setString(6, despesaAtualizada.getFormatoPagamento().toString());
            stmt.setInt(7, id);

            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Despesa não encontrada para atualização com ID: " + id);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar despesa: " + e.getMessage(), e);
        }
        return despesaAtualizada;
    }

    public void deletar(int id) {
        String sql = "DELETE FROM despesas WHERE id = ?";

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            if (stmt.executeUpdate() == 0) {
                throw new RuntimeException("Despesa não encontrada para exclusão com ID: " + id);
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar despesa: " + e.getMessage(), e);
        }
    }

}

package com.br.corporateFinancialControl.model;

import com.br.corporateFinancialControl.model.enums.FormatosPagamento;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "despesas")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    private int id;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    @Column(name = "valor", nullable = false)
    private double valor;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "dataVencimento", nullable = false)
    private LocalDate dataVencimento;

    @JoinColumn(name = "categoria", nullable = false)
    @ManyToOne
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    @Column(name = "formatoPagamento", nullable = false)
    private FormatosPagamento formatoPagamento; // aCartão, Dinheiro, Transferência

    public Despesa() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public FormatosPagamento getFormatoPagamento() {
        return formatoPagamento;
    }

    public void setFormatoPagamento(FormatosPagamento formatoPagamento) {
        this.formatoPagamento = formatoPagamento;
    }

    public Despesa(String descricao, double valor, LocalDate data, LocalDate dataVencimento, Categoria categoria, FormatosPagamento formatoPagamento) {
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.dataVencimento = dataVencimento;
        this.categoria = categoria;
        this.formatoPagamento = formatoPagamento;
    }
}

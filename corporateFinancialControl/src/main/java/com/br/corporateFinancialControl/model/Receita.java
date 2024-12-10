package com.br.corporateFinancialControl.model;

import jakarta.persistence.*;


import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "receitas")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false, unique = true)
    private int id;

    @Column(name = "descricao", nullable = false)
    private String descricao;


    @Column(name = "valor", nullable = false)
    private double valor;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @JoinColumn(name = "categoria", nullable = false)
    @ManyToOne
    private Categoria categoria;

    @Column(name = "fonte", nullable = false)
    private String fonte; // Cliente, Investimento

    @Column(name = "recorrente", nullable = false)
    private Boolean recorrente; // Receita recorrente ou única

    public Receita() {

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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getFonte() {
        return fonte;
    }

    public void setFonte(String fonte) {
        this.fonte = fonte;
    }

    public Boolean getRecorrente() {
        return recorrente;
    }

    public void setRecorrente(Boolean recorrente) {
        this.recorrente = recorrente;
    }

    public Receita(String descricao, double valor, LocalDate data, Categoria categoria, String fonte, Boolean recorrente) {
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.categoria = categoria;
        this.fonte = fonte;
        this.recorrente = recorrente;
    }
}

package com.br.corporateFinancialControl.model.enums;

public enum FormatosPagamento {
    CARTAO("cartao"),
    DINHEIRO("dinheiro"),
    TRANSFERENCIA("transferencia");

    private final String formato;

    FormatosPagamento(String formato) { this.formato = formato;}

    public String getFormato() {
        return formato;
    }
}

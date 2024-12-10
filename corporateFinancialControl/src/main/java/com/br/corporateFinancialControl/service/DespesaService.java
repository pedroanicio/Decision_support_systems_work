package com.br.corporateFinancialControl.service;

import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.model.Despesa;
import com.br.corporateFinancialControl.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    public List<Despesa> listarTodas (){
        return despesaRepository.listarTodas();
    }

    public Despesa buscarPorId(int id){
        return despesaRepository.buscarPorId(id);
    }

    public Despesa salvar(Despesa despesa){
        if (despesa.getValor() <= 0){
            throw new IllegalArgumentException("O valor deve ser positivo.");
        }
        return despesaRepository.salvar(despesa);
    }

    public Despesa atualizarDespesa(int id, Despesa despesa){
        return despesaRepository.atualizar(id, despesa);
    }


    public void deletar(int id){
        buscarPorId(id);
        despesaRepository.deletar(id);
    }
}

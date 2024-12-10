package com.br.corporateFinancialControl.service;

import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.model.Receita;
import com.br.corporateFinancialControl.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public List<Receita> listarTodas(){
        return receitaRepository.listarTodas();
    }

    public Receita buscarPorId(int id){
        return receitaRepository.buscarPorId(id);
    }

    public Receita salvar(Receita receita){
        if(receita.getValor() <= 0){
            throw new IllegalArgumentException("O valor deve ser positivo.");
        }
        return receitaRepository.salvar(receita);
    }

    public Receita atualizarReceta(int id, Receita receita){
        return receitaRepository.atualizar(id, receita);
    }


    public void deletar(int id){
        buscarPorId(id);
        receitaRepository.deletar(id);
    }
}

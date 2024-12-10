package com.br.corporateFinancialControl.service;

import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodas(){
        return categoriaRepository.listarTodas();
    }

    public Categoria buscarPorId(int id){
        return categoriaRepository.buscarPorId(id);
    }

    public Categoria salvar(Categoria categoria){
        return categoriaRepository.salvar(categoria);
    }

    public Categoria atualizarCategoria(int id, Categoria categoria){
        return categoriaRepository.atualizar(id, categoria);
    }

    public void deletar(int id){
        buscarPorId(id);
        categoriaRepository.deletar(id);
        System.out.println("Categoria deletada");
    }
}

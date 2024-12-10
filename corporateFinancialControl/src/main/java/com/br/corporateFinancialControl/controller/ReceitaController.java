package com.br.corporateFinancialControl.controller;

import com.br.corporateFinancialControl.model.Receita;
import com.br.corporateFinancialControl.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @GetMapping
    public List<Receita> listarTodas(){
        return receitaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Receita buscarPorId(@PathVariable int id){
        return receitaService.buscarPorId(id);
    }

    @PostMapping
    public Receita criarNovaReceita(@RequestBody Receita receita){
        return receitaService.salvar(receita);
    }

    @PutMapping("/{id}")
    public Receita atualizarCategoria(@PathVariable int id, @RequestBody Receita receita){
        return receitaService.atualizarReceta(id, receita);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        receitaService.deletar(id);
    }
}

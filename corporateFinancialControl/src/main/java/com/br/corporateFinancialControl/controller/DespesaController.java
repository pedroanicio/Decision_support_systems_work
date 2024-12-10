package com.br.corporateFinancialControl.controller;

import com.br.corporateFinancialControl.model.Despesa;
import com.br.corporateFinancialControl.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    @GetMapping
    public List<Despesa> listarTodas(){
        return despesaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Despesa buscarPorId(@PathVariable int id){
        return despesaService.buscarPorId(id);
    }

    @PostMapping
    public Despesa criarNovaDespesa(@RequestBody Despesa despesa){
        return despesaService.salvar(despesa);
    }

    @PutMapping("/{id}")
    public Despesa atualizarCategoria(@PathVariable int id, @RequestBody Despesa despesa){
        return despesaService.atualizarDespesa(id, despesa);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id) {
        despesaService.deletar(id);
    }
}

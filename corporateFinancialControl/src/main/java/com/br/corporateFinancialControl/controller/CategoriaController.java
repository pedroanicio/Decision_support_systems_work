package com.br.corporateFinancialControl.controller;

import com.br.corporateFinancialControl.model.Categoria;
import com.br.corporateFinancialControl.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> listarTodas(){
        return categoriaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Categoria buscarPorId(@PathVariable int id){
        return categoriaService.buscarPorId(id);
    }

    @PostMapping
    public Categoria criarCategoria(@RequestBody Categoria categoria){
        return categoriaService.salvar(categoria);
    }

    @PutMapping("/{id}")
    public Categoria atualizarCategoria(@PathVariable int id, @RequestBody Categoria categoria){
        return categoriaService.atualizarCategoria(id, categoria);
    }

    @DeleteMapping("/{id}")
    public void deletarCategoria(@PathVariable int id){
        categoriaService.deletar(id);
    }

}

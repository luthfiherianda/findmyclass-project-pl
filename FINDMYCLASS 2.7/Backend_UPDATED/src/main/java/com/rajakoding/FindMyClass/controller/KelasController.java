package com.rajakoding.FindMyClass.controller;

import com.rajakoding.FindMyClass.model.Kelas;
import com.rajakoding.FindMyClass.service.KelasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kelas")
@CrossOrigin(origins = "*")
public class KelasController {

    @Autowired
    private KelasService kelasService;

    @GetMapping
    public List<Kelas> getAllKelas() {
        return kelasService.getAllKelas();
    }

    @PostMapping
    public Kelas saveKelas(@RequestBody Kelas kelas) {
        return kelasService.saveKelas(kelas);
    }

    @DeleteMapping("/{id}")
    public void deleteKelas(@PathVariable Long id) {
        kelasService.deleteKelas(id);
    }
}


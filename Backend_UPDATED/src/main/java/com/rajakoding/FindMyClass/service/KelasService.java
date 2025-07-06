package com.rajakoding.FindMyClass.service;

import com.rajakoding.FindMyClass.model.Kelas;
import com.rajakoding.FindMyClass.repository.KelasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KelasService {

    @Autowired
    private KelasRepository kelasRepository;

    public List<Kelas> getAllKelas() {
        return kelasRepository.findAll();
    }

    public Kelas saveKelas(Kelas kelas) {
        return kelasRepository.save(kelas);
    }

    public void deleteKelas(Long id) {
        kelasRepository.deleteById(id);
    }
}

package com.rajakoding.FindMyClass.controller;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rajakoding.FindMyClass.model.Kelas;

@Controller
public class KelasController {

    private Map<String, Kelas> kelasMap;

   public KelasController() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    try (InputStream is = new ClassPathResource("kelas-fst.json").getInputStream()) {
        kelasMap = mapper.readValue(
            is,
            mapper.getTypeFactory().constructMapType(Map.class, String.class, Kelas.class)
        );
    }
}


    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("kelasList", kelasMap);
        return "index";
    }

    @GetMapping("/booking/{kode}")
    public String bookingPage(@PathVariable String kode, Model model) {
        Kelas kelas = kelasMap.get(kode);
        if (kelas == null) return "redirect:/";
        model.addAttribute("kode", kode);
        model.addAttribute("kelas", kelas);
        return "booking";
    }
}

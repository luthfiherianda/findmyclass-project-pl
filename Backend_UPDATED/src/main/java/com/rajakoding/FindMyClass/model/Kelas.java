package com.rajakoding.FindMyClass.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "kelas")
public class Kelas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nama;
    private String ruang;
    private String kapasitas;

    @ElementCollection
    private List<String> fasilitas;

    private String deskripsi;
}

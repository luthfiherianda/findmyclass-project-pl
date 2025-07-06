package com.rajakoding.FindMyClass.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate tanggal;

    private LocalTime jamMulai;
    private LocalTime jamSelesai;

    @ManyToOne
    @JoinColumn(name = "kelas_id")
    private Kelas kelas;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
}

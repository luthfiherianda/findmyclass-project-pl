package com.rajakoding.FindMyClass.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

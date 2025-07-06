package com.rajakoding.FindMyClass.controller;

import com.rajakoding.FindMyClass.model.Report;
import com.rajakoding.FindMyClass.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*") // agar bisa diakses dari frontend
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportService.saveReport(report);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
}

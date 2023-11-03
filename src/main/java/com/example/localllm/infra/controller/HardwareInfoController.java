package com.example.localllm.infra.controller;

import com.example.localllm.application.hardwareinfo.HardwareInfoProvider;
import com.example.localllm.domain.HardwareInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableAsync
@RequestMapping("/api/v1")
public class HardwareInfoController {
    @Autowired private HardwareInfoProvider hardwareInfoProvider;

    @GetMapping(value = "/getResponse", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HardwareInfoResponse> getTestData() {
        return ResponseEntity.ok(hardwareInfoProvider.getHardwareInfo());
    }
}

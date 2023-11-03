package com.example.localllm.infra.controller;

import com.example.localllm.application.LLM.LLMProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@EnableAsync
@RequestMapping("/api/v1")
public class LLMController {
  @Autowired private LLMProcessor llmProcessor;

  @GetMapping(value = "/getResponse", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> getTestData(@RequestParam(name = "inputText") String inputText) {
    return ResponseEntity.ok(llmProcessor.getResponse(inputText));
  }
}

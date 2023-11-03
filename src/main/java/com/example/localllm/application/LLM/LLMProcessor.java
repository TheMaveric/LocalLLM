package com.example.localllm.application.LLM;

import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.openai.OpenAiChatModel;
import java.time.Duration;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Data
public class LLMProcessor {

  OpenAiChatModel model;

  LLMProcessor() {
    model =
        OpenAiChatModel.builder()
            .timeout(Duration.ofMinutes(600))
            .logResponses(true)
            .logRequests(true)
            .apiKey("demo")
            .temperature(0.6)
            .frequencyPenalty(0d)
            .build();
  }

  public String getResponse(String inputText) {
    // while (true) {
    // Scanner sc = new Scanner(System.in);
    // inputText = sc.nextLine();
    log.info("INPUT={}", inputText);
    // if (inputText.equalsIgnoreCase("exit")) break;
    AiMessage answer = model.sendUserMessage(inputText);
    String response = answer.text();
    log.info("OUTPUT={}", response);
    // }
    return response;
  }
}

package com.example.localllm.infra.controller.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**") // Allow all endpoints under "/api/v1"
                .allowedOrigins("http://localhost:3000") // Replace with your React app's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the necessary HTTP methods
                .allowedHeaders("*") // Allow all headers (you can specify specific headers if needed)
                .exposedHeaders("Authorization") // Expose specific headers to the client if needed
                .allowCredentials(true); // Allow credentials (cookies, HTTP authentication, etc.) if your application requires them
    }
}

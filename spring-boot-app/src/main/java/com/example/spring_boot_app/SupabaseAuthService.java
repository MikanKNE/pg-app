package com.example.spring_boot_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Map;

@Service
public class SupabaseAuthService {

    @Autowired
    private WebClient webClient;
    
    /**
     * Eメール/パスワードを使ってSupabase認証のアカウント登録を行います
     * @param email Eメール
     * @param password パスワード
     * @param redirectTo アカウント認証時にコールバックするリダイレクトURL
     * @return 登録結果
     */
    public Map<String, Object> signUp(String email, String password, String redirectTo) {
        return webClient.post()
                .uri("/auth/v1/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("email", email, "password", password, "options", Map.of("email_redirect_to", redirectTo)))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    /**
     * アクセストークンより Supabase のアカウント情報を取得する
     * @param accessToken アクセストークン
     * @return アカウント情報
     */
    public Map<String, Object> getUserByAccessToken(String accessToken) {
        return webClient.get()
                .uri("/auth/v1/user")
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

}
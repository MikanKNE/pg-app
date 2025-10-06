package com.example.spring_boot_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private SupabaseAuthService supabaseAuthService;

    /**
     * アカウント登録を行います
     * @param request アカウント情報
     * @param uriBuilder URI構築
     * @return 実行結果
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody AuthRequest request, UriComponentsBuilder uriBuilder) {
        String redirectTo = uriBuilder.replacePath("/").build().toUriString();
        Map<String, Object> result = supabaseAuthService.signUp(request.getEmail(), request.getPassword(), redirectTo);
        return result.containsKey("id") 
                ? ResponseEntity.ok(Map.of("message", "Registration successful. Please check your email for confirmation."))
                : ResponseEntity.badRequest().body(result);
    }

    /**
     * アカウント情報を取得します
     * @param authorizationHeader Authorizationヘッダ
     * @return アカウント情報
     */
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> authUser(@RequestHeader("Authorization") String authorizationHeader) {
        Map<String, Object> user = supabaseAuthService.getUserByAccessToken(authorizationHeader.substring(7));
        return ResponseEntity.ok(Map.of("email", user.get("email")));
    }

}
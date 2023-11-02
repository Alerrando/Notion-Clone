package com.example.notion.security;

import com.example.notion.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JWTTokkenProvider {
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.ES256);

    static public String createToken(User user){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000);

        String jwtToken = Jwts.builder()
                .setSubject("user") //Define o valor dos assuntos das declarações JWT
                .setIssuer("http://localhost:8080") //Define o emissor principal que emitiu o JWT
                .claim("level", user.getLevel()) //Define um valor de parâmetro de declarações JWT personalizado
                .setIssuedAt(now) //Defini o momento que o JWT é criado
                .setExpiration(expiration) //Defini o momento que o JWT expira
                .signWith(SECRET_KEY) //Defini uma chave especifica ao JWT contruído, produzindo um JWS
                .compact(); //Cria o JWT e serializar uma string segura para a url

        return jwtToken;
    }

    static public boolean verifyToken(String token){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) //Define a chave de assinatura usada para verificar qualquer assinatura digital JWS descoberta.
                    .build() //Retorna um JwtParser imutável/thread-safe criado a partir da configuração JwtParserBuilder.
                    .parseClaimsJws(token) //Analisei a sequência JWS serializada compacta e retorna uma instância JWT
                    .getSignature(); //Retorna uma assinatura contida np JWT como string codificada em Base64

            return true;
        } catch (Exception e){
            return false;
        }
    }

    static public Claims getAllClaimsFromToken(String token){
        Claims claims = null;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody(); //Retorna um JWT, seja em uma Instância Claims ou String
            return claims;
        } catch (Exception e){
            return null;
        }
    }
}

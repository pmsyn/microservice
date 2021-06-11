package com.ms.serviceapi.controller;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
public class LoginController {
    @PostMapping("/login")
    public Map login(HttpServletRequest request, @RequestBody Map<String,Object> param){
        Map<String,Object> ret = new HashMap<>();
        String username = (String)param.get("username");
        String password = (String)param.get("password");
        if("admin".equals(username) && "123".equals(password)){
            String token = UUID.randomUUID().toString();
            ret.put("token", token);
            HttpSession session = request.getSession();
            session.setAttribute("token",token);
        }
        return  ret;
    }
    @GetMapping("get")
    public Object getSession(HttpSession session,@RequestParam String key){
        Object v = session.getAttribute(key);
        if(v == null) return "";
        return v;
    }
}

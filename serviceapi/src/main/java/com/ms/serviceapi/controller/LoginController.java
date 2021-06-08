package com.ms.serviceapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
public class LoginController {
    @RequestMapping("/login")
    public Map login(@RequestParam Map<String,Object> param){
        Map<String,Object> ret = new HashMap<>();
        String username = (String)param.get("username");
        String password = (String)param.get("password");
        if("admin".equals(username) && "123".equals(password)){
            ret.put("token", UUID.randomUUID());
        }
        return  ret;
    }
}

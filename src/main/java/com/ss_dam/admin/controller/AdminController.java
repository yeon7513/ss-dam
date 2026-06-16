package com.ss_dam.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/")
public class AdminController {

	@GetMapping("/check")
	public ResponseEntity<String> checkAdmin(){
		
		return ResponseEntity.ok("success");
	}
}

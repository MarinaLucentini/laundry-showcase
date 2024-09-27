package marinalucentini.laundryshowcase.controller;


import marinalucentini.laundryshowcase.exceptions.BadRequestException;
import marinalucentini.laundryshowcase.payload.LoginResponse;
import marinalucentini.laundryshowcase.payload.UserDTO;
import marinalucentini.laundryshowcase.repositories.UserRepository;
import marinalucentini.laundryshowcase.services.AuthorizationService;
import marinalucentini.laundryshowcase.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    UserService userService;
    @Autowired
    AuthorizationService authorizationService;
    @Autowired
    UserRepository userRepository;
    @PostMapping("/register")

    public ResponseEntity<Object> studentResponseDto  (@RequestBody @Validated UserDTO userDTO, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (ObjectError error : bindingResult.getAllErrors()) {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                errors.put(fieldName, errorMessage);
            }
            return ResponseEntity.badRequest().body(errors);
        }
        if (userRepository.count() > 0) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("error", "Un amministratore è già registrato."));
        }
        try {
            String response = userService.saveUser(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated UserDTO payload, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return new LoginResponse(authorizationService.authenticateUserAndGenerateToken(payload));
    }
}

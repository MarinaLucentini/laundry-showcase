package marinalucentini.laundryshowcase.services;

import marinalucentini.laundryshowcase.entities.Owner;
import marinalucentini.laundryshowcase.exceptions.BadRequestException;
import marinalucentini.laundryshowcase.exceptions.NotFoundException;
import marinalucentini.laundryshowcase.payload.UserDTO;
import marinalucentini.laundryshowcase.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcrypt;




    public String saveUser(UserDTO body) {
        if (userRepository.count() > 0) {
            throw new BadRequestException("L'amministratore è già registrato. Registrazioni aggiuntive non sono permesse.");
        }

        userRepository.findByEmail(body.email()).ifPresent(
                user -> {
                    throw new BadRequestException("L'email è già in uso");
                }
        );
Owner user = new Owner();
user.setEmail(body.email());
user.setPassword(bcrypt.encode(body.password()));
userRepository.save(user);
return "L'utente è stato salvato con successo";
    }
    public Owner findById(UUID id) {
        return this.userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
        public Owner findByEmail(String email) {
            return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("The user with email: " + email + ", already exist."));
        }

}

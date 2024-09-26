package marinalucentini.laundryshowcase.configuration;

import marinalucentini.laundryshowcase.entities.Owner;
import marinalucentini.laundryshowcase.entities.Role;
import marinalucentini.laundryshowcase.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bcrypt;

    public AdminInitializer(UserRepository userRepository, BCryptPasswordEncoder bcrypt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
    }
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            Owner admin = new Owner();
            admin.setEmail("giomon8367@gmail.com");
            admin.setPassword(bcrypt.encode("1234"));
admin.setRole(Role.ADMIN);

            userRepository.save(admin);
            System.out.println("Amministratore creato: " + admin.getEmail());
        } else {
            System.out.println("Un amministratore esiste già.");
        }
    }
    }


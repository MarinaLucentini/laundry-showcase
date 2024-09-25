package marinalucentini.laundryshowcase.services;


import marinalucentini.laundryshowcase.entities.Owner;
import marinalucentini.laundryshowcase.exceptions.UnauthorizedException;
import marinalucentini.laundryshowcase.payload.UserDTO;
import marinalucentini.laundryshowcase.security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    @Autowired
    UserService userService;
    @Autowired
    private JwtTool jwtTool;
    @Autowired
    private PasswordEncoder bcrypt;
    public String authenticateUserAndGenerateToken(UserDTO payload){

        Owner user = userService.findByEmail(payload.email());

        if(bcrypt.matches(payload.password(), user.getPassword())){

            return jwtTool.createToken(user);
        } else {

            throw new UnauthorizedException("Credenziali non corrette!");
        }
    }
}

package marinalucentini.laundryshowcase.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UserDTO(
        @NotEmpty (message = "L'email è obbligatoria")
                @Email (message = "L'email deve essere valida")
        String email,
        @NotEmpty (message = "La password è obbligatoria")
        String password
) {
}

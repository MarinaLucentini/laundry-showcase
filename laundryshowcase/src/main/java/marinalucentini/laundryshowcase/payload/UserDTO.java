package marinalucentini.laundryshowcase.payload;

import jakarta.validation.constraints.NotEmpty;

public record UserDTO(
        @NotEmpty (message = "L'email è obbligatoria")
        String email,
        @NotEmpty (message = "La password è obbligatoria")
        String password
) {
}

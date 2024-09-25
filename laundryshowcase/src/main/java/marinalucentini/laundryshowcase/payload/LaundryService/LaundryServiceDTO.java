package marinalucentini.laundryshowcase.payload.LaundryService;

import jakarta.validation.constraints.NotEmpty;

public record LaundryServiceDTO(
        @NotEmpty (message = "Il campo nome è obbligatorio")
        String name

) {
}

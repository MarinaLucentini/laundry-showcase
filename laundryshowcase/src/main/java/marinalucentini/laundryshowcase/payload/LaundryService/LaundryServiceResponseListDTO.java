package marinalucentini.laundryshowcase.payload.LaundryService;

import java.util.UUID;

public record LaundryServiceResponseListDTO(
        String name,
        boolean completed,
        UUID id
) {
}

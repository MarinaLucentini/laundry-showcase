package marinalucentini.laundryshowcase.payload.customers;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record CustomersDto(
        @NotEmpty (message = "Il campo nome deve è obbligatorio")
        String name,
        @Email (message = "Il campo email deve essere valido")
        String email,
        String phone
) {
}

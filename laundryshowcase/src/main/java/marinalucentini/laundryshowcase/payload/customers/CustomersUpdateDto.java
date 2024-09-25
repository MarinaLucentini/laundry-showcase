package marinalucentini.laundryshowcase.payload.customers;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record CustomersUpdateDto(

        String name,
        @Email(message = "Il campo email deve essere valido")
        String email,
        String phone
) {
}

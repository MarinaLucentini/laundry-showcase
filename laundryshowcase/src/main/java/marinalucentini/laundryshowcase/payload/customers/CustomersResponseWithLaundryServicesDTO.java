package marinalucentini.laundryshowcase.payload.customers;

import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseListDTO;

import java.util.List;
import java.util.UUID;

public record CustomersResponseWithLaundryServicesDTO(
        UUID id,
        String name,
        String email,
        String phone,
        List<LaundryServiceResponseListDTO> laundryServiceResponseListDTOList
) {
}

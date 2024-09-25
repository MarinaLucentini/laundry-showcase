package marinalucentini.laundryshowcase.payload.customers;

import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseListDTO;

import java.util.List;

public record CustomersResponseWithLaundryServicesDTO(
        String name,
        String email,
        String phone,
        List<LaundryServiceResponseListDTO> laundryServiceResponseListDTOList
) {
}

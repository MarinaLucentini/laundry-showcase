package marinalucentini.laundryshowcase.services;

import marinalucentini.laundryshowcase.entities.Customers;

import marinalucentini.laundryshowcase.exceptions.NotFoundException;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseListDTO;
import marinalucentini.laundryshowcase.payload.customers.CustomersDto;
import marinalucentini.laundryshowcase.payload.customers.CustomersResponseDto;
import marinalucentini.laundryshowcase.payload.customers.CustomersResponseWithLaundryServicesDTO;
import marinalucentini.laundryshowcase.payload.customers.CustomersUpdateDto;
import marinalucentini.laundryshowcase.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomersService {
    @Autowired
    CustomersRepository customersRepository;
    // create
    public String saveCustomers (CustomersDto body){
        Customers customers = new Customers(body.name(), body.email(), body.phone());
       
        customersRepository.save(customers);
        return "Il cliente è stato salvato correttamente";
    }
// update
    public String updateCustomers (CustomersUpdateDto body, UUID id){
        Customers customers = findById(id);
        if(body.name() != null){
            customers.setName(body.name());
        }
        if(body.email() != null){
            customers.setEmail(body.email());
        }
        if(body.phone() != null){
            customers.setPhone(body.phone());
        }
        customersRepository.save(customers);
        return "Il cliente è stato correttamente modificato";
    }

    // delete

    public String deleteCustomers (UUID id){
        Customers customers = findById(id);
        customersRepository.delete(customers);
        return "Il cliente è stato correttamente eliminato";
    }
    // getSingleCustomers
    public CustomersResponseWithLaundryServicesDTO getSingleCustomer (UUID id){
        Customers customers = findById(id);
        List<LaundryServiceResponseListDTO> laundryServiceResponseListDTOList =
        customers.getLaundryServices().stream().map(laundryServices -> new LaundryServiceResponseListDTO( laundryServices.getName(), laundryServices.isCompleted(),  laundryServices.getId()) ).toList();
        return new CustomersResponseWithLaundryServicesDTO(customers.getId(), customers.getName(), customers.getEmail(), customers.getPhone(), laundryServiceResponseListDTOList);
    }
    // getAllCustomers
    public Page<CustomersResponseWithLaundryServicesDTO> getAllCustomers (int pageNumber, int pageSize, String sortBy){
if(pageSize > 100) {
pageSize = 100;
}
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
Page<Customers> customersPage = customersRepository.findAll(pageable);
return customersPage.map(customers -> new CustomersResponseWithLaundryServicesDTO( customers.getId(), customers.getName(), customers.getEmail(), customers.getPhone(), customers.getLaundryServices().stream().map(laundryServices -> new LaundryServiceResponseListDTO(laundryServices.getName(), laundryServices.isCompleted(), laundryServices.getId())).toList()));
    }
    public Customers findById(UUID id) {
        return this.customersRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
    public Customers findByEmail(String email) {
        return customersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("The user with email: " + email + ", already exist."));
    }
}

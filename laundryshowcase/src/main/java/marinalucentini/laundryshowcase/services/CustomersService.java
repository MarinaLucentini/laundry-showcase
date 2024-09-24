package marinalucentini.laundryshowcase.services;

import marinalucentini.laundryshowcase.entities.Customers;

import marinalucentini.laundryshowcase.exceptions.NotFoundException;
import marinalucentini.laundryshowcase.payload.CustomersDto;
import marinalucentini.laundryshowcase.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomersService {
    @Autowired
    CustomersRepository customersRepository;
    public String saveCustomers (CustomersDto body){
        Customers customers = new Customers();
        customers.setEmail(body.email());
        customers.setName(body.name());
        customers.setPhone(body.phone());
        customersRepository.save(customers);
        return "Il cliente è stato salvato correttamente";
    }

    public Customers findById(UUID id) {
        return this.customersRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
    public Customers findByEmail(String email) {
        return customersRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("The user with email: " + email + ", already exist."));
    }
}

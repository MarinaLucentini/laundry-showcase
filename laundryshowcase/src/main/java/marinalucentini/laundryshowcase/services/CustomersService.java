package marinalucentini.laundryshowcase.services;

import marinalucentini.laundryshowcase.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomersService {
    @Autowired
    CustomersRepository customersRepository;
    
}

package marinalucentini.laundryshowcase.services;

import marinalucentini.laundryshowcase.entities.Customers;
import marinalucentini.laundryshowcase.entities.LaundryServices;
import marinalucentini.laundryshowcase.exceptions.BadRequestException;
import marinalucentini.laundryshowcase.exceptions.NotFoundException;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceDTO;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseDto;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseListDTO;
import marinalucentini.laundryshowcase.payload.customers.CustomersResponseWithLaundryServicesDTO;
import marinalucentini.laundryshowcase.repositories.CustomersRepository;
import marinalucentini.laundryshowcase.repositories.LaundryServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LaundryServicesService {
    @Autowired
    LaundryServicesRepository laundryServicesRepository;
    @Autowired
    CustomersService customersService;
    @Autowired
    CustomersRepository customersRepository;
    // create laundry service
public LaundryServiceResponseListDTO saveLaundryService (LaundryServiceDTO body){
laundryServicesRepository.findByName(body.name()).ifPresent(laundryServices -> {
    throw new BadRequestException("Il servizio è già stato creato");
});
LaundryServices laundryServices = new LaundryServices();
laundryServices.setName(body.name());
laundryServices.setCompleted(false);
laundryServicesRepository.save(laundryServices);
return new LaundryServiceResponseListDTO(laundryServices.getName(), laundryServices.isCompleted(), laundryServices.getId());
}
// delete laundry service
    public LaundryServiceResponseDto deleteLaundryService (UUID id){
    LaundryServices laundryServices = findById(id);
    if(laundryServices.getCustomers() != null){

    Customers customers = customersService.findById( laundryServices.getCustomers().getId());
    customers.getLaundryServices().remove(laundryServices);
    }

    laundryServicesRepository.delete(laundryServices);
    return new LaundryServiceResponseDto("Il servizio è stato correttamente elimintato");
    }
    // get laundry service by id
    public LaundryServiceResponseListDTO getLaundryServiceById(UUID id){
    LaundryServices laundryServices = findById(id);
    return new LaundryServiceResponseListDTO(laundryServices.getName(), laundryServices.isCompleted() , laundryServices.getId());
    }
    // get all laundry services
    public Page<LaundryServiceResponseListDTO> getAllLaundryService (int pageNumber, int pageSize, String sortBy){
        if(pageSize > 100) {
            pageSize = 100;
        }
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<LaundryServices> laundryServicesPage = laundryServicesRepository.findAll(pageable);
        return laundryServicesPage.map(laundryServices -> new LaundryServiceResponseListDTO(laundryServices.getName(), laundryServices.isCompleted(), laundryServices.getId()));
    }
    // update name laundry service
    public LaundryServiceResponseListDTO updateNameLaundryService (UUID id, LaundryServiceDTO body){
    LaundryServices laundryServices = findById(id);
    laundryServices.setName(body.name());
    laundryServicesRepository.save(laundryServices);
    return new LaundryServiceResponseListDTO(laundryServices.getName(), laundryServices.isCompleted(), laundryServices.getId());
    }
    // associate customer and laundry service
    public CustomersResponseWithLaundryServicesDTO associateLaundryServiceAndCustomer (UUID customerId, UUID laundryServiceId){
    LaundryServices laundryServices = findById(laundryServiceId);
        Customers customers = customersService.findById(customerId);
        if (customers.getLaundryServices().contains(laundryServices)) {
            throw new IllegalArgumentException("Il servizio di lavanderia è già associato a questo cliente.");
        }
        customers.getLaundryServices().add(laundryServices);
        laundryServices.setCustomers(customers);
        laundryServicesRepository.save(laundryServices);
        return new CustomersResponseWithLaundryServicesDTO(customers.getId(), customers.getName(), customers.getEmail(), customers.getPhone(), customers.getLaundryServices().stream().map(laundryService -> new LaundryServiceResponseListDTO(laundryService.getName(), laundryService.isCompleted(), laundryService.getId())).toList());
    }
    // complete laundry service and send notification
    public LaundryServiceResponseDto completeLaundryServiceAndSendNotification (UUID id){
    LaundryServices laundryServices = findById(id);
    Customers customers = customersService.findById(laundryServices.getCustomers().getId());
    laundryServices.setCompleted(true);
    customers.getLaundryServices().remove(laundryServices);

    String notification = "Il servizio " + laundryServices.getName() + " è stato completato vieni a ritirare il tuo capo";
    return new LaundryServiceResponseDto(notification);
    }
public LaundryServices findById (UUID id){
return     laundryServicesRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
}
public LaundryServices findByName(String name){
    return laundryServicesRepository.findByName(name).orElseThrow(()-> new NotFoundException("Il servizio" + name + "non è stato trovato"));
}
}

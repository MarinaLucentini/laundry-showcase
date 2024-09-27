package marinalucentini.laundryshowcase.controller;

import marinalucentini.laundryshowcase.exceptions.BadRequestException;
import marinalucentini.laundryshowcase.payload.customers.CustomersDto;
import marinalucentini.laundryshowcase.payload.customers.CustomersResponseDto;
import marinalucentini.laundryshowcase.payload.customers.CustomersResponseWithLaundryServicesDTO;
import marinalucentini.laundryshowcase.payload.customers.CustomersUpdateDto;
import marinalucentini.laundryshowcase.services.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/customers")
public class CustomersController {
    @Autowired
    private CustomersService customersService;
    // 1) Get
@GetMapping
@PreAuthorize("hasAuthority('ADMIN')")

public ResponseEntity<Page<CustomersResponseWithLaundryServicesDTO>>  getAllCustomers (@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy){
    try {
        Page<CustomersResponseWithLaundryServicesDTO> customers = customersService.getAllCustomers(page, size, sortBy);
        return ResponseEntity.ok(customers);
    } catch (Exception e) {
        // Log l'errore
        System.out.println("Errore nel metodo getAllCustomers"+ e);;
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
    // 2) Get w id
    @GetMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public CustomersResponseWithLaundryServicesDTO getSingleCustomer (@PathVariable UUID customerId){
        return customersService.getSingleCustomer(customerId);
    }
    // 3) post
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
public CustomersResponseDto saveCustomers (@RequestBody @Validated CustomersDto body, BindingResult bindingResult){
if(bindingResult.hasErrors()){
    throw new BadRequestException(bindingResult.getAllErrors());
}
return new CustomersResponseDto(customersService.saveCustomers(body));
    }
    // 4) Patch
    @PatchMapping ("/{customerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
@ResponseStatus(HttpStatus.OK)
    public CustomersResponseDto patchCustomers(@RequestBody @Validated CustomersUpdateDto body, @PathVariable UUID customerId, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return new CustomersResponseDto(customersService.updateCustomers(body, customerId));
    }

    // 5) delete
    @DeleteMapping("/{customerId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public CustomersResponseDto deleteCustomers (@PathVariable UUID customerId){
        return new CustomersResponseDto(customersService.deleteCustomers(customerId));
    }
}

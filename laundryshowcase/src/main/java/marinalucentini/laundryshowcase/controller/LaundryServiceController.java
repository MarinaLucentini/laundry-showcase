package marinalucentini.laundryshowcase.controller;

import marinalucentini.laundryshowcase.exceptions.BadRequestException;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceDTO;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseDto;
import marinalucentini.laundryshowcase.payload.LaundryService.LaundryServiceResponseListDTO;
import marinalucentini.laundryshowcase.services.LaundryServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/services")
public class LaundryServiceController {
    @Autowired
    LaundryServicesService laundryServicesService;
    // 1) Get
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public Page<LaundryServiceResponseListDTO> getAllLaundryServices (@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy){
        return laundryServicesService.getAllLaundryService(page, size, sortBy);
    }
    // 2) Post
@PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
@ResponseStatus(HttpStatus.CREATED)
    public LaundryServiceResponseDto createLaundryService (@RequestBody @Validated LaundryServiceDTO body, BindingResult bindingResult){
    if(bindingResult.hasErrors()){
        throw new BadRequestException(bindingResult.getAllErrors());
    }
    return laundryServicesService.saveLaundryService(body);
}
    // 3) Get by Id
@GetMapping ("{laundryServiceId}")
@PreAuthorize("hasAuthority('ADMIN')")
public LaundryServiceResponseListDTO getLaundryServiceById (@PathVariable UUID laundryServiceId){
    return laundryServicesService.getLaundryServiceById(laundryServiceId);
}
    // 4) Patch
@PatchMapping("/{laundryServiceId}")
@PreAuthorize("hasAuthority('ADMIN')")
public LaundryServiceResponseDto updateLaundryService (@RequestBody @Validated LaundryServiceDTO body, BindingResult bindingResult, @PathVariable UUID laundryServiceId){
        if(bindingResult.hasErrors()){
            throw new BadRequestException(bindingResult.getAllErrors());
        }
        return laundryServicesService.updateNameLaundryService(laundryServiceId, body);
}
    //5) Patch complete and send notification
@PatchMapping("complete/{laundryServiceId}")
@PreAuthorize("hasAuthority('ADMIN')")
public LaundryServiceResponseDto completeLaundryServiceAndSendNotification (@PathVariable UUID laundryServiceId){
return laundryServicesService.completeLaundryServiceAndSendNotification(laundryServiceId);
}
    // 6) delete
    @DeleteMapping("/{laundryServiceId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public LaundryServiceResponseDto deleteLaundryService (@PathVariable UUID laundryServiceId){
    return laundryServicesService.deleteLaundryService(laundryServiceId);
    }
    // 7) associate customers at laundry service
@PatchMapping("/{customerId}/{laundryServiceId}")
@PreAuthorize("hasAuthority('ADMIN')")
public LaundryServiceResponseDto associateCustomerAndLaundryService(@PathVariable UUID laundryServiceId, @PathVariable UUID customerId){
return laundryServicesService.associateLaundryServiceAndCustomer(customerId, laundryServiceId);
}
}

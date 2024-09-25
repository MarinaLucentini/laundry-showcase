package marinalucentini.laundryshowcase.repositories;

import marinalucentini.laundryshowcase.entities.LaundryServices;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LaundryServicesRepository extends JpaRepository<LaundryServices, UUID> {
    Optional<LaundryServices> findByName (String name);
}

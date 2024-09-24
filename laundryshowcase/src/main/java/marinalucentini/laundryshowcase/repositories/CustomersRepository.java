package marinalucentini.laundryshowcase.repositories;

import marinalucentini.laundryshowcase.entities.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomersRepository extends JpaRepository<Customers, UUID> {
}

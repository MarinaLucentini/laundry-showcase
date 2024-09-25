package marinalucentini.laundryshowcase.repositories;

import marinalucentini.laundryshowcase.entities.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Owner, UUID> {
    Optional<Owner> findByEmail (String email);
}

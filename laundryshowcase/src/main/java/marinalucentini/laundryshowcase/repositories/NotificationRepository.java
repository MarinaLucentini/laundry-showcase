package marinalucentini.laundryshowcase.repositories;

import marinalucentini.laundryshowcase.entities.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notifications, UUID> {
}

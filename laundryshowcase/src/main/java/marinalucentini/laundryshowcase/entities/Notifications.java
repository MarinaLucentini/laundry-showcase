package marinalucentini.laundryshowcase.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notifications {
    @Id
    @GeneratedValue
    private UUID id;
@ManyToOne
    private Customers customers;
@ManyToOne
    private LaundryServices laundryServices;
private String message;
}

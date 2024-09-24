package marinalucentini.laundryshowcase.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Customers {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
private String  email;
private String phone;

}

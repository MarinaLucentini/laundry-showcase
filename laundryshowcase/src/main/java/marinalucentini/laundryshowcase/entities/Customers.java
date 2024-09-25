package marinalucentini.laundryshowcase.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
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
@OneToMany (mappedBy = "customers")
    private List<LaundryServices> laundryServices;

}

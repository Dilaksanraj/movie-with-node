package fr.epita.movieapi.Repo;

import fr.epita.movieapi.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {

}

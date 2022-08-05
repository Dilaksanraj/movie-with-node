package fr.epita.movieapi.Repo;

import fr.epita.movieapi.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {

}

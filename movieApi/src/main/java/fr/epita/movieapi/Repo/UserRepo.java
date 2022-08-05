package fr.epita.movieapi.Repo;

import fr.epita.movieapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository <User, Long>{

}

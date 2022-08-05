package fr.epita.movieapi.Repo;

import fr.epita.movieapi.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<Contact, Long> {
}

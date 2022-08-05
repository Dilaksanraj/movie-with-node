package fr.epita.movieapi.Controller;

import com.fasterxml.jackson.annotation.JsonAlias;
import fr.epita.movieapi.Repo.AddressRepo;
import fr.epita.movieapi.Repo.ContactRepo;
import fr.epita.movieapi.Repo.RoleRepo;
import fr.epita.movieapi.Repo.UserRepo;
import fr.epita.movieapi.models.Address;
import fr.epita.movieapi.models.Contact;
import fr.epita.movieapi.models.Role;
import fr.epita.movieapi.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApiController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private RoleRepo roleRepo;

    @GetMapping(value = "/")
    public String getPage(){

        return "welcome";
    }

    @GetMapping(value = "/get-user")
    public List<User> getUser(){

        System.out.println("get user");
        return userRepo.findAll();
    }

    @PostMapping(value = "create-user")
    public User create(@RequestBody User user){

        long id = userRepo.save(user).getId();
        return userRepo.findById(id).get();
    }

    @PutMapping(value = "update-user/{id}")
    public String update(@PathVariable long id,  @RequestBody User user){

        User userObject = userRepo.findById(id).get();
        userObject.setUsername(user.getUsername());
        userRepo.save(userObject);

        return "updated...";
    }

    @DeleteMapping(value = "delete-user/{id}")
    public String delete(@PathVariable long id){

        User userObject = userRepo.findById(id).get();
        userRepo.delete(userObject);

        return "deleted...";
    }

//    Role Routes
    @GetMapping(value = "/get-role")
    public List<Role> getRole(){
        System.out.println("get role");
        return roleRepo.findAll();
    }

    @PostMapping(value = "create-role")
    public String create(@RequestBody Role role){

        roleRepo.save(role);
        return "saved...";
    }

    @DeleteMapping(value = "delete-role/{id}")
    public String deleteRole(@PathVariable long id){
            roleRepo.delete(roleRepo.findById(id).get());
            return "deleted....";

    }

//    Address variable
    @PostMapping(value = "create-address")
    public Address createAddress(@RequestBody Address address){
        long id = addressRepo.save(address).getId();
        return addressRepo.getById(id);

    }

    @GetMapping(value = "get-address")
    public List<Address> getAddress(){
        return addressRepo.findAll();

    }

    //    Address variable
    @PostMapping(value = "create-contact")
    public Contact createContact(@RequestBody Contact contact){
        long id = contactRepo.save(contact).getId();
        return contactRepo.getById(id);

    }

    @GetMapping(value = "get-contact")
    public List<Contact> getContact(){
        return contactRepo.findAll();

    }
}

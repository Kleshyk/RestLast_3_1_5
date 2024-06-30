package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleServiceImp implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> getRoles(String name) {
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByRole(name));
        return roles;
    }

    @Override
    public Role getRoleName(String name) {
        return roleRepository.findByRole(name);
    }

    @Override
    public List<Role> getRoleById(Long id) {
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.getOne(id));
        return roles;
    }


}

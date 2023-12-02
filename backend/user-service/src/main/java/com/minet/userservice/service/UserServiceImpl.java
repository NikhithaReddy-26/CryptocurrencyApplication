package com.minet.userservice.service;

import com.minet.userservice.dto.AuthDto;
import com.minet.userservice.dto.LoginDto;
import com.minet.userservice.dto.SignupDto;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.entity.User;
import com.minet.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.minet.userservice.exception.UserNotFoundException;
import org.modelmapper.ModelMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired JwtGeneratorImpl jwtGenerator;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto getUserById(int id) {
        log.info("Fetching user from the database with ID: {}", id);
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.warn("User not found with ID: {}", id);
            throw new UserNotFoundException("User not found with ID - " + id);
        }
        return modelMapper.map(user, UserDto.class);
    }


    @Override
    public UserDto getUser(LoginDto loginDto) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                    return modelMapper.map(user, UserDto.class);
                } else {
                    throw new UserNotFoundException("Invalid password");
                }
            } else {
                throw new UserNotFoundException("User Not Found");
            }
        } catch (Exception e) {
            throw new UserNotFoundException("User Not Found");
        }
    }
    @Override
    public UserDto createUser(SignupDto signupDto) {
        Optional<User> userOptional = userRepository.findByEmail(signupDto.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalArgumentException("User already Exists");
        } else {
            User user = new User();
            user.setEmail(signupDto.getEmail());
            user.setFull_name(signupDto.getName());
            user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
            user.setAccount_balance(signupDto.getAccountBalance());
            User savedUser = userRepository.save(user);
            return modelMapper.map(savedUser, UserDto.class);
        }
    }
  
    public boolean validateToken(String token) {
        return jwtGenerator.validateToken(token);
    }
    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> {
                    UserDto userDto = new UserDto();
                    userDto.setUser_id(user.getUser_id());
                    userDto.setEmail(user.getEmail());
                    userDto.setFull_name(user.getFull_name());
                    userDto.setAccount_balance(user.getAccount_balance());
                    return userDto;
                })
                .toList();
    }

    @Override
    public UserDto getUserDetailsFromToken(AuthDto authDto){
        try {
            User user= new User();
            user.setFull_name(authDto.getName());
            user.setEmail(authDto.getEmail());
            user.setAccount_balance(authDto.getAccountBalance());


            User isUser=userRepository.findByEmail(user.getEmail()).orElse(null);
            if(isUser!=null){
                UserDto userDto= new UserDto();
                userDto.setUser_id(isUser.getUser_id());
                userDto.setFull_name(isUser.getFull_name());
                userDto.setEmail(isUser.getEmail());
                userDto.setAccount_balance(isUser.getAccount_balance());

                return userDto;
            }
            userRepository.save(user);

            UserDto userDto= new UserDto();
            userDto.setUser_id(user.getUser_id());
            userDto.setFull_name(user.getFull_name());
            userDto.setEmail(user.getEmail());
            userDto.setAccount_balance(user.getAccount_balance());
            return (userDto);
        }catch (Exception e){
            throw new UserNotFoundException(e.getMessage());
        }
    }

    @Override
    public boolean verifyEmail(String email) {
        User user= userRepository.findByEmail(email).orElse(null);
        return user!=null;
    }

    @Override
    public void resetPassword(LoginDto loginDto) {
        User user=userRepository.findByEmail(loginDto.getEmail()).orElse(null);
        String encodedPassword=passwordEncoder.encode(loginDto.getPassword());
        if(user!=null){
            user.setPassword(encodedPassword);
            userRepository.save(user);

        }

    }

}


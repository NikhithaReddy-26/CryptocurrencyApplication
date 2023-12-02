package com.minet.userservice.service;

import static org.mockito.Mockito.*;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import com.minet.userservice.dto.AuthDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.minet.userservice.dto.LoginDto;
import com.minet.userservice.dto.SignupDto;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.entity.User;
import com.minet.userservice.exception.UserNotFoundException;
import com.minet.userservice.repository.UserRepository;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
 class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private JwtGeneratorImpl jwtGenerator;

    @InjectMocks
    private UserServiceImpl userService;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setUser_id(1);
        user.setFull_name("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("P@ssw0rd");
        user.setAccount_balance(100.0f);
        UserDto userDto = new UserDto();
        userDto.setUser_id(1);
        userDto.setFull_name("John Doe");
        userDto.setEmail("john@example.com");
        userDto.setAccount_balance(100.0f);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);
        UserDto result = userService.getUserById(1);
        assertNotNull(result);
        assertEquals(userDto.getUser_id(), result.getUser_id());
        assertEquals(userDto.getFull_name(), result.getFull_name());
        assertEquals(userDto.getEmail(), result.getEmail());
        assertEquals(userDto.getAccount_balance(), result.getAccount_balance());
    }

    @Test
   void testGetUserById_UserNotFound() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
   void testGetAllUsers_Success() {
        List<User> mockUsers = Arrays.asList(new User(), new User());
        when(userRepository.findAll()).thenReturn(mockUsers);
        List<UserDto> result = userService.getAllUsers();
        assertNotNull(result);
        assertEquals(mockUsers.size(), result.size());
    }

    @Test
    void testGetUser_InvalidPassword() {
        String userEmail = "test@example.com";
        String userPassword = "password";
        User mockUser = new User();
        mockUser.setEmail(userEmail);
        mockUser.setPassword(passwordEncoder.encode("wrongpassword"));

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(userPassword, mockUser.getPassword())).thenReturn(false);

        LoginDto loginDto = new LoginDto(userEmail, userPassword);
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUser(loginDto);
        });
    }



    @Test
    void testVerifyEmail_UserExists() {
        String userEmail = "existing@example.com";
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(new User()));

        boolean result = userService.verifyEmail(userEmail);

        assertTrue(result);
    }

    @Test
     void testVerifyEmail_UserDoesNotExist() {
        String userEmail = "nonexistent@example.com";
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());

        boolean result = userService.verifyEmail(userEmail);

        assertFalse(result);
    }

    @Test
    void testCreateUser_DuplicateEmail() {
        SignupDto signupDto = new SignupDto();
        signupDto.setEmail("john@example.com");

        User mockUser = new User();
        mockUser.setEmail(signupDto.getEmail());

        when(userRepository.findByEmail(signupDto.getEmail())).thenReturn(Optional.of(mockUser));

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(signupDto));
    }

    @Test
   void testGetUserDetailsFromToken_Success() {
        AuthDto authDto = new AuthDto();
        authDto.setEmail("john@example.com");
        User mockUser = new User();
        mockUser.setEmail(authDto.getEmail());
        when(userRepository.findByEmail(authDto.getEmail())).thenReturn(Optional.of(mockUser));
        UserDto result = userService.getUserDetailsFromToken(authDto);
        assertNotNull(result);
        assertEquals(authDto.getEmail(), result.getEmail());
    }

    @Test
    void testResetPassword() {
        String oldEncodedPassword = "$2a$10$gAQcvRVGLzXr9vBMQhKLr.Kn7r0BfEH6e.nITWqUzElRLw85yxo/u";
        String newEncodedPassword = "$2a$10$newlyGeneratedEncodedPassword";

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("johndoe@example.com");
        loginDto.setPassword("newPassword");

        User user = new User();
        user.setEmail("johndoe@example.com");
        user.setPassword(oldEncodedPassword);

        when(userRepository.findByEmail(loginDto.getEmail())).thenReturn(java.util.Optional.of(user));
        when(passwordEncoder.encode(loginDto.getPassword())).thenReturn(newEncodedPassword);

        userService.resetPassword(loginDto);

        verify(userRepository, times(1)).findByEmail(loginDto.getEmail());
        verify(passwordEncoder, times(1)).encode(loginDto.getPassword());
        verify(userRepository, times(1)).save(user);
        assertEquals(newEncodedPassword, user.getPassword());
    }


    @Test
    void testCreateUser() {
        SignupDto signupDto = createSampleSignupDto();

        User userToSave = createUserToSave(signupDto);
        User savedUser = createUserWithSavedData(userToSave);

        when(userRepository.findByEmail(signupDto.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(signupDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(savedUser);

        UserDto expectedUserDto = createUserDtoFrom(savedUser);
        when(modelMapper.map(savedUser, UserDto.class)).thenReturn(expectedUserDto);

        UserDto result = userService.createUser(signupDto);

        assertNotNull(result);
        assertEquals(expectedUserDto, result);

        verify(userRepository, times(1)).findByEmail(signupDto.getEmail());
        verify(passwordEncoder, times(1)).encode(signupDto.getPassword());
        verify(userRepository, times(1)).save(any());
        verify(modelMapper, times(1)).map(savedUser, UserDto.class);
    }

    private SignupDto createSampleSignupDto() {
        SignupDto signupDto = new SignupDto();
        signupDto.setName("John Doe");
        signupDto.setEmail("johndoe@example.com");
        signupDto.setAccountBalance(1000.0f);
        signupDto.setPassword("password");
        return signupDto;
    }

    private User createUserToSave(SignupDto signupDto) {
        User userToSave = new User();
        userToSave.setEmail(signupDto.getEmail());
        userToSave.setFull_name(signupDto.getName());
        userToSave.setPassword("encodedPassword");
        userToSave.setAccount_balance(signupDto.getAccountBalance());
        return userToSave;
    }

    private User createUserWithSavedData(User userToSave) {
        User savedUser = new User();
        savedUser.setUser_id(1);
        savedUser.setEmail(userToSave.getEmail());
        savedUser.setFull_name(userToSave.getFull_name());
        savedUser.setPassword(userToSave.getPassword());
        savedUser.setAccount_balance(userToSave.getAccount_balance());
        return savedUser;
    }

    private UserDto createUserDtoFrom(User savedUser) {
        UserDto expectedUserDto = new UserDto();
        expectedUserDto.setUser_id(savedUser.getUser_id());
        expectedUserDto.setFull_name(savedUser.getFull_name());
        expectedUserDto.setEmail(savedUser.getEmail());
        expectedUserDto.setAccount_balance(savedUser.getAccount_balance());
        return expectedUserDto;
    }

    @Test
    void testGetUserDetailsFromToken_UserNotExists() {
        AuthDto authDto = new AuthDto();
        authDto.setName("John Doe");
        authDto.setEmail("johndoe@example.com");
        authDto.setAccountBalance(1000.0f);

        when(userRepository.findByEmail(authDto.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));



        UserDto result = userService.getUserDetailsFromToken(authDto);

        assertNotNull(result);
        assertNotNull(result.getUser_id());
        assertEquals(authDto.getName(), result.getFull_name());
        assertEquals(authDto.getEmail(), result.getEmail());
        assertEquals(authDto.getAccountBalance(), result.getAccount_balance());
        verify(userRepository, times(1)).findByEmail(authDto.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }
    @Test
    void testGetUserDetailsFromToken_UserNotExistsException() {
        AuthDto authDto = new AuthDto();
        authDto.setName("John Doe");
        authDto.setEmail("johndoe@example.com");
        authDto.setAccountBalance(1000.0f);

        when(userRepository.findByEmail(authDto.getEmail())).thenThrow(new RuntimeException("Some error message"));

        assertThrows(UserNotFoundException.class, () -> userService.getUserDetailsFromToken(authDto));

        verify(userRepository, times(1)).findByEmail(authDto.getEmail());
    }
    @Test
    void testValidateToken_ValidToken() {
        String token = "valid_token";

        when(jwtGenerator.validateToken(token)).thenReturn(true);

        boolean result = userService.validateToken(token);

        assertTrue(result);

        verify(jwtGenerator, times(1)).validateToken(token);
    }

    @Test
    void testValidateToken_InvalidToken() {
        String token = "invalid_token";

        when(jwtGenerator.validateToken(token)).thenReturn(false);

        boolean result = userService.validateToken(token);

        assertFalse(result);

        verify(jwtGenerator, times(1)).validateToken(token);
    }
    @Test
    void testGetUser_UserFoundAndPasswordMatches() {
        String userEmail = "test@example.com";
        String userPassword = "password";

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail(userEmail);
        loginDto.setPassword(userPassword);

        User mockUser = new User();
        mockUser.setEmail(userEmail);
        mockUser.setPassword(passwordEncoder.encode(userPassword));

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(userPassword, mockUser.getPassword())).thenReturn(true);

        UserDto result = userService.getUser(loginDto);

        assertNull(result);

        verify(userRepository, times(1)).findByEmail(userEmail);
        verify(passwordEncoder, times(1)).matches(userPassword, mockUser.getPassword());
        verify(modelMapper, times(1)).map(mockUser, UserDto.class);
    }

    @Test
    void testGetUser_UserFoundAndPasswordDoesNotMatch() {
        String userEmail = "test@example.com";
        String userPassword = "password";

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail(userEmail);
        loginDto.setPassword(userPassword);

        User mockUser = new User();
        mockUser.setEmail(userEmail);
        mockUser.setPassword(passwordEncoder.encode("wrongpassword"));

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(userPassword, mockUser.getPassword())).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.getUser(loginDto));

        verify(userRepository, times(1)).findByEmail(userEmail);
        verify(passwordEncoder, times(1)).matches(userPassword, mockUser.getPassword());
        verify(modelMapper, never()).map(mockUser, UserDto.class);
    }

    @Test
    void testGetUser_UserNotFound() {
        String userEmail = "test@example.com";
        String userPassword = "password";

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail(userEmail);
        loginDto.setPassword(userPassword);

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUser(loginDto));

        verify(userRepository, times(1)).findByEmail(userEmail);
        verify(passwordEncoder, never()).matches(any(), any());
        verify(modelMapper, never()).map(any(), eq(UserDto.class));
    }

}
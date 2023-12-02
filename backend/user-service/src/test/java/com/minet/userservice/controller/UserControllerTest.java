package com.minet.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.exception.UserNotFoundException;
import com.minet.userservice.service.UserService;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.minet.userservice.dto.*;
import com.minet.userservice.service.JwtGenerator;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;


@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtGenerator jwtGenerator;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        MockitoAnnotations.openMocks(this);
    }
    private MockMvc mockMvc;
    @Test
    void testGetUserById_Success() throws UserNotFoundException {
        int userId = 1;
        UserDto mockUserDto = new UserDto();
        mockUserDto.setUser_id(userId);
        when(userService.getUserById(userId)).thenReturn(mockUserDto);
        ResponseEntity<Object> response = userController.getUserById(userId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockUserDto, response.getBody());
    }


    @Test
    void testGetUserById_UserNotFound() throws UserNotFoundException {
        int userId = 1;
        when(userService.getUserById(userId)).thenReturn(null);
        ResponseEntity<Object> response = userController.getUserById(userId);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
    void testGetUserById_Exception() throws UserNotFoundException {
        int userId = 1;
        when(userService.getUserById(userId)).thenThrow(UserNotFoundException.class);
        ResponseEntity<Object> response = userController.getUserById(userId);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("User not found with ID - " + userId, response.getBody());
    }


    @Test
    void testGetUserById_InternalServerError() throws UserNotFoundException {
        int userId = 1;
        when(userService.getUserById(userId)).thenThrow(new RuntimeException("Some exception"));
        ResponseEntity<Object> response = userController.getUserById(userId);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Failed to retrieve user with ID - " + userId, response.getBody());
    }


    @Test
    void testLogin_Success() throws UserNotFoundException {
        LoginDto mockLoginDto = new LoginDto();
        UserDto mockUserDto = new UserDto();
        when(userService.getUser(mockLoginDto)).thenReturn(mockUserDto);
        when(jwtGenerator.generateToken(mockUserDto)).thenReturn(Collections.singletonMap("token", "mockToken"));
        ResponseEntity<UserResponseDto> response = userController.login(mockLoginDto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockUserDto, response.getBody().getUser());
    }

    @Test
    void testRegister_Success() {
        SignupDto mockSignupDto = new SignupDto();
        UserDto mockCreatedUser = new UserDto();
        when(userService.createUser(mockSignupDto)).thenReturn(mockCreatedUser);
        when(jwtGenerator.generateToken(mockCreatedUser)).thenReturn(Collections.singletonMap("token", "mockToken"));
        ResponseEntity<UserResponseDto> response = userController.register(mockSignupDto);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockCreatedUser, response.getBody().getUser());
    }

    @Test
    void testRegister_Conflict() {
        SignupDto mockSignupDto = new SignupDto();
        when(userService.createUser(mockSignupDto)).thenThrow(IllegalArgumentException.class);
        ResponseEntity<UserResponseDto> response = userController.register(mockSignupDto);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }
    @Test
    void testValidateToken_ValidToken() {
        String mockToken = "mockToken";
        when(userService.validateToken(mockToken)).thenReturn(true);
        ResponseEntity<String> response = userController.validateToken(mockToken);
        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() != null && response.getBody().equals("Valid Request");
    }

    @Test
    void testValidateToken_InvalidToken() {
        String mockToken = "mockToken";
        when(userService.validateToken(mockToken)).thenReturn(false);
        ResponseEntity<String> response = userController.validateToken(mockToken);
        assert response.getStatusCode() == HttpStatus.NOT_FOUND;
        assert response.getBody() != null && response.getBody().equals("Invalid Request");
    }
    @Test
    void testGetAllUsers_Success() {
        List<UserDto> mockUsers = Arrays.asList(new UserDto(), new UserDto());
        when(userService.getAllUsers()).thenReturn(mockUsers);
        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(mockUsers.size(), response.getBody().size());
    }


    @Test
    void testGetAllUsers_Exception() {
        when(userService.getAllUsers()).thenThrow(UserNotFoundException.class);
        assertThrows(UserNotFoundException.class, () -> userController.getAllUsers());
    }

    @Test
   void testResetPassword_Success() {
        LoginDto mockLoginDto = new LoginDto();
        ResponseEntity<String> response = userController.resetPassword(mockLoginDto);
        assert response.getStatusCode() == HttpStatus.OK;
        assert response.getBody() != null && response.getBody().equals("Password Reset Successfully");
        verify(userService).resetPassword(mockLoginDto);
    }

    @Test
    void testLogin_Unauthorized() {
        LoginDto mockLoginDto = new LoginDto();
        when(userService.getUser(mockLoginDto)).thenThrow(IllegalArgumentException.class);
        ResponseEntity<UserResponseDto> response = userController.login(mockLoginDto);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testLogin_UserNotFound() {
        LoginDto mockLoginDto = new LoginDto();
        when(userService.getUser(mockLoginDto)).thenThrow(UserNotFoundException.class);
        ResponseEntity<UserResponseDto> response = userController.login(mockLoginDto);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
     void testAuth0Register_Success() throws Exception {
        AuthDto authDto = new AuthDto();
        authDto.setName("John Doe");
        authDto.setEmail("johndoe@example.com");

        UserDto mockUserDto = new UserDto();
        mockUserDto.setUser_id(1);
        mockUserDto.setFull_name(authDto.getName());
        mockUserDto.setEmail(authDto.getEmail());

        when(userService.getUserDetailsFromToken(authDto)).thenReturn(mockUserDto);

        Map<String, String> mockToken = new HashMap<>();
        mockToken.put("token", "mockTokenValue");
        when(jwtGenerator.generateToken(mockUserDto)).thenReturn(mockToken);

        mockMvc.perform(post("/users/auth0")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.user.user_id", is(mockUserDto.getUser_id())))
                .andExpect(jsonPath("$.user.full_name", is(mockUserDto.getFull_name())))
                .andExpect(jsonPath("$.user.email", is(mockUserDto.getEmail())))
                .andExpect(jsonPath("$.token.token", is(mockToken.get("token"))));
    }

}



import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "./user.service";
import { User } from "../user.model";
import { JwtService } from "./jwt.service";
import { Router } from "@angular/router";

describe("UserService", () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let jwtService: JwtService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        JwtService,
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    jwtService = TestBed.inject(JwtService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should login", () => {
    const credentials = { email: "test@example.com", password: "password" };
    const mockUser: User = {
        username: "test", email: "test@example.com", token: "jwt-token",
        bio: "",
        image: ""
    };

    service.login(credentials).subscribe(response => {
      expect(response.user).toEqual(mockUser);
    });

    const req = httpMock.expectOne("/users/login");
    expect(req.request.method).toBe("POST");
    req.flush({ user: mockUser });
  });

  it("should handle login error", () => {
    const credentials = { email: "test@example.com", password: "password" };
    const errorResponse = { message: "Login error" };

    service.login(credentials).subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
      }
    });

    const req = httpMock.expectOne("/users/login");
    expect(req.request.method).toBe("POST");
  });

  it("should register", () => {
    const credentials = { username: "test", email: "test@example.com", password: "password" };
    const mockUser: User = {
        username: "test", email: "test@example.com", token: "jwt-token",
        bio: "",
        image: ""
    };

    service.register(credentials).subscribe(response => {
      expect(response.user).toEqual(mockUser);
    });

    const req = httpMock.expectOne("/users");
    expect(req.request.method).toBe("POST");
    req.flush({ user: mockUser });
  });

  it("should handle register error", () => {
    const credentials = { username: "test", email: "test@example.com", password: "password" };
    const errorResponse = { message: "Registration error" };

    service.register(credentials).subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
      }
    });

    const req = httpMock.expectOne("/users");
    expect(req.request.method).toBe("POST");
  });

  it("should logout", () => {
    const spyDestroyToken = spyOn(jwtService, "destroyToken");
    const navigateSpy = spyOn(router, "navigate");

    service.logout();

    expect(spyDestroyToken).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(["/"]);
  });

  it("should get current user", () => {
    const mockUser: User = {
        username: "test", email: "test@example.com", token: "jwt-token",
        bio: "",
        image: ""
    };

    service.getCurrentUser().subscribe(response => {
      expect(response.user).toEqual(mockUser);
    });

    const req = httpMock.expectOne("/user");
    expect(req.request.method).toBe("GET");
    req.flush({ user: mockUser });
  });

  it("should handle getCurrentUser error", () => {
    const errorResponse = { message: "Get current user error" };

    service.getCurrentUser().subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
      }
    });

    const req = httpMock.expectOne("/user");
    expect(req.request.method).toBe("GET");
  });

  it("should update user", () => {
    const updatedUser: Partial<User> = { username: "newtest" };
    const mockUser: User = {
        username: "newtest", email: "test@example.com", token: "jwt-token",
        bio: "",
        image: ""
    };

    service.update(updatedUser).subscribe(response => {
      expect(response.user).toEqual(mockUser);
    });

    const req = httpMock.expectOne("/user");
    expect(req.request.method).toBe("PUT");
    req.flush({ user: mockUser });
  });

  it("should handle update error", () => {
    const updatedUser: Partial<User> = { username: "newtest" };
    const errorResponse = { message: "Update user error" };

    service.update(updatedUser).subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
      }
    });

    const req = httpMock.expectOne("/user");
    expect(req.request.method).toBe("PUT");
  });

  it("should set authentication", () => {
    const mockUser: User = {
        username: "test", email: "test@example.com", token: "jwt-token",
        bio: "",
        image: ""
    };
    const spySaveToken = spyOn(jwtService, "saveToken");
    service.setAuth(mockUser);
    expect(spySaveToken).toHaveBeenCalledWith(mockUser.token);
  });
});

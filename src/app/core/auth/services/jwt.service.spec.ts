import { TestBed } from "@angular/core/testing";
import { JwtService } from "./jwt.service";

describe("JwtService", () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService],
    });
    service = TestBed.inject(JwtService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should save and retrieve token", () => {
    const token = "exampleToken";
    service.saveToken(token);
    const retrievedToken = service.getToken();
    expect(retrievedToken).toEqual(token);
  });

  it("should remove token", () => {
    const token = "exampleToken";
    service.saveToken(token);
    service.destroyToken();
    const retrievedToken = service.getToken();
    expect(retrievedToken).toBeUndefined
    ();
  });
});

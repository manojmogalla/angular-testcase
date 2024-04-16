import { ComponentFixture, TestBed, flush, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FavoriteButtonComponent } from "./favorite-button.component";
import { ArticlesService } from "../services/articles.service";
import { UserService } from "../../../core/auth/services/user.service";
import { BehaviorSubject, of } from "rxjs";
import { Article } from "../models/article.model";

describe("FavoriteButtonComponent", () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;
  let articlesServiceSpy: jasmine.SpyObj<ArticlesService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    const articlesServiceSpyObj = jasmine.createSpyObj("ArticlesService", [
      "favorite",
      "unfavorite",
    ]);
    const userServiceSpyObj = jasmine.createSpyObj("UserService", [
      "isAuthenticated",
    ]);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: ArticlesService, useValue: articlesServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj },
      ],
    }).compileComponents();

    articlesServiceSpy = TestBed.inject(
      ArticlesService,
    ) as jasmine.SpyObj<ArticlesService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(FavoriteButtonComponent);
    component = fixture.componentInstance;
    const article: Article = {
      slug: "test-article",
      title: "Test Article",
      description: "Test Description",
      body: "Test Body",
      tagList: [],
      createdAt: "2024-04-11",
      updatedAt: "2024-04-11",
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "test",
        bio: "Test bio",
        image: "test.jpg",
        following: false,
      },
    };
    component.article = article;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle favorite", () => {
    const article: Article = {
      slug: "test-article",
      title: "Test Article",
      description: "Test Description",
      body: "Test Body",
      tagList: [],
      createdAt: "2024-04-11",
      updatedAt: "2024-04-11",
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "test",
        bio: "Test bio",
        image: "test.jpg",
        following: false,
      },
    };
    component.article = article;

    userServiceSpy.isAuthenticated = new BehaviorSubject<boolean>(true);
    articlesServiceSpy.favorite.and.returnValue(of(article));
    component.toggleFavorite();
    expect(articlesServiceSpy.favorite).toHaveBeenCalledWith(article.slug);
  });

  it("should navigate to register page if user is not authenticated", () => {
    const navigateSpy = spyOn(router, "navigate");
    userServiceSpy.isAuthenticated = new BehaviorSubject<boolean>(false);
    component.toggleFavorite();
    expect(navigateSpy).toHaveBeenCalledWith(["/register"]);
  });
  it("should handle error", () => {
    userServiceSpy.isAuthenticated = new BehaviorSubject<boolean>(true);
    component.toggleFavorite();

    expect(component.isSubmitting).toBe(false);
  });
});

import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ArticlePreviewComponent } from "./article-preview.component";
import { Article } from "../models/article.model";
import { By } from "@angular/platform-browser";

describe("ArticlePreviewComponent", () => {
  let component: ArticlePreviewComponent;
  let fixture: ComponentFixture<ArticlePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewComponent);
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

  it("should display article title and description", () => {
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
    const titleElement = fixture.debugElement.query(By.css("h1"));
    const descriptionElement = fixture.debugElement.query(By.css("p"));
    expect(titleElement.nativeElement.textContent).toBe(article.title);
    expect(descriptionElement.nativeElement.textContent).toBe(
      article.description,
    );
  });

  it("should display article tags", () => {
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
    const tagElements = fixture.debugElement.queryAll(By.css(".tag-list li"));
    expect(tagElements.length).toBe(article.tagList.length);
  });

  it("should link to article detail page", () => {
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
    const linkElement = fixture.debugElement.query(By.css(".preview-link"));
    expect(linkElement.nativeElement.getAttribute("href")).toBe(
      `/article/${article.slug}`,
    );
  });

  it("should toggle favorite status", () => {
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
    expect(component.article.favorited).toBe(false);
    expect(component.article.favoritesCount).toBe(0);
    component.toggleFavorite(true);
    expect(component.article.favorited).toBe(true);
    expect(component.article.favoritesCount).toBe(1);
    component.toggleFavorite(false);
    expect(component.article.favorited).toBe(false);
    expect(component.article.favoritesCount).toBe(0);
  });
});

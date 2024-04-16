import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ArticlesService } from "./articles.service";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

describe("ArticlesService", () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService],
    });
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should query articles", () => {
    const config: ArticleListConfig = {
      filters: {},
      type: "feed"
    };
    const mockResponse = { articles: [], articlesCount: 0 };

    service.query(config).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne("/articles/feed");
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("should get article by slug", () => {
    const slug = "test-article";
    const mockArticle: Article ={
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
    service.get(slug).subscribe(article => {
      expect(article).toEqual(mockArticle);
    });

    const req = httpMock.expectOne(`/articles/${slug}`);
    expect(req.request.method).toBe("GET");
    req.flush({ article: mockArticle });
  });

  it("should delete article by slug", () => {
    const slug = "test-article";

    service.delete(slug).subscribe(() => {
      expect().nothing(); 
    });

    const req = httpMock.expectOne(`/articles/${slug}`);
    expect(req.request.method).toBe("DELETE");
    req.flush({});
  });

  it("should create article", () => {
    const mockArticle: Partial<Article> = {
      title: "New Article",
      description: "Description",
      body: "Body",
      tagList: ["tag1", "tag2"]
    };
    const createdArticle: Article = {
      ...mockArticle as Article,
      slug: "new-article-slug",
      createdAt: "2022-04-01",
      updatedAt: "2022-04-01",
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "test",
        bio: "Test bio",
        image: "test.jpg",
        following: false,
      },
    };
 

    service.create(mockArticle).subscribe(article => {
      expect(article).toEqual(createdArticle);
    });

    const req = httpMock.expectOne("/articles/");
    expect(req.request.method).toBe("POST");
    req.flush({ article: createdArticle });
  });

  it("should update article", () => {
    const mockArticle: Partial<Article> = {
      slug: "test-article",
      title: "Updated Article",
      description: "Updated Description",
      body: "Updated Body",
      tagList: ["updated-tag1", "updated-tag2"]
    };
    const updatedArticle: Article = {
      ...mockArticle as Article,
      createdAt: "2022-04-01",
      updatedAt: "2022-04-02",
      favorited: false,
      favoritesCount: 0,
     author: {
          username: "test",
          bio: "Test bio",
          image: "test.jpg",
          following: false,
        },
    };

    service.update(mockArticle).subscribe(article => {
      expect(article).toEqual(updatedArticle);
    });

    const req = httpMock.expectOne(`/articles/${mockArticle.slug}`);
    expect(req.request.method).toBe("PUT");
    req.flush({ article: updatedArticle });
  });

  it("should favorite article", () => {
    const slug = "test-article";
    const mockArticle: Article = {
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

    service.favorite(slug).subscribe(article => {
      expect(article).toEqual(mockArticle);
    });

    const req = httpMock.expectOne(`/articles/${slug}/favorite`);
    expect(req.request.method).toBe("POST");
    req.flush({ article: mockArticle });
  });

  it("should unfavorite article", () => {
    const slug = "test-article";

    service.unfavorite(slug).subscribe(() => {
      expect().nothing(); 
    });

    const req = httpMock.expectOne(`/articles/${slug}/favorite`);
    expect(req.request.method).toBe("DELETE");
    req.flush({});
  });
  it("should add filters to HttpParams in query method", () => {
    const config: ArticleListConfig = {
      filters: {
        tag: "angular",
        author: "user123",
      },
      type: "feed"
    };
  
    service.query(config).subscribe();
  
    const req = httpMock.expectOne(req => {
      return req.url === "/articles/feed" && req.params.toString() === "tag=angular&author=user123";
    });
    expect(req.request.method).toBe("GET");
  
    req.flush({ articles: [], articlesCount: 0 });
  });
  
  it("should handle empty type in query method", () => {
    const config: ArticleListConfig = {
      filters: {
        tag: "angular",
        author: "user123",
      },
      type: ""
    };
    service.query(config).subscribe();
    const req = httpMock.expectOne(req => {
      return req.url === "/articles" && req.params.toString() === "tag=angular&author=user123";
    });
    expect(req.request.method).toBe("GET");
  });
  
});

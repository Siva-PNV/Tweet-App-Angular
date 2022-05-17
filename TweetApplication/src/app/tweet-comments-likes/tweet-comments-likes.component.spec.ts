import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetCommentsLikesComponent } from './tweet-comments-likes.component';

describe('TweetCommentsLikesComponent', () => {
  let component: TweetCommentsLikesComponent;
  let fixture: ComponentFixture<TweetCommentsLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetCommentsLikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetCommentsLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

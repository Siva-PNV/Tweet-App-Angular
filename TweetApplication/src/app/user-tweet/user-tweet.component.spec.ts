import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTweetComponent } from './user-tweet.component';

describe('UserTweetComponent', () => {
  let component: UserTweetComponent;
  let fixture: ComponentFixture<UserTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

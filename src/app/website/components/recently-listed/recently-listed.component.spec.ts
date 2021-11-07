import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyListedComponent } from './recently-listed.component';

describe('RecentlyListedComponent', () => {
  let component: RecentlyListedComponent;
  let fixture: ComponentFixture<RecentlyListedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyListedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVolumeComponent } from './info-volume.component';

describe('InfoVolumeComponent', () => {
  let component: InfoVolumeComponent;
  let fixture: ComponentFixture<InfoVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

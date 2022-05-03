import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgPianoPlayComponent } from './sg-piano-play.component';

describe('SgPianoPlayComponent', () => {
  let component: SgPianoPlayComponent;
  let fixture: ComponentFixture<SgPianoPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgPianoPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgPianoPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

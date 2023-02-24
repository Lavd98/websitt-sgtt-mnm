import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsistemasComponent } from './subsistemas.component';

describe('SubsistemasComponent', () => {
  let component: SubsistemasComponent;
  let fixture: ComponentFixture<SubsistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsistemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaPodatakaComponent } from './izmena-podataka.component';

describe('IzmenaPodatakaComponent', () => {
  let component: IzmenaPodatakaComponent;
  let fixture: ComponentFixture<IzmenaPodatakaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IzmenaPodatakaComponent]
    });
    fixture = TestBed.createComponent(IzmenaPodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputrequiredComponent } from './inputrequired.component';

describe('InputrequiredComponent', () => {
  let component: InputrequiredComponent;
  let fixture: ComponentFixture<InputrequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputrequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputrequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

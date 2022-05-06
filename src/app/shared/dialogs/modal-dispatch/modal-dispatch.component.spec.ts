import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDispatchComponent } from './modal-dispatch.component';

describe('ModalDispatchComponent', () => {
  let component: ModalDispatchComponent;
  let fixture: ComponentFixture<ModalDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

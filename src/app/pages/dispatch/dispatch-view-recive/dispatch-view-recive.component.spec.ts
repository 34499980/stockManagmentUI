import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchViewReciveComponent } from './dispatch-view-recive.component';

describe('DispatchViewReciveComponent', () => {
  let component: DispatchViewReciveComponent;
  let fixture: ComponentFixture<DispatchViewReciveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchViewReciveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchViewReciveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

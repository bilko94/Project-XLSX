import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttsystemsFormComponent } from './nttsystems-form.component';

describe('NttsystemsFormComponent', () => {
  let component: NttsystemsFormComponent;
  let fixture: ComponentFixture<NttsystemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttsystemsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttsystemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

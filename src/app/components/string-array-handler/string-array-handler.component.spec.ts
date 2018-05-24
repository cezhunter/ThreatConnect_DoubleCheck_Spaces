import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringArrayHandlerComponent } from './string-array-handler.component';

describe('StringArrayHandlerComponent', () => {
  let component: StringArrayHandlerComponent;
  let fixture: ComponentFixture<StringArrayHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringArrayHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringArrayHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormsControlsComponent } from './template-forms-controls.component';

describe('TemplateFormsControlsComponent', () => {
  let component: TemplateFormsControlsComponent;
  let fixture: ComponentFixture<TemplateFormsControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormsControlsComponent]
    });
    fixture = TestBed.createComponent(TemplateFormsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

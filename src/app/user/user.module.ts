import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { TemplateFormsControlsComponent } from './template-forms-controls/template-forms-controls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    TemplateFormsControlsComponent
  ],
  imports: [
    CommonModule, 
    FormsModule
  ]
})
export class UserModule { }

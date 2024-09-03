import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bot-template-form-controls',
  templateUrl: './template-forms-controls.component.html',
  styleUrls: ['./template-forms-controls.component.css'],
})

export class TemplateFormsControlsComponent implements OnInit {
  textInput: string = '';
  numericInput: string = '';
  stringInput: string = '';
  numericSelect: number = 0;
  checkboxInput: boolean = false;
  radioInput: number | null = null;

  selectOptions: any[] = [
    { text: 'Option One', value: 1 },
    { text: 'Option Two', value: 2 },
  ];
  constructor() {}

  ngOnInit(): void {}

  getType(value: any) {
    if (value === null || value === undefined) return '';

    console.log('ns', this.numericSelect);
    return typeof value;
  }
}

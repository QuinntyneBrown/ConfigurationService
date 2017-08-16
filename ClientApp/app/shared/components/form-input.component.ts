import { Component, ViewContainerRef } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: "./form-input.component.html",
    styleUrls: [
        "../../../styles/forms.css",
        "./form-input.component.css"
    ],
    selector: "ce-form-input"
})
export class FormInputComponent {
    public name: string;

    public label: string;

    public formGroup: FormGroup;
}

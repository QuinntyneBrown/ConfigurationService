import {
    Component,
    Input,
    OnInit,
    EventEmitter,
    Output,
    AfterViewInit,
    AfterContentInit,
    Renderer,
    ElementRef,
} from "@angular/core";

import {FormGroup,FormControl,Validators} from "@angular/forms";

@Component({
    templateUrl: "./configuration-item-edit.component.html",
    styleUrls: [
        "../../styles/forms.css",
        "../../styles/edit.css",
        "./configuration-item-edit.component.css"],
    selector: "ce-configuration-item-edit"
})
export class ConfigurationItemEditComponent {
    constructor() {
        this.tryToSave = new EventEmitter();
    }

    @Output()
    public tryToSave: EventEmitter<any>;

    private _configurationItem: any = {};

    @Input("configurationItem")
    public set configurationItem(value) {
        this._configurationItem = value;

        this.form.patchValue({
            id: this._configurationItem.id,
            name: this._configurationItem.name,
        });
    }
   
    public form = new FormGroup({
        id: new FormControl(0, []),
        name: new FormControl('', [Validators.required])
    });
}

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
    templateUrl: "./configuration-item-key-edit.component.html",
    styleUrls: [
        "../../styles/forms.css",
        "../../styles/edit.css",
        "./configuration-item-key-edit.component.css"],
    selector: "ce-configuration-item-key-edit"
})
export class ConfigurationItemKeyEditComponent {
    constructor() {
        this.tryToSave = new EventEmitter();
    }

    @Output()
    public tryToSave: EventEmitter<any>;

    private _configurationItemKey: any = {};

    @Input("configurationItemKey")
    public set configurationItemKey(value) {
        this._configurationItemKey = value;

        this.form.patchValue({
            id: this._configurationItemKey.id,
            name: this._configurationItemKey.name,
        });
    }
   
    public form = new FormGroup({
        id: new FormControl(0, []),
        name: new FormControl('', [Validators.required])
    });
}

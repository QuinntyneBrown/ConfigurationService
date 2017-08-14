import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./configuration-item-key-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./configuration-item-key-list-item.component.css"
    ],
    selector: "ce-configuration-item-key-list-item"
})
export class ConfigurationItemKeyListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public configurationItemKey: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}

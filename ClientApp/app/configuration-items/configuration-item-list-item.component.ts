import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./configuration-item-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./configuration-item-list-item.component.css"
    ],
    selector: "ce-configuration-item-list-item"
})
export class ConfigurationItemListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public configurationItem: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}

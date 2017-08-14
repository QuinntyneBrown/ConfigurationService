import {Component,Input, Output, EventEmitter, NgZone} from "@angular/core";
import {toPageListFromInMemory,IPagedList} from "../shared/components/pager.component";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    templateUrl: "./configuration-item-key-paginated-list.component.html",
    styleUrls: [
        "../../styles/forms.css",
        "../../styles/list.css",
        "./configuration-item-key-paginated-list.component.css"
    ],
    selector: "ce-configuration-item-key-paginated-list"
})
export class ConfigurationItemKeyPaginatedListComponent { 
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.filterKeyUp = new EventEmitter();
        this.pagedList = toPageListFromInMemory([], this.pageNumber, this.pageSize);
    }

    ngOnInit() {
        this.pagedList = toPageListFromInMemory(this.configurationItemKeys, this.pageNumber, this.pageSize);
    }

    public setPageNumber($event) {        
        this.pageNumber = $event.detail.pageNumber;
        this.pagedList = toPageListFromInMemory(this.configurationItemKeys, this.pageNumber, this.pageSize);
    }
    private _configurationItemKeys = [];

    public get configurationItemKeys() {
        return this._configurationItemKeys;
    }
    @Input("configurationItemKeys")
    public set configurationItemKeys(value) {        
        this._configurationItemKeys = value;
        this.pagedList = toPageListFromInMemory(this.configurationItemKeys, this.pageNumber, this.pageSize);           
    }
    
    public pagedList: IPagedList<any> = <any>{};

    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;
    
    @Output()
    public filterKeyUp: EventEmitter<any>;
    
    public pageNumber: number = 1;

    public pageSize: number = 5;    
}

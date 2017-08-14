import {Component,Input, Output, EventEmitter, NgZone} from "@angular/core";
import {toPageListFromInMemory,IPagedList} from "../shared/components/pager.component";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    templateUrl: "./configuration-item-paginated-list.component.html",
    styleUrls: [
        "../../styles/forms.css",
        "../../styles/list.css",
        "./configuration-item-paginated-list.component.css"
    ],
    selector: "ce-configuration-item-paginated-list"
})
export class ConfigurationItemPaginatedListComponent { 
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.filterKeyUp = new EventEmitter();
        this.pagedList = toPageListFromInMemory([], this.pageNumber, this.pageSize);
    }

    ngOnInit() {
        this.pagedList = toPageListFromInMemory(this.configurationItems, this.pageNumber, this.pageSize);
    }

    public setPageNumber($event) {        
        this.pageNumber = $event.detail.pageNumber;
        this.pagedList = toPageListFromInMemory(this.configurationItems, this.pageNumber, this.pageSize);
    }
    private _configurationItems = [];

    public get configurationItems() {
        return this._configurationItems;
    }
    @Input("configurationItems")
    public set configurationItems(value) {        
        this._configurationItems = value;
        this.pagedList = toPageListFromInMemory(this.configurationItems, this.pageNumber, this.pageSize);           
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

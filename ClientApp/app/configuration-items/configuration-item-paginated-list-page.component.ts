import {Component, ChangeDetectorRef} from "@angular/core";
import {ConfigurationItemsService} from "./configuration-items.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./configuration-item-paginated-list-page.component.html",
    styleUrls: ["./configuration-item-paginated-list-page.component.css"],
    selector: "ce-configuration-item-paginated-list-page"   
})
export class ConfigurationItemPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _configurationItemsService: ConfigurationItemsService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {      
            
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[ConfigurationItems] ConfigurationItemAddedOrUpdated") {
                this._configurationItemsService.get().toPromise().then(x => {
                    this.unfilteredConfigurationItems = x.configurationItems;
                    this.configurationItems = this.filterTerm != null ? this.filteredConfigurationItems : this.unfilteredConfigurationItems;
                    this._changeDetectorRef.detectChanges();
                });
            } else if (x.type == "[ConfigurationItems] ConfigurationItemAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredConfigurationItems = (await this._configurationItemsService.get().toPromise()).configurationItems;   
        this.configurationItems = this.filterTerm != null ? this.filteredConfigurationItems : this.unfilteredConfigurationItems;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredConfigurationItems = pluckOut({
            items: this.unfilteredConfigurationItems,
            value: $event.detail.configurationItem.id
        });

        this.configurationItems = this.filterTerm != null ? this.filteredConfigurationItems : this.unfilteredConfigurationItems;
        
        this._configurationItemsService.remove({ configurationItem: $event.detail.configurationItem, correlationId });
    }

    public tryToEdit($event) {
        this._router.navigate(["configurationItems", $event.detail.configurationItem.id]);
    }

    public handleConfigurationItemsFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.configurationItems = this.filterTerm != null ? this.filteredConfigurationItems : this.unfilteredConfigurationItems;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _configurationItems: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public configurationItems: Array<any> = [];
    public unfilteredConfigurationItems: Array<any> = [];
    public get filteredConfigurationItems() {
        return this.unfilteredConfigurationItems.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}

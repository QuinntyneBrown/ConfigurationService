import {Component, ChangeDetectorRef} from "@angular/core";
import {ConfigurationItemKeysService} from "./configuration-item-keys.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./configuration-item-key-paginated-list-page.component.html",
    styleUrls: ["./configuration-item-key-paginated-list-page.component.css"],
    selector: "ce-configuration-item-key-paginated-list-page"   
})
export class ConfigurationItemKeyPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _configurationItemKeysService: ConfigurationItemKeysService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {      
            
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[ConfigurationItemKeys] ConfigurationItemKeyAddedOrUpdated") {
                this._configurationItemKeysService.get().toPromise().then(x => {
                    this.unfilteredConfigurationItemKeys = x.configurationItemKeys;
                    this.configurationItemKeys = this.filterTerm != null ? this.filteredConfigurationItemKeys : this.unfilteredConfigurationItemKeys;
                    this._changeDetectorRef.detectChanges();
                });
            } else if (x.type == "[ConfigurationItemKeys] ConfigurationItemKeyAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredConfigurationItemKeys = (await this._configurationItemKeysService.get().toPromise()).configurationItemKeys;   
        this.configurationItemKeys = this.filterTerm != null ? this.filteredConfigurationItemKeys : this.unfilteredConfigurationItemKeys;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredConfigurationItemKeys = pluckOut({
            items: this.unfilteredConfigurationItemKeys,
            value: $event.detail.configurationItemKey.id
        });

        this.configurationItemKeys = this.filterTerm != null ? this.filteredConfigurationItemKeys : this.unfilteredConfigurationItemKeys;
        
        this._configurationItemKeysService.remove({ configurationItemKey: $event.detail.configurationItemKey, correlationId });
    }

    public tryToEdit($event) {
        this._router.navigate(["configurationItemKeys", $event.detail.configurationItemKey.id]);
    }

    public handleConfigurationItemKeysFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.configurationItemKeys = this.filterTerm != null ? this.filteredConfigurationItemKeys : this.unfilteredConfigurationItemKeys;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _configurationItemKeys: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public configurationItemKeys: Array<any> = [];
    public unfilteredConfigurationItemKeys: Array<any> = [];
    public get filteredConfigurationItemKeys() {
        return this.unfilteredConfigurationItemKeys.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}

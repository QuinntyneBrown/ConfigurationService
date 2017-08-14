import {Component} from "@angular/core";
import {ConfigurationItemsService} from "./configuration-items.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./configuration-item-edit-page.component.html",
    styleUrls: ["./configuration-item-edit-page.component.css"],
    selector: "ce-configuration-item-edit-page"
})
export class ConfigurationItemEditPageComponent {
    constructor(private _configurationItemsService: ConfigurationItemsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.configurationItem = (await this._configurationItemsService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).configurationItem;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._configurationItemsService.addOrUpdate({ configurationItem: $event.detail.configurationItem, correlationId });
        this._router.navigateByUrl("/configurationItems");
    }

    public configurationItem = {};
}

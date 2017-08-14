import {Component} from "@angular/core";
import {ConfigurationItemKeysService} from "./configuration-item-keys.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./configuration-item-key-edit-page.component.html",
    styleUrls: ["./configuration-item-key-edit-page.component.css"],
    selector: "ce-configuration-item-key-edit-page"
})
export class ConfigurationItemKeyEditPageComponent {
    constructor(private _configurationItemKeysService: ConfigurationItemKeysService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.configurationItemKey = (await this._configurationItemKeysService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).configurationItemKey;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._configurationItemKeysService.addOrUpdate({ configurationItemKey: $event.detail.configurationItemKey, correlationId });
        this._router.navigateByUrl("/configurationItemKeys");
    }

    public configurationItemKey = {};
}

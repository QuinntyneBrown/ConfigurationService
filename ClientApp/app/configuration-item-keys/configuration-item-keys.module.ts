import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { ConfigurationItemKeysService } from "./configuration-item-keys.service";

import { ConfigurationItemKeyEditComponent } from "./configuration-item-key-edit.component";
import { ConfigurationItemKeyListItemComponent } from "./configuration-item-key-list-item.component";
import { ConfigurationItemKeyPaginatedListComponent } from "./configuration-item-key-paginated-list.component";
import { ConfigurationItemKeysLeftNavComponent } from "./configuration-item-keys-left-nav.component";

const declarables = [
    ConfigurationItemKeyEditComponent,
    ConfigurationItemKeyListItemComponent,
    ConfigurationItemKeyPaginatedListComponent,
    ConfigurationItemKeysLeftNavComponent
];

const providers = [ConfigurationItemKeysService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ConfigurationItemKeysModule { }

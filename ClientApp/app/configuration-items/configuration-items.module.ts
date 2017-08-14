import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { ConfigurationItemsService } from "./configuration-items.service";

import { ConfigurationItemEditComponent } from "./configuration-item-edit.component";
import { ConfigurationItemListItemComponent } from "./configuration-item-list-item.component";
import { ConfigurationItemPaginatedListComponent } from "./configuration-item-paginated-list.component";
import { ConfigurationItemsLeftNavComponent } from "./configuration-items-left-nav.component";

const declarables = [
    ConfigurationItemEditComponent,
    ConfigurationItemListItemComponent,
    ConfigurationItemPaginatedListComponent,
    ConfigurationItemsLeftNavComponent
];

const providers = [ConfigurationItemsService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, SharedModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ConfigurationItemsModule { }

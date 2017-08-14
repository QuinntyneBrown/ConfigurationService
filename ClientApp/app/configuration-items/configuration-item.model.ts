import { ConfigurationItemKey } from "../configuration-item-keys";

export class ConfigurationItem { 

    public id: any;

    public configurationItemKeyId: any;
    
    public value: string;

    public configurationItemKey: ConfigurationItemKey = <ConfigurationItemKey>{};
}

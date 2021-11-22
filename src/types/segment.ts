export interface Indentify {
    userId?: string | number;
    traits?: any;
    timestamp?: Date | undefined; 
    context?: any;
}

export interface IndentifyGroup {
    userId?: string | number;
    groupId: string | number;
    integrations: Integrations;
    traits?: any;
    timestamp?: Date | undefined; 
    context?: any;
}

interface Integrations {
    [integration_name: string]: boolean | { [integration_key: string]: any };
}

export interface Track {
    userId?: string | number;
    event: string;
    properties?: any;
    context?: any;
}

export interface Page {
    userId?: string | number;
    category: string;
    name: string;
    properties?: any;
    context?: any;
}

export interface Alias {
    previousId: string | number;
    userId: string | number;
}

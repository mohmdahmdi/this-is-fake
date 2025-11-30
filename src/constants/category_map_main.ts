type service = {
    serviceName : string;
    price : number;
}

type business = {
    translation: string;
    services : {
        [key: string]: service;
    };
}


export type CategoryMapMain = Record<string, business>;
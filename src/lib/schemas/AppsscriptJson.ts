export interface AppsscriptJson {
  timeZone: string;
  exceptionLogging: "STACKDRIVER" | "NONE";
  runtimeVersion: "V8";
  dependencies?: {
    libraries?: Library[];
    enabledAdvancedServices?: Service[];
  }
  webapp?: {
    access: Access;
    executeAs: ExecuteAs;
  };
}

export interface Library {
  userSymbol: string
  libraryId: string
  version: number
  developmentMode: boolean
}

export interface Service {
  userSymbol: string
  serviceId: string
  version: string
}

export enum Access {
  ANYONE = "ANYONE",
  ANYONE_ANONYMOUS = "ANYONE_ANONYMOUS",
  DOMAIN = "DOMAIN",
  USER_ACCESSING = "USER_ACCESSING"
}

export enum ExecuteAs {
  USER_ACCESSING = "USER_ACCESSING",
  USER_DEPLOYING = "USER_DEPLOYING"
}
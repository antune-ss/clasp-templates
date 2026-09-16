import { AppsscriptJson, Library, Service, Access, ExecuteAs } from "../schemas/AppsscriptJson.js";
import { BuilderJson } from "./BuilderJson.js";

export class AppsscriptBuilder extends BuilderJson<AppsscriptJson> {
  
  protected fileName = 'appsscript.json';
  
  protected config: AppsscriptJson = {
    timeZone: "America/Sao_Paulo",
    exceptionLogging: "STACKDRIVER",
    runtimeVersion: "V8",
    dependencies: {},
  };

  public enableWebApp(access: Access = Access.DOMAIN, executeAs: ExecuteAs = ExecuteAs.USER_DEPLOYING): this {
    this.config.webapp = {
      access: access,
      executeAs: executeAs
    };
    return this;
  }

  public addLibrary(userSymbol: string, libraryId: string, version: number): this {
    if (version < 0) {
      throw new Error("The library version cannot be negative.");
    }

    if (!this.config.dependencies) this.config.dependencies = {};
    if (!this.config.dependencies.libraries) this.config.dependencies.libraries = [];

    const lib: Library = {
      userSymbol: userSymbol,
      libraryId: libraryId,
      version: version,
      developmentMode: version === 0 
    }
    
    this.config.dependencies.libraries.push(lib);
    
    return this;
  }

  public addService(userSymbol: string, serviceId: string, version: string): this {
    if (!this.config.dependencies) this.config.dependencies = {};
    if (!this.config.dependencies.enabledAdvancedServices) this.config.dependencies.enabledAdvancedServices = [];

    const service: Service = {
      userSymbol: userSymbol,
      serviceId: serviceId,
      version: version
    }

    this.config.dependencies.enabledAdvancedServices.push(service);

    return this;
  }
}
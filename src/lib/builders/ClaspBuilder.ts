import { ClaspJson } from "../schemas/ClaspJson.js";
import { BuilderJson } from "./BuilderJson.js";

export class ClaspBuilder extends BuilderJson<ClaspJson> {

  protected fileName = '.clasp.json';
  protected config: ClaspJson;
  
  constructor(scriptId: string = "INSERT_YOUR_SCRIPT_ID_HERE", rootDir: string = "./dist") {
    super();
    
    this.config = {
      scriptId: scriptId,
      rootDir: rootDir
    };
  }

  public setFileExtension(extension: string): this {
    this.config.fileExtension = extension;
    return this;
  }
}
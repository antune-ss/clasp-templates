import fs from 'fs-extra';
import path from 'path';

export abstract class Builder<T> {
  protected abstract config: T;
  protected abstract fileName: string;

  public build(targetDir: string): void {
    const filePath = path.join(targetDir, this.fileName);
    fs.writeJsonSync(filePath, this.config, { spaces: 2 });
  }
}
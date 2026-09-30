export abstract class BuilderTxt {
  
  private text = '';

  append(text: string): BuilderTxt {
    this.text += text;
    return this;
  }

  doubleLine(): BuilderTxt {
    this.text += '\n\n';
    return this;
  }

  line(): BuilderTxt {
    this.text += '\n';
    return this;
  }

  getText(): string {
    return this.text;
  }

  protected abstract build(): BuilderTxt;

}
type EnumDefinition = Record<string, [string, string | number]>;

interface EnumItem {
  label: string;
  value: string | number;
}

interface Enum {
  [key: string]: any;
  getValue(enumName: string): string | number;
  getKeyForValue(value: string | number): string;
  getDict(): EnumItem[];
}

export class EnumImpl implements Enum {
  private strToValueMap: Record<string, string | number> = {};
  private numToDescMap: Record<string | number, string> = {};

  constructor(private readonly definition: EnumDefinition) {
    for (const enumName of Object.keys(definition)) {
      const [key, value] = definition[enumName];
      this.strToValueMap[enumName] = value;
      this.numToDescMap[value] = key;
      this[enumName] = value;
    }
  }

  getValue(enumName: string): string | number {
    return (this.definition[enumName] && this.definition[enumName][1]) || '';
  }

  getKeyForValue(value: string | number): string {
    return this.numToDescMap[value] || '';
  }

  getDict(): EnumItem[] {
    return Object.keys(this.definition).map(enumName => {
      const [key, value] = this.definition[enumName];
      return { label: key, value };
    });
  }

  [key: keyof EnumDefinition]: any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

function booleanFieldValue() {
  return function booleanFieldValueMetadata(target: any, key: string): void {
    const defaultValue = target[key];
    const localKey = `__md_private_symbol_${key}`;

    target[localKey] = defaultValue;
    Object.defineProperty(target, key, {
      get() {
        return (<any>this)[localKey];
      },
      set(value: boolean) {
        (<any>this)[localKey] = value != null && `${value}`.trim().toLowerCase() !== 'false';
      },
    });
  };
}

export { booleanFieldValue as BooleanFieldValue };

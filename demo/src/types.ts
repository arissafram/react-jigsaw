export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'checkbox';
  indent: number;
  isKey?: boolean;
  isBrace?: boolean;
  braceType?: 'open' | 'close';
}

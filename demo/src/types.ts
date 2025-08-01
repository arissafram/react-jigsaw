export interface Field {
  braceType?: 'open' | 'close';
  indent: number;
  isBrace?: boolean;
  isKey?: boolean;
  label: string;
  name: string;
  options?: string[];
  type: 'text' | 'number' | 'checkbox' | 'select';
}

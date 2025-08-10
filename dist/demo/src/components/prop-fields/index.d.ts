import { Field } from '../../types';
import './styles.scss';
interface PropFieldProps {
    field: Field;
    getValue: (path: string) => string | number | boolean;
    updateFormOption: (path: string, value: string | number | boolean) => void;
}
declare const PropField: ({ field, getValue, updateFormOption }: PropFieldProps) => import("react/jsx-runtime").JSX.Element;
export default PropField;
//# sourceMappingURL=index.d.ts.map
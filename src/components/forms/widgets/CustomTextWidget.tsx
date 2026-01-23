import type { WidgetProps } from '@rjsf/utils';
import { Input } from '../../ui/input';

export function CustomTextWidget({
  id,
  value,
  required,
  disabled,
  readonly,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  options,
}: WidgetProps) {
  return (
    <Input
      id={id}
      type={(options?.inputType as string) || 'text'}
      value={value ?? ''}
      placeholder={placeholder}
      className='border-black focus:ring-0 focus:outline-none'
      disabled={disabled || readonly}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onBlur(id, e.target.value)}
      onFocus={(e) => onFocus(id, e.target.value)}
    />
  );
}

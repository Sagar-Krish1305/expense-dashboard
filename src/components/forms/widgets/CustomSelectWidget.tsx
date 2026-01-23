import type { WidgetProps } from "@rjsf/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export function CustomSelectWidget({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: WidgetProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={(val) => onChange(val)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full border-2 border-black">
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>

      <SelectContent>
        {options.enumOptions?.map((opt) => (
          <SelectItem
            key={opt.value}
            value={String(opt.value)}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

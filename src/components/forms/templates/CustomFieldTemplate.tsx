import type { FieldTemplateProps } from "@rjsf/utils";

export function CustomFieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    label,
    required,
    description,
    errors,
    children,
    rawErrors,
  } = props;

  const hasError = rawErrors && rawErrors.length > 0;

  return (
    <div className="flex flex-col space-y-1 w-full mb-6">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </label>
      )}

      {/* Input / Widget */}
      <div className={hasError ? "ring-1 ring-destructive rounded-md" : ""}>
        {children}
      </div>

      {/* Description / Help */}
      {description && (
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      )}

      {/* Errors */}
      {hasError && (
        <div className="text-xs text-destructive">
          {errors}
        </div>
      )}
    </div>
  );
}

type MinimalFormTemplateProps = {
  children: React.ReactNode;
  errors?: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export function VerticalFormTemplate({
  children,
  errors,
  onSubmit,
}: MinimalFormTemplateProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-6">
      {errors}
      {children}
    </form>
  );
}

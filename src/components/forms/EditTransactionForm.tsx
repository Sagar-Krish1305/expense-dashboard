import Form from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import type { RJSFSchema, UiSchema, ValidatorType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import schemaJSON from '../../RJSF/EditTransactionForm/schema.json';
import uiSchemaJSON from '../../RJSF/EditTransactionForm/uiSchema.json';
import { CustomSelectWidget } from './widgets/CustomSelectWidget';
import { CustomFieldTemplate } from './templates/CustomFieldTemplate';
import { CustomTextWidget } from './widgets/CustomTextWidget';
import type { TransactionDetails } from '../../types/transaction.types';
import { useUpdateTransaction } from '../../hooks/useUpdateTransaction';

export default function EditTransactionForm({
  transaction,
  setModalVisibility,
}: {
  transaction: TransactionDetails;
  setModalVisibility: (visibility: boolean) => void;
}) {
  const formSchema = schemaJSON as RJSFSchema;
  const uiSchema = uiSchemaJSON as UiSchema<TransactionDetails>;
  const typedValidator = validator as ValidatorType<TransactionDetails>;

  const { mutate } = useUpdateTransaction();

  const handleFormSubmit = ({ formData }: IChangeEvent<TransactionDetails>) => {
    if (!formData || !transaction.id) return;

    // Preserve id and transaction_date if the user didn't change them
    const payload: TransactionDetails = {
      ...transaction,
      ...formData,
      id: transaction.id,
      transaction_date: transaction.transaction_date,
    };

    mutate(payload, {
      onSuccess: () => {
        setModalVisibility(false);
      },
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-120 h-140
        bg-(--dashboard-background)
        text-(--light-text-color)
        border
        z-50
        rounded-2xl
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        p-4
        flex flex-col
      "
    >
      <Form
        className="flex flex-col"
        schema={formSchema}
        uiSchema={uiSchema}
        validator={typedValidator}
        templates={{ FieldTemplate: CustomFieldTemplate }}
        widgets={{ SelectWidget: CustomSelectWidget, TextWidget: CustomTextWidget }}
        formData={transaction}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

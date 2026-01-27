import Form from '@rjsf/core';
import type { RJSFSchema, UiSchema, ValidatorType } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import schemaJSON from '../../RJSF/AddTransactionForm/schema.json';
import uiSchemaJSON from '../../RJSF/AddTransactionForm/uiSchema.json';
import { CustomSelectWidget } from './widgets/CustomSelectWidget';
import { CustomFieldTemplate } from './templates/CustomFieldTemplate';
import { CustomTextWidget } from './widgets/CustomTextWidget';
import type { TransactionDetails } from '../../types/transaction.types';
import { useCreateTransaction } from '../../hooks/useCreateTransaction';

export default function AddTransactionForm({ setModalVisibility } : { setModalVisibility : (visibility: boolean) => void}) {

  const formSchema = schemaJSON as RJSFSchema;
  const uiSchema = uiSchemaJSON as UiSchema<TransactionDetails>;
  const typedValidator = validator as ValidatorType<TransactionDetails>;

  const { mutate } = useCreateTransaction();

  const handleFormSubmit = ({ formData } : IChangeEvent<TransactionDetails>) => {
    if (!formData) return;
    formData.transaction_date = new Date(Date.now()).toISOString();

    mutate(formData, {
        onSuccess: () => {
          setModalVisibility(false); // close modal if needed
        }
    });
  }

  return (
    <div onClick={(e) => e.stopPropagation()} 
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
      ">
      <Form 
        className="flex flex-col"
        schema={formSchema} 
        uiSchema={uiSchema}
        validator={typedValidator} 
        templates={{ FieldTemplate: CustomFieldTemplate }}
        widgets={{ SelectWidget: CustomSelectWidget, TextWidget: CustomTextWidget }}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

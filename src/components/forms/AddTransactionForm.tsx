import Form from '@rjsf/core';
import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import schemaJSON from '../../RJSF/AddTransactionForm/schema.json';
import uiSchemaJSON from '../../RJSF/AddTransactionForm/uiSchema.json'
import { CustomSelectWidget } from './widgets/CustomSelectWidget';
import { CustomFieldTemplate } from './templates/CustomFieldTemplate';
import { CustomTextWidget } from './widgets/CustomTextWidget';

export default function AddTransactionForm() {

  const formSchema = schemaJSON as RJSFSchema;
  const uiSchema = uiSchemaJSON as UiSchema;

  return (
    <div onClick={(e) => e.stopPropagation()} 
          className="
        w-120 h-140
        bg-white
        text-black
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
        validator={validator} 
        templates={{ FieldTemplate: CustomFieldTemplate }}
        widgets={{ SelectWidget: CustomSelectWidget, TextWidget: CustomTextWidget }}
      />
    </div>
  )
}

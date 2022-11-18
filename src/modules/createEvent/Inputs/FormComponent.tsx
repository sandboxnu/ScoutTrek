import { ScreenContainer, Container, Text } from "ScoutDesign/library";
import React, {ReactElement, useState} from 'react';
// Component Types
import TextInput from './DescriptionInput';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import OptionsInput from './OptionsInput';
import { FormFieldProps } from "ScoutDesign/library/Atoms/FormFields/formTypes";
import { operationName } from "@apollo/client";

const eventComponents = {
    'text': TextInput,
    'location': LocationInput,
    'date': DateTimeInput,
    'options': OptionsInput,
};

// an example of a form specification
const EXAMPLE_FORM: FormSchema = {
    "title": "Field Trip Sign-up Form",
    "id": "field-trip-signup",
    "fields": [
        {
            "title": "Full Name",
            "id": "name",
            "type": "text"
        }, {
            "title": "Role",
            "id": "role",
            "type": "options",
            "defaultValue": "student",
            "options": [
                {
                    "title": "Student",
                    "id": "student"
                }, {
                    "title": "Parent",
                    "id": "proctor",
                    "hiddenFields": [
                        {
                        "title": "Your child's name",
                        "id": "parent-of",
                        "type": "text"
                        }
                    ]
                }
            ]
        }
    ]
}

EXAMPLE_FORM.fields.map((field: FieldSchema) => {
  if (field.type == 'options') {
    field.options
  }
})

const FormComponent = ({navigation, route } : any, formProps : Form) => {
    return (
        <ScreenContainer
            icon="back"
            padding="none"
            paddingTop="xl"
            key={formProps.id}
            back={() => {navigation.goBack();}}>
            <Text>
                {formProps.title}
            </Text>
            {
                formProps.fields.map( 
                    (field) => {
                        if (field.type == 'options') {
                            <FormItemComponent 
                                id={field.id}
                                title={field.title}
                                type={field.type}
                                value={field.value}
                                options={field.options}/>
                        }
                        else {
                            <FormItemComponent 
                                id={field.id}
                                title={field.title}
                                type={field.type}
                                value={field.value}
                                options={null}/>
                        }
                    }
                )
            }   
        </ScreenContainer>
    )
}

const FormItemComponent = (formFieldProps : FieldSchema) => {
    const {InitialButton, EditingComponent, CompletedComponent} = eventComponents[formFieldProps.type];

    const [hasInput, setHasInput] = useState(false);
    
    return (
        <Container key={formFieldProps.id}>
            <Text>
                {formFieldProps.title}
            </Text>
            <React.Fragment key={formFieldProps.id}>
                <EditingComponent />
                {!hasInput ? (<InitialButton />) : (<CompletedComponent />)}
            </React.Fragment>
            /* rendering options if there are */
            {() => {
                    if (formFieldProps.type == 'options') {
                        return (
                            formFieldProps.options.map(
                                (option) => {<FormOptionItem 
                                    id={option.id} 
                                    title={option.title} 
                                    hiddenFields={option.hiddenFields}  />}
                            )
                        )
                    }
                }
            }
        </Container>
    )
}

const FormOptionItem = (formOptionProps : Option) => {
    return (
        <Container key={formOptionProps.id}>
            <Text>
                {formOptionProps.title}
            </Text>
            {() => {
                    if (formOptionProps.hiddenFields) {
                        return (
                            formOptionProps.hiddenFields.map(
                                (field) => { 
                                    if (field.type == 'options') {
                                        <FormItemComponent {...field} />
                                    }
                                    else {
                                        <FormItemComponent 
                                            id={field.id}
                                            title={field.title}
                                            type={field.type}
                                            value={field.value}
                                            options={null}/>
                                    }
                                }
                            )
                        )
                    }
                }

                
            }
        </Container>
    )
}

interface FormProps {
  spec: FormSchema;
  onSubmit: (input: FormInput) => void;
}

const Form = ({spec, onSubmit}: FormProps) => {
  const [input, setInput] = useState<FormInput>({});

  function updateField(id: string, value: unknown) {
    input[id] = value;
    setInput(input);
  }

  function onClick() {
    if (validFormInput(spec, input)) {
      onSubmit(input);
    } else {

    }
  }

  return (
    <div>
      {spec.title}

      <div>
        {spec.fields.map(fieldSpec => (
          <FormFieldInput spec={fieldSpec} onInput={v => updateField(fieldSpec.id, v)}/>
        ))}
      </div>
      <button onClick={onClick} disabled={!validFormInput(spec, input)}>SUBMIT</button>
    </div>
  );
}

interface FormFieldInputProps {
  spec: FieldSchema;
  onInput: (input: unknown) => void;
}

type Dict<K extends string, V> = {
  [key in K]: V;
}

const TextFieldInput = ({spec, onInput}: FormFieldInputProps) => {
  if (spec.type != 'text') {return undefined}
  return (
    <div>{}</div>
  );
}

const FORM_FIELD_INPUT_COMPONENTS: Dict<FieldType, (props: FormFieldInputProps) => ReactElement> = {
  'text': TextFieldInput,
}

const FormFieldInput = (props: FormFieldInputProps) => {
  const Component = FORM_FIELD_INPUT_COMPONENTS[props.spec.type];
  return (
    <div>
      <div>{props.spec.title}</div>
      <Component {...props}/>
    </div>
  )
}

export type FormSchema = TitledItem & {
  fields: FieldSchema[];
}

export type FieldSchema = TitledItem & FieldSchemaVariant;

type StringFieldType = 'name' | 'text' | 'email';

type DateFieldType = 'date' | 'time' | 'future-time';

type IntervalFieldType = 'interval' | 'future-interval';

type LocationFieldType = 'location';

type OptionsFieldType = 'options';

export type FieldType = StringFieldType | DateFieldType | IntervalFieldType | LocationFieldType | OptionsFieldType;

interface IdItem {
  id: string;
}

interface TitledItem {
  id: string;
  title: string;
}

type TypedField<TypeOfField, TypeOfValue> = {
  type: TypeOfField
} & {
  optional?: boolean;
  defaultValue?: TypeOfValue;
}

type FieldSchemaVariant =
  (TypedField<StringFieldType, string>) & {
    maxLength?: number;
  }
| TypedField<LocationFieldType, Location>
| TypedField<DateFieldType, Date>
| (TypedField<OptionsFieldType, string> & {
  options: Option[];
});

type Option = TitledItem & {
  hiddenFields?: FieldSchema[];
}

type FormInput = Dict<string, unknown>;

function validFormInput(spec: FormSchema, values: FormInput): boolean {
  return validFormFieldInputs(spec.fields, values);
}

function validFormFieldInputs(fields: FieldSchema[], values: FormInput): boolean {
  for (let field of fields) {
    if (!values[field.id]) {
      if (field.optional) {
        continue;
      } else {
        console.log('missing field ' + field.id)
        return false;
      }
    }
    if (!validFormFieldInput(field, values)) {
      console.log('invalid field: ' + field.id)
      return false;
    }
  }
  return true;
}

function validFormFieldInput(spec: FieldSchema, values: FormInput) {
  const value: unknown = values[spec.id];
  switch (spec.type) {
    case 'name':
      return isString(value);
    case 'text':
      return isString(value);
    case 'email':
      return isString(value) && /hhh/.test(value as string);
    case 'date':
      return isDate(value);
    case 'time':
      return isDate(value);
    case 'future-time':
      return isDate(value) && value as Date > new Date();
    case 'location':
      // TODO: put some real validation here!
      return true;
    case 'options':
      if (!isString(value)) {
        return false;
      }
      for (let option of spec.options) {
        if (option.id == value) {
          return !option.hiddenFields || validFormFieldInputs(option.hiddenFields, values);
        }
      }
      return false;
  }
}

function isString(value: unknown): boolean {
  return typeof value === 'string' || value instanceof String;
}

function isDate(value: unknown) {
  return value instanceof Date;
}
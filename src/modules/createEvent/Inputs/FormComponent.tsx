import { ScreenContainer, Container, Text } from "ScoutDesign/library";
import React, {ReactElement, useState} from 'react';
// Component Types
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import OptionsInput from './OptionsInput';
import { FormFieldProps } from "ScoutDesign/library/Atoms/FormFields/formTypes";
import { operationName } from "@apollo/client";
import { Button, TextInput } from "react-native";
import { FormSchema, FieldSchema, FormInput, validFormInput, FieldType, Dict, DateFieldSchema, LocationFieldSchema, OptionsFieldSchema, StringFieldSchema } from "./FormTypes";


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

interface FormFieldInputProps<T extends FieldSchema> {
  spec: T;
  onInput: (input: unknown) => void;
}



const PlaceholderFieldInput = ({spec, onInput}: FormFieldInputProps<FieldSchema>) => {
  const [input, setInput] = useState<string>('');
  return (
    <>
      <TextInput onChangeText={setInput}/>
      <Button title="SUBMIT" onPress={() => onInput(input)} />
    </>
  );
}

const TextFieldInput = ({spec, onInput}: FormFieldInputProps<StringFieldSchema>) => {
  return (
    <PlaceholderFieldInput spec={spec} onInput={onInput}/>
  );
}

const DateFieldInput = ({spec, onInput}: FormFieldInputProps<DateFieldSchema>) => {
  return (
    <PlaceholderFieldInput spec={spec} onInput={onInput}/>
  );
}

const LocationFieldInput = ({spec, onInput}: FormFieldInputProps<LocationFieldSchema>) => {
  return (
    <PlaceholderFieldInput spec={spec} onInput={onInput}/>
  );
}

const OptionsFieldInput = ({spec, onInput}: FormFieldInputProps<OptionsFieldSchema>) => {
  return (
    <PlaceholderFieldInput spec={spec} onInput={onInput}/>
  );
}

const FORM_FIELD_INPUT_COMPONENTS: Dict<FieldType, (props: FormFieldInputProps<any>) => ReactElement> = {
  'text': TextFieldInput,
  'name': TextFieldInput,
  'email': TextFieldInput,
  'date': DateFieldInput,
  'time': DateFieldInput,
  'location': LocationFieldInput,
  'options': OptionsFieldInput
}

const FormFieldInput = (props: FormFieldInputProps<FieldSchema>) => {
  const Component = FORM_FIELD_INPUT_COMPONENTS[props.spec.type];
  return (
    <div>
      <div>{props.spec.title}</div>
      <Component {...props}/>
    </div>
  );
}

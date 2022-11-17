import { ScreenContainer, Container, Text } from "ScoutDesign/library";
import React, {useState} from 'react';
// Component Types
import TextInput from './DescriptionInput';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import OptionsInput from './OptionsInput';
import { FormFieldProps } from "ScoutDesign/library/Atoms/FormFields/formTypes";

const eventComponents = {
    'text': TextInput,
    'location': LocationInput,
    'date': DateTimeInput,
    'options': OptionsInput,
};

// an example of a form specification
const EXAMPLE_FORM: Form = {
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
            "value": "student",
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

            
        </ScreenContainer>
    )
}

const FormItemComponent = (formFieldProps : FormFieldSpecification) => {
    const {InitialButton, EditingComponent, CompletedComponent} = eventComponents[formFieldProps.type];

    const [input, setInput] = useState();
    
    return (
        <Container key={formFieldProps.id}>
            <Text>
                {formFieldProps.title}
            </Text>

        </Container>
    )
}

export type Form = FormItem & {
    fields: FormFieldSpecification[];
}
  
export type FormFieldSpecification = FormItem & FormFieldVariant;

export type FormFieldType = 'text' | 'location' | 'time' | 'options';

interface FormItem {
    id: string;
    title: string;
}

type FormFieldVariant = {
    type: 'text';
    value?: string;
} | {
    type: 'location';
    value?: Location;
} | {
    type: 'time';
    value?: Date;
} | {
    type: 'options';
    value?: string;
    options: Option[];
}

type Option = FormItem & {
    hiddenFields?: FormFieldSpecification[];
}
import { ScreenContainer, Container, Text } from "ScoutDesign/library";
import React, {useState} from 'react';
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

const FormItemComponent = (formFieldProps : FormFieldSpecification) => {
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
                        )
                    }
                }

                
            }
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
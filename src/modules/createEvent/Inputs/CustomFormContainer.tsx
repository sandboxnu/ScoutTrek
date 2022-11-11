import { ScreenContainer, Container, Text } from "ScoutDesign/library";
import React, {useState} from 'react';
import Row from './Row';
import TapToEditContainer from './components/TapToEditContainer';
// Component Types
import TextInput from './DescriptionInput';
import LocationInput from './LocationInput';
import DateTimeInput from './DateTimeInput';
import OptionsInput from './OptionsInput';

const eventComponents = {
    'text': TextInput,
    'location': LocationInput,
    'date': DateTimeInput,
    'options': OptionsInput,
  };

const FormContainer = ({navigation, route } : any, {id, title, fields} : FormContainerProp) => {
    return (
    <ScreenContainer
      icon="back"
      padding="none"
      paddingTop="xl"
      key={id}
      back={() => {
        navigation.goBack();
      }}>

        <Text>{title}</Text>
        {fields.map((fieldItem) => {
            <FormItem 
            id = {fieldItem.id}
            title = {fieldItem.title}
            type = {fieldItem.type}
        />
        })}
      </ScreenContainer>
        
    )
}

const FormItem = ({id, title, type, value, hiddenFields, fields} : FormItemProp) => {
    const {InitialButton, EditingComponent, CompletedComponent} = eventComponents[type];
    
    const FormField = () => {
        const [hasInput, setHasInput] = useState(false);


        return (
            <React.Fragment key={id}>
                <EditingComponent />
                {!hasInput ? (
                    <InitialButton />
                ) : (
                    <CompletedComponent />
                )}
            </React.Fragment>
        )
    }
    
    return (
        <Container >
            <Text>{title}</Text>
            <FormField />
            {() =>{
                if (hiddenFields != undefined) {
                    hiddenFields.map((field) => {
                        <FormItem 
                            id = {field.id}
                            title = {field.title}
                            type = {field.type}
                        />
                    })
                }}
            }
            {() =>{
                if (fields != undefined) {
                    fields.map((field) => {
                        <FormItem 
                            id = {field.id}
                            title = {field.title}
                            type = {field.type}
                        />
                    })
                }}
            }
        </Container>
    )
}

interface FormContainerProp {
    id: string;
    title: string;
    fields: FormItemProp[];
}

interface FormItemProp {
    id: string;
    title: string;
    type: string;
    value?: string;
    hiddenFields?: FormItemProp[];
    fields?: FormItemProp[];
}
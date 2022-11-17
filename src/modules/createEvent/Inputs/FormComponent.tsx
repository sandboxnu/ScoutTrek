


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
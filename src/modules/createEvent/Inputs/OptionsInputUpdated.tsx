import React, { useState } from "react";
import { FormFieldInputProps, PlaceholderFieldInput } from "./FormComponent";
import { OptionsFieldSchema, Option, FieldSchema } from "./FormTypes";
import { ScreenContainer, Text } from "ScoutDesign/library";
import { specifiedDirectives } from "graphql";
import { Pressable } from "ScoutDesign/library/Atoms/utility";


const OptionsInput = ({spec, onInput} : FormFieldInputProps<OptionsFieldSchema>) => {

    const [choiceOption, setChoiceOption] = useState<string>("");
    return (
        <React.Fragment key={spec.id}>
            <Text>{spec.title}</Text>
            {
                spec.options.map(
                    (option : Option) => {
                        <Pressable onPress={() => setChoiceOption(option.id)} accessibilityLabel={""}>
                            <Text>
                                {option.title}
                            </Text>
                            if (option.id == choiceOption) {
                                option.hiddenFields!.map((field: FieldSchema) => {
                                    <PlaceholderFieldInput spec={field} onInput={} />
                                })
                            }
                        </Pressable>
                    }
                )
            }
        </React.Fragment>
    )
}
import React from "react";
import { FormFieldInputProps } from "./FormComponent";
import { OptionsFieldSchema, Option } from "./FormTypes";
import { ScreenContainer, Text } from "ScoutDesign/library";
import { specifiedDirectives } from "graphql";
import { Pressable } from "ScoutDesign/library/Atoms/utility";


const OptionsInput = ({spec, onInput} : FormFieldInputProps<OptionsFieldSchema>) => {
    return (
        <React.Fragment key={spec.id}>
            <Text>{spec.title}</Text>
            {
                spec.options.map(
                    (option : Option) => {
                        <Pressable onPress={} accessibilityLabel={""} children={undefined}>
                            <Text>
                                
                            </Text>
                        </Pressable>
                    }
                )
            }
        </React.Fragment>
    )
}
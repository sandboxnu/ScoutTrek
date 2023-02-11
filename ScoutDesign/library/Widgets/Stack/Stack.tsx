import React from 'react';
import { Container, Box, StandardRadius, Color } from '../../Atoms/utility';
import { InputFieldStates } from '../../Atoms/FormFields/formTypes';

import { IconPayload } from '../../../icons';

export interface StackableProps {
  key?: string;
  stackRadius?: StandardRadius;
  isStackTop?: boolean;
  isStackBottom?: boolean;
}

interface StackItemSchema extends InputFieldStates {
  id: string;
  text: string;
  icon?: IconPayload;
  onPress?: () => void;
  updateText?: () => void;
}

type StackProps = {
  accessibilityLabel: string;
  borderColor?: Color;
  backgroundColor?: Color;
  radius?: StandardRadius;
  RenderItem: React.ElementType;
  everyItemProps?: any;
  items: StackItemSchema[];
  HeaderComponent?: React.FC<any>;
  FooterComponent?: React.FC<any>;
};

const Stack = ({
  accessibilityLabel,
  borderColor,
  backgroundColor,
  radius,
  RenderItem,
  items,
  everyItemProps,
}: StackProps) => {
  return (
    <Box>
      <Container
        padding="none"
        accessibilityLabel={accessibilityLabel}
        borderWidth={borderColor ? 1 : undefined}
        borderColor={borderColor}
        borderBottomWidth={undefined}
        backgroundColor={backgroundColor}
        topLeftRadius={radius}
        topRightRadius={radius}
        bottomLeftRadius={radius}
        bottomRightRadius={radius}
      >
        {items.map((item: StackItemSchema, index: number) => {
          const firstItem = index === 0;
          const lastItem = index === items.length - 1;
          return (
            <React.Fragment key={item.id}>
              {!firstItem && (
                <Box backgroundColor={backgroundColor} height={1}>
                  <Box
                    flex={1}
                    marginHorizontal="l"
                    backgroundColor={borderColor}
                  />
                </Box>
              )}
              <RenderItem
                backgroundColor={backgroundColor}
                stackRadius={radius}
                isStackTop={firstItem}
                isStackBottom={lastItem}
                item={item}
                {...everyItemProps}
              />
            </React.Fragment>
          );
        })}
      </Container>
    </Box>
  );
};

export default Stack;

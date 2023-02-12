/** Design inspiration for this component comes from React Native Elements LineItem. */
import React, { useState } from 'react';

import theme from '../../theme';
import { Box, Color, Spacing } from '../../Atoms/utility';
import Text, { TextAlignmentWithinContainer } from '../../Atoms/UI/Text/Text';
import Icon from '../../Atoms/UI/Assets/Icon/Icon';
import { upCaret, downCaret } from '../../../icons';
import { Pressable, PressableProps } from '../../Atoms/utility';
import { StackableProps } from '../Stack/Stack';

const LineItemToggleIcon = ({ open }: { open: boolean }) => {
  if (open) {
    return <Icon icon={downCaret} color="darkGrey" size="s" />;
  }
  return <Icon icon={upCaret} color="darkGrey" size="s" />;
};

type LineItemHeadingProps = {
  color?: Color;
  weight?: 'medium' | 'light';
  children: React.ReactNode;
};

interface Props extends PressableProps, StackableProps {
  accessibilityLabel: string;
  type: 'button' | 'static' | 'simpleRow' | 'accordion' | 'formField';
  borderColor?: Color;
  topBorder?: boolean;
  bottomBorder?: boolean;
  bottomPadding?: Spacing;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  accordionContent?: React.ReactNode;
  backgroundColor?: Color;
  children?: any;
  childrenAlignment?: TextAlignmentWithinContainer;
}

/** ListItems display a row of information, such as a list of troops
 * with their respective icon or menu row.
 * They are very customizable and can contain switches, avatars, badges, icons, and more. */
const LineItem = ({
  accessibilityLabel,
  type,
  leftComponent,
  rightComponent,
  accordionContent,
  bottomPadding,
  borderColor,
  bottomBorder,
  topBorder,
  isStackBottom,
  isStackTop,
  stackRadius,
  children,
  childrenAlignment = 'left',
  ...rest
}: Props) => {
  const accordion = type === 'accordion';
  const simpleRow = type === 'simpleRow';
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);

  if (type === 'accordion' && !accordionContent) {
    console.error(
      "LineItem with type='accordion' must include JSX to include in the accordion"
    );
    return null;
  }
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      topRightRadius={isStackTop ? stackRadius : undefined}
      topLeftRadius={isStackTop ? stackRadius : undefined}
      bottomRightRadius={isStackBottom ? stackRadius : undefined}
      bottomLeftRadius={isStackBottom ? stackRadius : undefined}
      justifyContent="center"
      borderWidth={borderColor ? 0.25 : undefined}
      borderColor={borderColor}
      sideEffect={
        accordion ? () => setAccordionIsOpen((prev) => !prev) : undefined
      }
      {...rest}
    >
      {topBorder && (
        <Box height={0} borderTopColor="slateGrey" borderTopWidth={0.25} />
      )}
      <Box
        paddingVertical="xs"
        paddingBottom={bottomPadding}
        marginHorizontal={simpleRow ? undefined : 'm'}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        flexShrink={0}
      >
        <Box
          paddingVertical={simpleRow ? undefined : topBorder ? 'micro' : 's'}
          alignItems="center"
          flexDirection="row"
          flex={1}
        >
          {leftComponent}
          <Box
            paddingHorizontal="m"
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems={theme.alignments[childrenAlignment]}
            marginVertical={topBorder ? 'xs' : undefined}
          >
            {children}
          </Box>
        </Box>
        {accordion ? (
          <LineItemToggleIcon open={accordionIsOpen} />
        ) : (
          rightComponent
        )}
      </Box>
      {accordionIsOpen ? accordionContent : null}
      {bottomBorder && (
        <Box
          height={0}
          borderBottomColor="mediumGrey"
          borderBottomWidth={0.25}
        />
      )}
    </Pressable>
  );
};

LineItem.Heading = ({
  color = 'darkGrey',
  weight = 'light',
  children,
}: LineItemHeadingProps) => {
  return (
    <Text preset={weight === 'light' ? 'label-light' : 'label'} color={color}>
      {children}
    </Text>
  );
};

LineItem.Subheading = ({
  weight = 'light',
  color = 'darkGrey',
  children,
}: LineItemHeadingProps) => {
  return (
    <Text
      preset={weight === 'light' ? 'sublabel-light' : 'sublabel'}
      color={color}
    >
      {children}
    </Text>
  );
};

export default LineItem;

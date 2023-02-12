import { Box } from '../../utility';
import Text from '../../UI/Text/Text';
import { upArrow } from 'ScoutDesign/icons';
import Icon from '../../UI/Assets/Icon/Icon';
import TextInputBase, { TextInputProps } from './TextInputBase';

type Props = TextInputProps;

const SimpleTextInput = ({ disabled, error, noStyles, ...props }: Props) => {
  return (
    <>
      <TextInputBase
        borderWidth={disabled || error ? 1 : noStyles ? undefined : 0.5}
        borderColor={disabled ? 'mediumGrey' : error ? 'danger' : 'mintGrey'}
        borderRadius={noStyles ? undefined : 7}
        noStyles={noStyles}
        blurOnSubmit={false}
        error={error}
        {...props}
      />
      {error?.message ? (
        <Box
          paddingHorizontal="s"
          paddingVertical="xs"
          flexDirection="row"
          alignItems="center"
        >
          <Icon color="black" icon={upArrow} size="xs" />
          <Text preset="micro" paddingLeft="s">
            {error?.message}
          </Text>
        </Box>
      ) : null}
    </>
  );
};

export default SimpleTextInput;

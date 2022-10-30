import {Button} from 'ScoutDesign/library';
import {plusBold} from 'ScoutDesign/icons';

type Props = {
  fieldName: string;
  onPress: () => void;
  disabled?: boolean;
};

const DefaultInputButton = ({fieldName, onPress, disabled=false}: Props) => {
  return (
    <Button
      accessibilityLabel="add-title"
      icon={plusBold}
      backgroundColor="gradient"
      text={fieldName}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default DefaultInputButton;

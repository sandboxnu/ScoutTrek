import { Button } from 'ScoutDesign/library';
import { plusBold } from 'ScoutDesign/icons';

type Props = {
  fieldName: string;
  onPress: () => void;
};

const DefaultInputButton = ({ fieldName, onPress }: Props) => {
  return (
    <Button
      accessibilityLabel="add-title"
      icon={plusBold}
      backgroundColor="gradient"
      text={fieldName}
      onPress={onPress}
    />
  );
};

export default DefaultInputButton;

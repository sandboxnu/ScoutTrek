import Icon from '../Assets/Icon/Icon';
import { close, IconPayload } from '../../../../icons';
import { Floatable, FloatableProps } from '../../utility';

export interface DismissableProps {
  dismissComponent?: IconPayload;
  onDismiss?: () => void;
}

type DismissButtonProps = DismissableProps & FloatableProps;

const DismissButton = ({
  dismissComponent,
  onDismiss,
  corner,
  distanceFromCorner,
}: DismissButtonProps) => {
  return (
    <Floatable corner={corner} distanceFromCorner={distanceFromCorner}>
      <Icon
        radius="circle"
        backgroundColor="lightMintGrey"
        icon={dismissComponent ? dismissComponent : close}
        color="darkGrey"
        size="s"
        onPress={onDismiss}
      />
    </Floatable>
  );
};

export default DismissButton;

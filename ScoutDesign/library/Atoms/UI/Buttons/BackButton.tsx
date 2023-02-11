import Icon from '../Assets/Icon/Icon';
import { backChevron, IconPayload } from '../../../../icons';
import { Floatable, FloatableProps } from '../../utility';

export interface DismissableProps {
  backComponent?: IconPayload;
  onDismiss?: () => void;
}

type BackButtonProps = DismissableProps & FloatableProps;

const BackButton = ({
  backComponent,
  onDismiss,
  corner,
  distanceFromCorner,
}: BackButtonProps) => {
  return (
    <Floatable corner={corner} distanceFromCorner={distanceFromCorner}>
      <Icon
        icon={backComponent ? backComponent : backChevron}
        color="darkGrey"
        size="m"
        onPress={onDismiss}
      />
    </Floatable>
  );
};

export default BackButton;

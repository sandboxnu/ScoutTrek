import { View } from 'react-native';
import { pencil } from 'ScoutDesign/icons';
import { Icon } from 'ScoutDesign/library';

type Props = {
  children: any;
  edit: () => void;
};

const TapToEditContainer = ({ edit, children }: Props) => (
  <View
    style={{
      flex: 1,
      marginVertical: 2,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Icon
      icon={pencil}
      color="brandPrimaryDark"
      backgroundColor="lightMintGrey"
      size="m"
      radius="circle"
      onPress={edit}
    />
    {children}
  </View>
);

export default TapToEditContainer;

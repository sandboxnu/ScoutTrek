import { ImageSourcePropType } from 'react-native';
import Image from '../Image/Image';
import { SizePresets } from '../../../utility';

interface AvatarProps {
  size: SizePresets;
  source: ImageSourcePropType;
  border?: boolean;
}

const Avatar = ({ size, source, border }: AvatarProps) => {
  return (
    <Image
      accessibilityLabel="avatar"
      radius="circle"
      size={size}
      source={source}
      border={border}
    />
  );
};

export default Avatar;

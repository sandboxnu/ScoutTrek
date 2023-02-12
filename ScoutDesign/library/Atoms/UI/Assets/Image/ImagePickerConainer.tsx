import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Text from '../../Text/Text';
import { Container, Pressable, Floatable } from '../../../utility';

import uuidv4 from 'uuid/v1';

export async function uploadAssetAsync(uri: string) {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  // @todo In place of ReactNativeFile, there will be some other object available from another upload library
  // to send files to the server using REST conventions

  // return new ReactNativeFile({
  //   uri,
  //   name: `${uuidv4()}.${fileType}`,
  //   type: 'image/jpeg', // Customize later
  // });
}

import { pencil } from 'ScoutDesign/icons';
import Badge from '../../Badge/Badge';

type Props = {
  children: any;
  loading?: boolean;
  error?: any;
  uploadImage: (apolloVariables: any) => Promise<any>;
};

const ImagePickerContainer = ({
  children,
  loading,
  error,
  uploadImage,
}: Props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const resizedPhoto = await manipulateAsync(
        result.uri,
        [{ resize: { width: 300 } }],
        { compress: 0.7, format: SaveFormat.PNG }
      );
      const file = await uploadAssetAsync(resizedPhoto.uri);
      await uploadImage({ variables: { file } });
      return;
    }
  };

  if (error) {
    console.error('Error uploading image', error);
    return null;
  }

  if (loading) {
    return (
      <Container
        size="xl"
        radius="circle"
        justifyContent="center"
        alignItems="center"
        backgroundColor="brandSecondaryLight"
      >
        <Text weight="light" color="darkGrey">
          Loading...
        </Text>
      </Container>
    );
  }

  return (
    <Pressable
      accessibilityLabel="image-picker"
      justifyContent="center"
      alignItems="center"
      onPress={pickImage}
    >
      {children}
      <Floatable corner="bottom-right" distanceFromCorner="edge">
        <Badge
          accessibilityLabel="change-image"
          icon={pencil}
          color="white"
          text="Change"
        />
      </Floatable>
    </Pressable>
  );
};

export default ImagePickerContainer;

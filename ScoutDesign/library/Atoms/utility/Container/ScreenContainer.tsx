import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageSourcePropType,
  View,
} from 'react-native';
import { Theme } from '../../../theme';
import Image from '../../UI/Assets/Image/Image';
import Constants from 'expo-constants';
import BackButton from '../../UI/Buttons/BackButton';
import DismissButton from '../../UI/Buttons/DismissButton';
import Container from './Container';
import { Color, Spacing } from '../types';

import {
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
} from '@shopify/restyle';

type headingImage = {
  source: ImageSourcePropType;
};

type ScreenProps = {
  background?: Color;
  padding?: Spacing;
  icon?: 'back' | 'close';
  back?: () => void;
  headingImage?: headingImage;
  children: any;
};

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  ScreenProps;

const ScreenContainer = ({
  background = 'white',
  padding = 's',
  back,
  icon,
  children,
  headingImage,
  ...rest
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      keyboardVerticalOffset={0}
      style={{
        flex: 1,
      }}
    >
      <Container
        flex={1}
        paddingVertical="none"
        paddingHorizontal={padding}
        backgroundColor={background}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          scrollIndicatorInsets={{ right: 1 }}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          {headingImage ? (
            <Image
              accessibilityLabel="event-map-heading"
              placement="background"
              size={{
                height: 280,
              }}
              source={headingImage.source}
              overlay="light"
            />
          ) : undefined}
          <View
            style={{
              flex: 1,
              marginTop: Constants.statusBarHeight,
            }}
          >
            {icon === 'back' ? (
              <BackButton
                corner="top-left"
                distanceFromCorner="s"
                onDismiss={back}
              />
            ) : icon === 'close' ? (
              <DismissButton
                corner="top-right"
                distanceFromCorner="s"
                onDismiss={back}
              />
            ) : null}

            <Container
              padding="none"
              flex={1}
              marginTop={headingImage ? 'xxl' : 's'}
              paddingTop={headingImage ? 'xxl' : 's'}
              {...rest}
            >
              {children}
            </Container>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ScreenContainer;

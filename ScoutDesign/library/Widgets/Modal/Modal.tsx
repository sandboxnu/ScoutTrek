import {
  Platform,
  KeyboardAvoidingView,
  View,
  Dimensions,
  Modal as RNModal,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import CircleButton from '../../Atoms/UI/Buttons/CircleButton';
import DismissButton from '../../Atoms/UI/Buttons/DismissButton';
import Text from '../../Atoms/UI/Text/Text';
import LineItem from '../LineItem/LineItem';
import { Box, Color, mapRadius } from '../../Atoms/utility';
import { forwardArrow } from '../../../icons';
import { SimpleFormStates } from '../../Atoms/FormFields/formTypes';

export interface ModalProps extends SimpleFormStates {
  escape: () => void;
  onNext?: () => void;
  openModal: () => void;
  backgroundColor?: Color;
  title?: string;
  visible: boolean;
  noStyles?: boolean;
  children?: any;
}

const ModalBase = ({
  escape,
  onNext,
  backgroundColor = 'brandPrimary',
  title,
  valid,
  noStyles,
  children,
}: ModalProps) => {
  const keyboard = useKeyboard();
  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(155, 155, 155, 0.88)',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        noStyles ? 0 : Dimensions.get('window').height * 0.1
      }
    >
      {noStyles ? (
        <>
          {children}
          {valid && onNext ? (
            <CircleButton
              accessibilityLabel="next"
              icon={forwardArrow}
              onPress={onNext}
              animated
              corner="bottom-right"
              distanceFromCorner="l"
            />
          ) : undefined}
        </>
      ) : (
        <Box
          width={Dimensions.get('window').width * 0.89}
          height={
            Dimensions.get('window').height * 0.87 - keyboard.keyboardHeight / 2
          }
          borderRadius={mapRadius('m')}
          backgroundColor="white"
        >
          <DismissButton
            onDismiss={escape}
            corner="top-right"
            distanceFromCorner="edge"
          />
          <LineItem
            accessibilityLabel="modal-header"
            bottomBorder={true}
            backgroundColor={backgroundColor}
            type="simpleRow"
            topLeftRadius="m"
            topRightRadius="m"
          >
            <Text
              color="white"
              paddingHorizontal="s"
              paddingVertical="m"
              preset="h1"
            >
              {title}
            </Text>
          </LineItem>

          <Box flex={1} paddingHorizontal="l" marginVertical="m">
            {children}
          </Box>

          {valid && onNext ? (
            <CircleButton
              accessibilityLabel="next"
              icon={forwardArrow}
              onPress={onNext}
              animated
              corner="bottom-right"
              distanceFromCorner="s"
            />
          ) : undefined}
        </Box>
      )}
    </KeyboardAvoidingView>
  );
};

const Modal = ({ visible, escape, onNext, children, ...rest }: ModalProps) => {
  let next = onNext
    ? () => {
        escape();
        onNext();
      }
    : undefined;

  return (
    <RNModal animationType="fade" transparent={true} visible={visible}>
      <ModalBase escape={escape} onNext={next} visible={visible} {...rest}>
        {children}
      </ModalBase>
    </RNModal>
  );
};

export default Modal;

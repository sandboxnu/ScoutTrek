import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'ScoutDesign/library';
import {LinearGradient} from 'expo-linear-gradient';
// import {
//   useEventForm,
//   addEventFieldOfType,
// } from 'CreateEvent/CreateEventFormStore';
import { FormFieldInputProps } from '../FormComponent';
import { StringFieldSchema } from '../FormTypes';
import DefaultInputButton from '../components/DefaultInputButton';
import { RTE } from '../components/RichTextEditor/RichTextEditor';
import Description from '../../../viewEvent/components/Description';
import BasicLineItem from '../components/BasicLineItem';

type DescriptionData = {
  // this is a string containing HTML
  data: string;
};

// short text input for event titles and other one-line inputs
const ShortTextInput = ({spec, onInput} : FormFieldInputProps<StringFieldSchema>) => {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      {
        (!!input) ?
          <DefaultInputButton fieldName={spec.title} onPress={() => setOpen(true)}/> :
          <BasicLineItem data={input}/>
      }
      {(open) && 
        <Modal onDismiss={() => {setOpen(false); onInput(input)}}>
          <RTE description={input} setDescription={setInput} />
        </Modal>
      }
    </React.Fragment>
  )
};

// long text input for event descriptions
const LongTextInput = ({spec, onInput} : FormFieldInputProps<StringFieldSchema>) => {
  const [input, setInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      {
        (!!input) ?
          <View
          style={{
            marginHorizontal: 4,
            flex: 1,
          }}>
            <Text size="s" color="brandPrimaryDark">
              {spec.title.toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderBottomWidth: 2,
                borderColor: '#34A86C',
                marginVertical: 10,
                borderRadius: 1,
              }}>
              <LinearGradient
                colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
                start={{x: 0.6, y: 0}}
                end={{x: 0.55, y: 1}}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <Text size="l" padding="m" color="brandPrimaryDark">
                  Add a description or any additional info...
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> :
          <Description description={input} />
      } 
      {(open) && 
        <Modal onDismiss={() => {setOpen(false); onInput(input);}}>
          <RTE description={input} setDescription={setInput} />
        </Modal>
      }
    </React.Fragment>
  )
};

export default {ShortTextInput, LongTextInput};



// const DescriptionInputButton = ({fieldName, onPress}) => {
//   return (
//     <View
//       style={{
//         marginHorizontal: 4,
//         flex: 1,
//       }}>
//       <Text size="s" color="brandPrimaryDark">
//         {fieldName.toUpperCase()}
//       </Text>
//       <TouchableOpacity
//         onPress={onPress}
//         style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           borderBottomWidth: 2,
//           borderColor: '#34A86C',
//           marginVertical: 10,
//           borderRadius: 1,
//         }}>
//         <LinearGradient
//           colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
//           start={{x: 0.6, y: 0}}
//           end={{x: 0.55, y: 1}}
//           style={{
//             alignItems: 'center',
//             flexDirection: 'row',
//             flex: 1,
//           }}>
//           <Text size="l" padding="m" color="brandPrimaryDark">
//             Add a description or any additional info...
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TextFieldInput = ({spec, onInput}: FormFieldInputProps<StringFieldSchema>)=> {
//   const [open, setOpen] = useState<boolean>(false);
//   const [input, setInput] = useState<string>('');

//   return (
//     <Modal
//       title={spec.title}
//       onNext={nextForm}
//       valid={!!description}>
//       <RTE description={input} setDescription={setInput} />
//     </Modal>
//   );
// };

// type DescriptionData = {
//   // this is a string containing HTML
//   data: string;
// };
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

type Props = {
  description: string;
  setDescription: React.Dispatch<any>;
};

export default function Example(props: Props) {
  let richText = useRef();
  let scrollRef = useRef();

  let contentStyle = {
    backgroundColor: '#fff',
    color: '#000033',
    caretColor: 'red',
    placeholderColor: '#a9a9a9',
  };

  return (
    <>
      <RichToolbar
        flatContainerStyle={styles.flatStyle}
        editor={richText}
        selectedIconTint={'#2095F2'}
        actions={[
          actions.keyboard,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertLink,
          actions.checkboxList,
          actions.line,
        ]}
      />
      <RichToolbar
        flatContainerStyle={styles.flatStyle}
        editor={richText}
        selectedIconTint={'#2095F2'}
        actions={[
          actions.undo,
          actions.redo,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.heading1,
          actions.heading4,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.heading4]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
          ),
        }}
      />
      <ScrollView
        style={[styles.scroll]}
        keyboardDismissMode={'none'}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
      >
        <RichEditor
          initialFocus
          editorStyle={contentStyle}
          ref={richText}
          style={styles.rich}
          useContainer={true}
          initialHeight={400}
          placeholder={'Enter your epic event details...'}
          initialContentHTML={props.description}
          onChange={props.setDescription}
          pasteAsPlainText={true}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  rich: {
    minHeight: 200,
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});

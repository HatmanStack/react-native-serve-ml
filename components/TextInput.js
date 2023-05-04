import React from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';
import {useFonts } from 'expo-font';

export default function MyTextInput({onSubmitEditing}) {
  const [text, setText] = React.useState('');
  const [fontsLoaded] = useFonts({'Sigmar': require('../assets/Sigmar/Sigmar-Regular.ttf')});
 
  return (
    <TextInput
      placeholder='Avacado Armchair'
      style={styles.input}
      onChangeText={newtext => setText(newtext)}
      onSubmitEditing={a => onSubmitEditing(text)}
      value={text}
      maxLength={200}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B58392',
    borderWidth: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderStartWidth: 10,
    borderEndWidth: 10,
    borderRadius: 6,
    height: 40,
    width: 600,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontFamily: 'Sigmar',
  },
});
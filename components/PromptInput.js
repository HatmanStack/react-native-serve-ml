import React from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';

export default function PromptInput({ passPrompt }) {
  const [text, setText] = React.useState('');
  
  return (
    <TextInput
      placeholder='Avocado Armchair' 
      style={styles.input} 
      onChangeText={newtext => setText(newtext)} // Function to update the state with the new text value
      onSubmitEditing={a => passPrompt(text)} // Function to be called when editing is submitted
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
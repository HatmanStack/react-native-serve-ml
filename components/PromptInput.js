import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function PromptInputComponent({ passPrompt }) {
  const [text, setText] = React.useState('');

  const handleTextChange = (x) => {
    setText(x);
    passPrompt(x);
  }
  
  return (
      <TextInput
      placeholder='Avocado Armchair' 
      style={styles.input} 
      multiline
      onChangeText={newtext => handleTextChange(newtext)} // Function to update the state with the new text value
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
    height: 80,
    width: 600,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontFamily: 'Sigmar',
  },
});
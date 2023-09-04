import React from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';
import {useFonts } from 'expo-font';

// Component for custom text input
export default function PromptInput({ passPrompt }) {
  // State to track the value of the text input
  const [text, setText] = React.useState('');
  // Load custom font
  const [fontsLoaded] = useFonts({ 'Sigmar': require('../assets/Sigmar/Sigmar-Regular.ttf') });

  return (
    // TextInput component
    <TextInput
      placeholder='Avacado Armchair' // Placeholder text for the input
      style={styles.input} // Styling for the input
      onChangeText={newtext => setText(newtext)} // Function to update the state with the new text value
      passPrompt={a => passPrompt(text)} // Function to be called when editing is submitted
      value={text} // Current value of the input
      maxLength={200} // Maximum length of the input
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
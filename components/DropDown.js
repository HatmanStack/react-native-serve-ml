import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Stable Diffusion 1.5', value: 'runwayml/stable-diffusion-v1-5' },
  { label: 'Van-Gogh', value: 'dallinmackay/Van-Gogh-diffusion' },
  { label: 'Robots', value: 'nousr/robo-diffusion' } 
];

export default function DropDownComponent({passModelID}){

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Model ID"
      onChange={item => {
        passModelID(item.value);
      }}
      
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 300,
    borderBottomColor: '#9DA58D',
    borderBottomWidth: 3,
  },
  placeholderStyle: {
    fontSize: 25,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sigmar',
    letterSpacing: 3,
  },
  selectedTextStyle: {
    fontSize: 20,
    letterSpacing: 3,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Sigmar',
  },
});

import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import  Slider  from "@react-native-community/slider";
import {useFonts } from 'expo-font';

export default function MySlider({passSteps}) {
  const [fontsLoaded] = useFonts({'Sigmar': require('../assets/Sigmar/Sigmar-Regular.ttf')});
  const[ssValue, setssValue] = React.useState(50);

  const handleValueChange = (x) =>{
    setssValue(x);
    passSteps(x);
  }

  return (     
    <View>
      <Text style={styles.captionText}>Sampling Steps</Text>
      <Slider
        style={styles.sliderBase}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={50}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#000000"
        thumbTintColor='#6750A4'
        onValueChange={handleValueChange}
        />
      <Text style={styles.sliderFont}>{ssValue}</Text>
    </View> 
    );
}

const styles = StyleSheet.create({
    sliderBase: {
      width: 400,
      height: 40,
    },
    sliderFont:{
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '10',
      textAlign: 'center',
      fontFamily: 'Sigmar',
      letterSpacing: 3,
    },
    captionText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '10',
      textAlign: 'center',
      fontFamily: 'Sigmar',
      paddingTop: 50,
      letterSpacing: 3,
    },
  });
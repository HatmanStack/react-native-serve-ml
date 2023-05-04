
import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import  Slider  from "@react-native-community/slider";
import MyInference from './Inference';
import {useFonts } from 'expo-font';

export default function MySlider() {
  const [fontsLoaded] = useFonts({'Sigmar': require('../assets/Sigmar/Sigmar-Regular.ttf')});
  const[csValue, setcsValue] = React.useState(50);
  const[tempValue, settempValue] = React.useState(.5);
  const[spValue, setspValue] = React.useState(50);
  const[ssValue, setssValue] = React.useState(50);

  return (     
    <View>
      <Text style={styles.captionText}>Conditioning Scale</Text>
      
      <Slider
        style={styles.sliderBase}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={50}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#000000"
        thumbTintColor='#6750A4'
        onValueChange={v => setcsValue(v)}
        />
      <Text style={styles.sliderFont}>{csValue}</Text>
      
      <Text style={styles.captionText}>Temperature</Text>
      <Slider
        style={styles.sliderBase}
        minimumValue={0}
        maximumValue={1}
        step={.01}
        value={.5}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#000000"
        thumbTintColor='#6750A4'
        onValueChange={v => settempValue(v)}
        />
      <Text style={styles.sliderFont}>{tempValue}</Text>

      <Text style={styles.captionText}>Sampling Proportion</Text>
      <Slider
        style={styles.sliderBase}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={50}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#000000"
        thumbTintColor='#6750A4'
        onValueChange={v => setspValue(v)}
        />
      <Text style={styles.sliderFont}>{spValue}</Text>

      <Text style={styles.captionText}>Sampling Step</Text>
      <Slider
        style={styles.sliderBase}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={50}
        minimumTrackTintColor="#958DA5"
        maximumTrackTintColor="#000000"
        thumbTintColor='#6750A4'
        onValueChange={v => setssValue(v)}
        />
      <Text style={styles.sliderFont}>{ssValue}</Text>

      <MyInference cs={csValue} temp={tempValue} sp={spValue} ss={ssValue}/>
    </View > 
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
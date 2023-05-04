import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';

import ImageViewer from './components/ImageViewer';
import MySlider from './components/Slider';
import MyTextInput from './components/TextInput';
import MyInference from './components/Inference';
import Breathing from './components/breathing';
import {useFonts } from 'expo-font'; 

const Image = require('./assets/avacado.jpg');

export default function App() {
  const [prompt, setPrompt] = useState('Avacado Armchair');
  const [fontsLoaded] = useFonts({'Sigmar': require('./assets/Sigmar/Sigmar-Regular.ttf')});
  const [inferredImage, setInferredImage] = useState(Image);
  const passPrompt = (x) => {setPrompt(x)};
  const passImage = (x) => {setInferredImage(x)};
  
  return (
    
      <View style={styles.titlecontainer}>
        <Breathing/>
      
    
      <View style={styles.container}>
        <View style={styles.columnContainer}>
          <View>
            <MyTextInput onSubmitEditing={passPrompt}/>
          </View>
          <View>
            <MySlider/>
          </View>
        </View>
        <View style={styles.columnContainer}> 
          <View style={styles.columnContainer}> 
            <ImageViewer prompt={prompt} PlaceholderImage={inferredImage}/> 
          </View>
          <View style={styles.columnContainer}>    
            <Text style={{color: '#FFFFFF', fontSize: 18,fontWeight: 'italic',
                          textAlign: 'center',wordWrap: 'break-word', fontFamily:'Sigmar',
                          letterSpacing: 2, lineHeight: 30,}}>{prompt}</Text>
        </View>
      </View>
    <MyInference prompt={prompt} PlaceholderImage={passImage}/> 
    </View>
    
    <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  titlecontainer: {
    backgroundColor: '#25292e',
    position: 'fixed', // or 'absolute
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 7/8,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

registerRootComponent(App);
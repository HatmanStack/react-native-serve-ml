import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';

import ImageViewer from './components/ImageViewer';
import MySlider from './components/Slider';
import MyTextInput from './components/TextInput';
import MyInference from './components/Inference';
import Breathing from './components/breathing';
import {useFonts } from 'expo-font'; 

const assetImage = require('./assets/avacado.jpg');

export default function App() {
  const [prompt, setPrompt] = useState('Avacado Armchair');
  const [fontsLoaded] = useFonts({'Sigmar': require('./assets/Sigmar/Sigmar-Regular.ttf')});
  const [inferredImage, setInferredImage] = useState(assetImage);
  const passPrompt = (x) => {setPrompt(x)};
  const passImage = (x) => {setInferredImage(x)};
  
  return (
      // Main container
      <View style={styles.titlecontainer}>
        <Breathing/>
        <ScrollView scrollY={true} style={{marginTop:50}}> 
      <View style={styles.container}>
      
        {/* Left column */}
        <View style={styles.columnContainer}>
          <View>
            <MyTextInput onSubmitEditing={passPrompt}/>
          </View>
          <View>
            <MySlider/>
          </View>
        </View>
        {/* Right column */}
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
      
    {/* Component for inference */}
    <MyInference prompt={prompt} PlaceholderImage={passImage}/> 
      </View>
      </ScrollView>
    <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  titlecontainer: {
    backgroundColor: '#25292e',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    overflow: 'auto',
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

registerRootComponent(App);
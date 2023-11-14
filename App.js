import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View, ScrollView, Text, Pressable, useWindowDimensions} from 'react-native';
import axios from 'axios';

import ImageViewerComponent from './components/ImageViewer';
import SliderComponent from './components/Slider';
import PromptInputComponent from './components/PromptInput';
import BreathingComponent from './components/Breathing';
import DropDownComponent from './components/DropDown';
import {useFonts } from 'expo-font'; 

const assetImage = require('./assets/avocado.jpg');

export default function App() {
  useFonts({'Sigmar': require('./assets/Sigmar/Sigmar-Regular.ttf')});
  const [inferredImage, setInferredImage] = useState(assetImage);
  const [steps, setSteps] = useState(45);
  const [guidance, setGuidance] = useState(45);
  const [modelID, setModelID] = useState('prompthero/openjourney')
  const [prompt, setPrompt] = useState('Avocado Armchair');
  const [parameters, setParameters] = useState('')
  const [activity, setActivity] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [returnedPrompt, setReturnedPrompt] = useState('Avocado Armchair');
  const {width} = useWindowDimensions();

  const passPromptWrapper = (x) => {setPrompt(x)};
  const passStepsWrapper = (x) => {setSteps(x)};
  const passGuidanceWrapper = (x) => {setGuidance(x)};
  const passModelIDWrapper = (x) => {
      setModelError(false);
      setModelID(x)};
  
  useEffect(() => {
    if (parameters != ''){
      setActivity(true);
      axios.post("http://localhost:8081/api", {
      // Create Body to send to our backend
      prompt: prompt,
      steps: steps,
      guidance: guidance,
      modelID: modelID
    })
    .then(response => {
      console.log(response);
      setActivity(false);
      setReturnedPrompt(prompt);
      setInferredImage('data:image/png;base64,' + response.data.output);
    })
    .catch(function (error) {
      setActivity(false);
      setModelError(true);
      console.log(error);
    });
  }
  },[parameters]);

  return (
      // Main container
      <View style={styles.titlecontainer}>
        <BreathingComponent /> 
        <ScrollView scrollY={true} style={styles.ScrollView} showsVerticalScrollIndicator={false}> 
          {width > 1000 ? (<View style={styles.rowContainer}>
              {/* Left column */}
              <View style={styles.columnContainer}>
                  <View>
                    <PromptInputComponent passPrompt={passPromptWrapper} />
                  </View>
                  <View style={styles.rowContainer}>
                    <DropDownComponent passModelID={passModelIDWrapper} />
                      <View style={styles.columnContainer}>
                      {activity ?
                        <ActivityIndicator size="large" color="#B58392" style={styles.activityIndicator} /> :
                        <Pressable
                          onPress={() => { setParameters(`${prompt}-${steps}-${guidance}-${modelID}`); } }
                          style={({ pressed }) => [{ backgroundColor: pressed ? '#9DA58D' : '#958DA5', }, styles.button]}>
                          {({ pressed }) => (<Text style={styles.promptText}>{pressed ? 'INFERRED!' : 'Inference'}</Text>)}
                        </Pressable>}
                      {modelError ? <Text style={styles.promptText}>Model Error!</Text>:<></>}
                      </View>
                    </View>
                  <View>
                    <SliderComponent passSteps={passStepsWrapper} passGuidance={passGuidanceWrapper} />
                  </View>
                </View>
                {/* Right column */}
                <View style={styles.columnContainer}>
                  <View style={styles.columnContainer}>
                    <ImageViewerComponent PlaceholderImage={inferredImage} />
                    <Text style={styles.promptText}>{returnedPrompt}</Text>
                  </View>
                </View>
             
          </View>) : 
          (<View style={styles.columnContainer}>
            <PromptInputComponent passPrompt={passPromptWrapper} />
                <DropDownComponent passModelID={passModelIDWrapper} />
                {activity ?
                  <ActivityIndicator size="large" color="#B58392"/> :
                  <Pressable
                    onPress={() => { setParameters(`${prompt}-${steps}-${guidance}-${modelID}`); } }
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#9DA58D' : '#958DA5', }, styles.button]}>
                    {({ pressed }) => (<Text style={styles.promptText}>{pressed ? 'INFERRED!' : 'Inference'}</Text>)}
                  </Pressable>}
                  {modelError ? <Text style={styles.promptText}>Model Error!</Text>:<></>}
                <SliderComponent passSteps={passStepsWrapper} passGuidance={passGuidanceWrapper} />   
                <ImageViewerComponent PlaceholderImage={inferredImage} />
                <Text style={styles.promptText}>{returnedPrompt}</Text>
            </View>)}
        </ScrollView><StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  canvascontainer: {
    backgroundColor: '#25292e',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50
  },
  titlecontainer: {
    backgroundColor: '#25292e',
    position: 'absolute',
    
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  
    padding: 50
  },
  rowContainer: {
    flex: 1,
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    overflow: 'auto',
    padding: 20
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  button:{
    fontFamily: 'Sigmar',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  },
  activityIndicator:{
    marginLeft: 50
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'italic',
    textAlign: 'center',
    wordWrap: 'break-word',
    fontFamily: 'Sigmar',
    letterSpacing: 2,
    lineHeight: 30
  },
  ScrollView: {
    backgroundColor: '#25292e',
    marginTop: 50,
    padding: 5
  }
});

registerRootComponent(App);
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {useFonts } from 'expo-font';

export default function Breathing(){
    const [fontsLoaded] = useFonts({'Sigmar': require('../assets/Sigmar/Sigmar-Regular.ttf')});
      const animatedValues = useRef([...Array(6)].map(() => new Animated.Value(0))).current;
    
    useEffect(() => {
      const animations = animatedValues.map((animatedValue, index) => {
        const animation1 = Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        });
  
        const animation2 = Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        });
        
        const delays = [
          index * 500,
          index * 300,
          (5 - index) * 500,
          index * 800,
          (5 - index) * 300,
          index * 500,
          (5 - index) * 500,
          (5 - index) * 800,
        ];
        
        const animationSequence = delays.map((delay, index) => {
          return Animated.sequence([
            Animated.delay(delay),
            animation1,
            animation2,
          ]);
        });
        console.log(animationSequences)
        
        const animationSequences = Animated.sequence([
          animationSequence[0],
          animationSequence[1],
          animationSequence[2],
          animationSequence[3],
          animationSequence[4],
          animationSequence[5],
          animationSequence[6],
          animationSequence[7],
        ]);
        
        return Animated.loop(animationSequences);
      });
      
      animations.forEach((animation) => {
        animation.start();
      });

    }, [animatedValues]);
  
    const interpolateAnimations = animatedValues.map((animatedValue) =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 90],
        extrapolate: 'clamp'
      })
    );
  
    const animatedStyles = interpolateAnimations.map((interpolateAnimation) => ({
      fontSize: interpolateAnimation,
    }));
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          <Animated.Text style={[styles.char, animatedStyles[0]]}>S</Animated.Text>
          <Animated.Text style={[styles.char, animatedStyles[1]]}>U</Animated.Text>
          <Animated.Text style={[styles.char, animatedStyles[2]]}>N</Animated.Text>
          <Animated.Text style={[styles.char, animatedStyles[3]]}>D</Animated.Text>
          <Animated.Text style={[styles.char, animatedStyles[4]]}>A</Animated.Text>
          <Animated.Text style={[styles.char, animatedStyles[5]]}>E</Animated.Text>
        </Text>
      </View>
    );
  };
    

const styles = StyleSheet.create({
    container: {
      flex: 1/8,
      alignItems: 'center',
      justifyContent: 'center',
      
      
    
      
    },
    heading: {
      fontWeight: 'bold',
      fontWeight: '20',
    color: '#6750A4',
    fontFamily: 'Sigmar',
    posistion:'absolute',
    top:0,
    left: 0,
    

    },
    char: {
      marginHorizontal: 15,
    },
  });

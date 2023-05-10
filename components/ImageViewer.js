import { StyleSheet, Image, Text } from 'react-native';

export default function ImageViewer({PlaceholderImage }) {
    return (
    <div>
      <Image source={PlaceholderImage} style={styles.imagestyle} />
    </div>
  );
}

const styles = StyleSheet.create({
  imagestyle: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

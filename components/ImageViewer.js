import { StyleSheet, Image, Text } from 'react-native';

export default function ImageViewer({PlaceholderImage }) {
    return (
    <div>
      <Image source={PlaceholderImage} style={styles.image} />
    </div>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

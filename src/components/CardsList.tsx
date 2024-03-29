import { View, StyleSheet, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const cards = [
  require('../../assets/cards/Card 1.png'),
  require('../../assets/cards/Card 2.png'),
  require('../../assets/cards/Card 3.png'),
  require('../../assets/cards/Card 4.png'),
  require('../../assets/cards/Card 5.png'),
  require('../../assets/cards/Card 6.png'),
  require('../../assets/cards/Card 7.png'),
  require('../../assets/cards/Card 8.png'),
  require('../../assets/cards/Card 9.png'),
];

const CardsList = () => {
  const pan = Gesture.Pan()
    .onStart(() => {
      console.log('Panning started');
    })
    .onChange((event) => {
      console.log('Panning. Scrolled on Y:', event.changeY);
    })
    .onEnd(() => {
      console.log('Panning ended');
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {cards.map((card, index) => (
          <Image key={index} source={card} style={styles.image} />
        ))}
      </View>
    </GestureDetector>
  );
};

export default CardsList;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});

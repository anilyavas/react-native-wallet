import { StyleSheet } from 'react-native';
import Animated, { useDerivedValue } from 'react-native-reanimated';

const Card = ({ card, index, scrollY }) => {
  const translateY = useDerivedValue(() => -scrollY.value);
  return (
    <Animated.Image
      source={card}
      style={[styles.image, { transform: [{ translateY: translateY }] }]}
    />
  );
};

export default Card;
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 7 / 4,
    marginVertical: 5,
  },
});

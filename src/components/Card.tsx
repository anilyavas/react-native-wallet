import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  clamp,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const Card = ({ card, index, scrollY, activeCardIndex }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useSharedValue(0);
  const { height: screenHeight } = useWindowDimensions();

  useAnimatedReaction(
    () => scrollY.value,

    (current) => {
      translateY.value = clamp(-current, -index * cardHeight, 0);
    }
  );

  useAnimatedReaction(
    () => activeCardIndex.value,
    (current, previous) => {
      if (current === previous) {
        return;
      }
      if (activeCardIndex.value === null) {
        translateY.value = withTiming(
          clamp(-scrollY.value, -index * cardHeight, 0)
        );
      } else if (activeCardIndex.value === index) {
        translateY.value = withTiming(-index * cardHeight);
      } else {
        translateY.value = withTiming(
          -index * cardHeight * 0.9 + screenHeight * 0.7
        );
      }
    }
  );

  const tap = Gesture.Tap().onEnd(() => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.Image
        source={card}
        onLayout={(event) =>
          setCardHeight(event.nativeEvent.layout.height + 10)
        }
        style={[styles.image, { transform: [{ translateY: translateY }] }]}
      />
    </GestureDetector>
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

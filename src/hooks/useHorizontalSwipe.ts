import { MouseEvent, TouchEvent, useState } from 'react';

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

const useHorizontalSwipe = <T = Element>(
  input: SwipeInput
): {
  onMouseDown: (e: MouseEvent<T>) => void;
  onMouseUp: () => void;
  onMouseMove: (e: MouseEvent<T>) => void;
  onTouchStart: (e: TouchEvent<T>) => void;
  onTouchMove: (e: TouchEvent<T>) => void;
  onTouchEnd: () => void;
} => {
  const [swipeStart, setSwipeStart] = useState(0);
  const [swipeEnd, setSwipeEnd] = useState(0);
  const minSwipeDistance = 30;
  const distance = swipeStart - swipeEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;

  const onMouseDown = (e: MouseEvent<T>) => {
    setSwipeEnd(0);
    setSwipeStart(e.clientX);
  };

  const onMouseMove = (e: MouseEvent<T>) => setSwipeEnd(e.clientX);

  const onMouseUp = () => {
    if (!swipeStart || !swipeEnd) return;

    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  const onTouchStart = (e: TouchEvent<T>) => {
    setSwipeEnd(0);
    setSwipeStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<T>) =>
    setSwipeEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!swipeStart || !swipeEnd) return;

    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useHorizontalSwipe;

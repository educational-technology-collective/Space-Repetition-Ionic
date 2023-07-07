import { useRef } from "react";
import Card from "../CardComp/Card";
import "./FlashCardList.css";
const FlashCardList: React.FC<{
  array: flashCard[];
  tupleIndex: number;
  tupleCounter: number;
  isFrontTuple: boolean;
  logInfo: reviewInfo;
  updateInfo: (newInfo: reviewInfo) => void;
  swipeNextCard: (tupleIndex: number, newInfo: reviewInfo) => void;
  swipeOneMoreCard: (tupleIndex: number, newInfo: reviewInfo) => void;
}> = ({
  array,
  tupleIndex,
  tupleCounter,
  isFrontTuple,
  logInfo,
  updateInfo,
  swipeNextCard,
  swipeOneMoreCard,
}) => {

  // The Reference of the Whole Tuple, used for poorcard/know/dont know swipe
  const refTuple = useRef<HTMLInputElement>(null);

  // TupleBehind is the card that is stacked at bottom (next card)
  const tupleBehindCard: flashCard = array[array.length - 1];

  // Key is Necessary for not shuffling choices multiple times
  const component = (
    <Card
      obj={tupleBehindCard}
      key={tupleBehindCard._id}
      tupleLength={array.length}
      cardIndex = {array.length}
      tupleIndex={tupleIndex}
      logInfo={logInfo}
      updateInfo={updateInfo}
      moveOn={swipeNextCard}
      oneMore={swipeOneMoreCard}
      refTuple={refTuple}
      tupleCounter={tupleCounter}
    />
  );

  // Component Being Rendered
  return (
    <div className="tuple" ref={refTuple}>
      {isFrontTuple
        ? array.map((card, index) => {
            // If the tuple is front, we display its top two cards

            if (index === tupleCounter - 1 || index === tupleCounter - 2) {
              return (
                <Card
                  obj={card}
                  key={card._id}
                  tupleLength={array.length}
                  cardIndex={index}
                  tupleIndex={tupleIndex}
                  logInfo={logInfo}
                  updateInfo={updateInfo}
                  moveOn={swipeNextCard}
                  oneMore={swipeOneMoreCard}
                  refTuple={refTuple}
                  tupleCounter={tupleCounter}
                />
              );
            }
          })
        : // If the tuple is below. We only display the topmost one
          component}
    </div>
  );
};

export default FlashCardList;

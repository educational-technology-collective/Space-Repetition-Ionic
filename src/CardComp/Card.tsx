import { IonCard, IonCardContent, createGesture } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import "./Card.css";
import FrontIndicator from "../components/FrontIndicator";
import BackIndicator from "../components/BackIndicator";
import MCQ from "./MCQ";
import QA from "./QA";
import { enableGesture } from "./Gesture";
const Card: React.FC<{
  obj: flashCard;
  tupleIndex: number;
  moveOn: (tupleIndex: number) => void;
  oneMore: (tupleIndex: number) => void;
  refTuple: React.RefObject<HTMLInputElement>;
}> = ({ obj, tupleIndex, moveOn, oneMore, refTuple }) => {
  const ref = useRef<HTMLInputElement>(null);

  // This isClicked is for the tap of the card
  const [isClicked, setIsClicked] = useState(false);

  // Transform with 360 degree flipping
  const style = isClicked
    ? { transform: "rotateY(180deg)", background: "rgba(251,255,236,1)" }
    : { transform: "rotateY(0deg)" };

  // Callback for the tap of card
  const clickHandler = () => {
    setIsClicked(!isClicked);
    setClick(true);
    setCorrect(true);
  };

  const [clicked, setClick] = useState(false);

  // Function for one more swipe time out
  const oneMoreTimeOut = () => {
    oneMore(tupleIndex);
  };

  // Function that goes to next card after some time
  const timeOutFunc = () => {
    moveOn(tupleIndex);
  };

  // Allows Gesture only after user clicks an option
  useEffect(() => {
    enableGesture(
      ref.current,
      refTuple.current,
      isClicked,
      handleNegativeOpacity,
      handlePositiveOpacity,
      handleNoMoreOpacity,
      handleOneMoreOpacity,
      handleShowNothing,
      backHandler,
      timeOutFunc,
      oneMoreTimeOut
    );
  });

  const setClickStatus = () => {
    setClick(true);
  };

  // If the user answers correctly
  const [correct, setCorrect] = useState(false);

  const setCorrectStatus = () => {
    setCorrect(true);
  };

  const backHandler = () => {
    setClick(false);
    setIsClicked(false);
  };

  const cardComp =
    obj.type === "q" ? (
      <QA obj={obj} />
    ) : (
      <MCQ
        obj={obj}
        clicked={clicked}
        setClickStatus={setClickStatus}
        setCorrectStatus={setCorrectStatus}
      />
    );

  const cardContentStyle =
    obj.type === "q"
      ? "card-content qa-card-content"
      : "card-content mcq-card-content";

  const [indicatorOpacity, setOpacity] = useState({ index: 0, value: 0 });

  const handlePositiveOpacity = (detail: any) => {
    setOpacity({ index: 2, value: detail.deltaX / 100 });
  };

  const handleNegativeOpacity = (detail: any) => {
    setOpacity({ index: 4, value: -detail.deltaX / 100 });
  };

  const handleNoMoreOpacity = (detail: any) => {
    setOpacity({ index: 1, value: detail.deltaY / 100 });
  };

  const handleOneMoreOpacity = (detail: any) => {
    setOpacity({ index: 3, value: -detail.deltaY / 100 });
  };

  const handleShowNothing = () => {
    setOpacity({ index: 0, value: 0 });
  };

  return (
    <div className="card-wrapper" ref={ref}>
      <IonCard
        className="card-container"
        onClick={clickHandler}
        disabled={isClicked}
      >
        <IonCardContent className={cardContentStyle} style={style}>
          {/* Front Indicator */}
          <FrontIndicator indicatorOpacity={indicatorOpacity} />

          {cardComp}
          {/* Indicators For the Back Page */}
          <BackIndicator indicatorOpacity={indicatorOpacity} />
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Card;

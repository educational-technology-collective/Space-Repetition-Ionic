import { IonText } from "@ionic/react";
import "./Card.css";

const QA: React.FC<{ obj: flashCard }> = ({ obj }) => {
  const question = obj.content.question;
  const answer = obj.content.answer;

  // Coponent Being Rendered
  return (
    <>
      {/* Front QuestionText */}
      <IonText className="card-text front-text">{question}</IonText>
      {/* Back AnswerText */}
      <IonText className="card-text back-text qa-question-back">
        {question}
      </IonText>
      <IonText className="card-text back-text qa-answer">{answer}</IonText>
    </>
  );
};

export default QA;

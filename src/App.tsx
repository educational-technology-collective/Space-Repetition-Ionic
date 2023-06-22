import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  setupIonicReact,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { TbHomeEdit } from "react-icons/tb";
import { Haptics } from "@capacitor/haptics";
import { useState } from "react";
import CardScreen from "./pages/CardScreen";
import Home from "./pages/Home";
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { radio, save } from "ionicons/icons";
import { cardCollection } from "./components/exampleData";
setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  // The Card Array
  const [cardCol, setCards] = useState(cardCollection);

  // How Many Cards Finished
  const [finished, setFinished] = useState(0);

  // How Many Cards in total
  const [total, setTotal] = useState(cardCol.length);

  // Counter used to display certain cards
  const [counter, setCounter] = useState(cardCol.length);

  // Tuple Counter for One More Cards
  const [tupleCounter, setTupleCounter] = useState(
    cardCol[cardCol.length - 1].length
  );

  // Card-Stacker Visual Effect
  const [isShake, setShake] = useState(false);

  // Handler that set the card-stacker back without shaking
  const handleShake= () => {
    setShake(true);
    setTimeout(() => setShake(false), 1600);
  };

  // Logic to Move On to Next Card
  const swipeNextCard = (tupleIndex: number) => {
    setFinished((prevFinished) => prevFinished + 1);
    setCounter((prevCounter) => prevCounter - 1);

    // If the current tuple is not the last one, reset the counter of tuple
    // to the next array's length
    if (tupleIndex > 0) {
      setTupleCounter(cardCol[tupleIndex - 1].length);
    }
  };

  // Function that swipes for one more card
  const swipeOneMoreCard = (tupleIndex: number) => {
    // Check if there is no onemore card for this card
    if (tupleCounter === 1) {
      // If the current tuple is not the last one, reset the counter of tuple
      // to the next array's length
      if (tupleIndex > 0) {
        setTupleCounter(cardCol[tupleIndex - 1].length);
      }
      // Vibration of device
      Haptics.vibrate({ duration: 500 });
      

      // Visual Vibration
      handleShake();
      setFinished((prevFinished) => prevFinished + 1);
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      setFinished((prevFinished) => prevFinished + 1);
      setTotal((prevTotal) => prevTotal + 1);

      // Decrement the Counter
      setTupleCounter((prevTupleCounter) => prevTupleCounter - 1);
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/home"
              render={() => <Home finished={finished} total={total} />}
            />
            <Route
              exact
              path="/cardscreen"
              render={() => (
                <CardScreen
                  finished={finished}
                  total={total}
                  counter={counter}
                  tupleCounter={tupleCounter}
                  cardCol={cardCol}
                  isShake={isShake}
                  swipeNextCard={swipeNextCard}
                  swipeOneMoreCard={swipeOneMoreCard}
                
                />
              )}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="tab-bar">
            <IonTabButton tab="home" href="/home" className="icons">
              <TbHomeEdit size="3em" />
            </IonTabButton>
            <IonTabButton className="icons">
              <IonIcon icon={save}></IonIcon>
            </IonTabButton>
            <IonTabButton className="icons">
              <IonIcon icon={radio}></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

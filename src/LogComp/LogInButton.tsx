import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";
import "./LogButton.css";
const LogInButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        await Browser.open({ url, windowName: "_self" });
      },
    });
  };

  return (
    <>
      <IonButton onClick={login} className="log-button login-button">
        Sign In
      </IonButton>
    </>
  );
};

export default LogInButton;

import { useState } from "react";
import ValentineQuestion from "@/components/ValentineQuestion";
import CelebrationScreen from "@/components/CelebrationScreen";

const Index = () => {
  const [accepted, setAccepted] = useState(false);

  return accepted ? (
    <CelebrationScreen />
  ) : (
    <ValentineQuestion onAccept={() => setAccepted(true)} />
  );
};

export default Index;

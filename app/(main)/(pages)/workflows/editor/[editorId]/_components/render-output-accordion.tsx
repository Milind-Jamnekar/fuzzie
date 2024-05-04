import { useFuzzieStore } from "@/lib/store";
import { ConnectionProviderProps } from "@/providers/connections-provider";
import { EditorState } from "@/providers/editor-provider";
import ContentBasedOnTitle from "./content-based-on-title";

type Props = {
  state: EditorState;
  connection: ConnectionProviderProps;
};

function RenderOutputAccordion() {
  const {
    googleFile,
    selectedSlackChannels,
    setGoogleFile,
    setSelectedSlackChannels,
    setSlackChannels,
    slackChannels,
  } = useFuzzieStore();
  return (
    <ContentBasedOnTitle
      file={googleFile}
      selectedSlackChannels={slackChannels}
      setFile={setGoogleFile}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
}

export default RenderOutputAccordion;

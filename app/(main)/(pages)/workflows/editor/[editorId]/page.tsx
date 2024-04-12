import { ConnectionsProvider } from "@/providers/connections-provider";
import EditorCanvas from "./_components/editor-canvas";
import EditorProvider from "@/providers/editor-provider";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;

"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type ConnectionProviderProps = {
  discordNode: {
    webhookURL: string;
    content: string;
    webhookName: string;
    guildName: string;
  };
  setDiscordNode: Dispatch<SetStateAction<any>>;
  googleNode: {}[];
  setGoogleNode: Dispatch<SetStateAction<any>>;
  notionNode: {
    accessToken: string;
    databaseId: string;
    workspaceName: string;
    // #notionSchema
    content: "";
  };
  workflowTemplate: {
    discord?: string;
    notion?: string;
    slack?: string;
  };
  setNotionNode: Dispatch<SetStateAction<any>>;
  slackNode: {
    appId: string;
    authedUserId: string;
    authedUserToken: string;
    slackAccessToken: string;
    botUserId: string;
    teamId: string;
    teamName: string;
    content: string;
  };
  setSlackNode: Dispatch<SetStateAction<any>>;
  setWorkFlowTemplate: Dispatch<
    SetStateAction<{
      discord?: string;
      notion?: string;
      slack?: string;
    }>
  >;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type ConnectionWithChildProps = {
  children: ReactNode;
};

const InitialValues: ConnectionProviderProps = {
  discordNode: {
    webhookURL: "",
    content: "",
    webhookName: "",
    guildName: "",
  },
  googleNode: [],
  //WIP: I have to customized content schema here and type #notionSchema
  notionNode: {
    accessToken: "",
    databaseId: "",
    workspaceName: "",
    content: "",
  },
  workflowTemplate: {
    discord: "",
    notion: "",
    slack: "",
  },
  slackNode: {
    appId: "",
    authedUserId: "",
    authedUserToken: "",
    slackAccessToken: "",
    botUserId: "",
    teamId: "",
    teamName: "",
    content: "",
  },
  isLoading: false,
  setGoogleNode: () => undefined,
  setDiscordNode: () => undefined,
  setNotionNode: () => undefined,
  setSlackNode: () => undefined,
  setIsLoading: () => undefined,
  setWorkFlowTemplate: () => undefined,
};

const ConnectionsContext = createContext(InitialValues);
const { Provider } = ConnectionsContext;

export const ConnectionsProvider = ({ children }: ConnectionWithChildProps) => {
  const [discordNode, setDiscordNode] = useState(InitialValues.discordNode);
  const memoizedDiscordNode = useMemo(() => discordNode, [discordNode]);

  const [googleNode, setGoogleNode] = useState(InitialValues.googleNode);
  const memoizedGoogleNode = useMemo(() => googleNode, [googleNode]);

  const [notionNode, setNotionNode] = useState(InitialValues.notionNode);
  const memoizedNotionNode = useMemo(() => notionNode, [notionNode]);

  const [slackNode, setSlackNode] = useState(InitialValues.slackNode);
  const memoizedSlackNode = useMemo(() => slackNode, [slackNode]);

  const [workflowTemplate, setWorkFlowTemplate] = useState(
    InitialValues.workflowTemplate
  );
  const memoizedWorkflowTemplate = useMemo(
    () => workflowTemplate,
    [workflowTemplate]
  );

  const values = {
    discordNode: memoizedDiscordNode,
    setDiscordNode,
    googleNode: memoizedGoogleNode,
    setGoogleNode,
    notionNode: memoizedNotionNode,
    setNotionNode,
    slackNode: memoizedSlackNode,
    setSlackNode,
    isLoading: useState(InitialValues.isLoading)[0],
    setIsLoading: useState(InitialValues.isLoading)[1],
    workflowTemplate: memoizedWorkflowTemplate,
    setWorkFlowTemplate,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useNodeConnections = () => {
  const nodeConnection = useContext(ConnectionsContext);
  return { nodeConnection };
};

import { MainPageTitle } from "@/components/reusable";
import { CONNECTIONS } from "@/lib/constant";
import ConnectionCard from "./_components/connections-card";

function ConnectionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Connections" />
      <div className="p-6">
        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
          Connect all your apps directly from here. You may need to connect
          these apps regularly to refresh verification
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {CONNECTIONS.map((connection) => (
            <ConnectionCard
              key={connection.title}
              callback={() => {}}
              connected={""}
              description={connection.description}
              icon={connection.image}
              title={connection.title}
              type={connection.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConnectionsPage;

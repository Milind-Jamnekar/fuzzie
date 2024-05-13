"use client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { getGoogleListener } from "../../../_actions/workflow-connections";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { CardContainer } from "@/components/global/3d-card";
import { Loader } from "lucide-react";

type Props = {};

const GoogleDriveFiles = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const reqGoogle = useCallback(async () => {
    setLoading(true);
    const response = await axios.get("/api/drive-activity");
    if (response) {
      toast.message(response.data);
      setLoading(false);
      setIsListening(true);
    }
    setIsListening(false);
  }, []);

  const onListener = useCallback(async () => {
    const listener = await getGoogleListener();
    if (listener?.googleResourceId !== null) {
      setIsListening(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    setLoading(true);
    onListener().then((check) => {
      if (!check) {
        setLoading(false);
      }
    });
  }, [onListener]);

  return (
    <div className="flex flex-col gap-3 pb-6">
      {isListening ? (
        <Card className="py-3">
          <CardContainer>
            <CardDescription>Listening...</CardDescription>
          </CardContainer>
        </Card>
      ) : (
        <Button
          variant="outline"
          onClick={() => reqGoogle()}
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-6 h-6 animate-spin text-gray-500" />
          ) : (
            "Create Listener"
          )}
        </Button>
      )}
    </div>
  );
};

export default GoogleDriveFiles;

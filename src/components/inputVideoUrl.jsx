import { Youtube } from "@geist-ui/icons";
import { Input, Button, Spacer } from "@geist-ui/core";
import { useState } from "react";
export const InputVideoUrl = ({ downloadVideo, btnLoading }) => {
  const [url, setUrl] = useState("");
  const urlValue = (value) => {
    setUrl(value.target.value);
  };
  return (
    <>
      <Input
        scale={4 / 3}
        icon={<Youtube />}
        placeholder="Youtube video URL"
        width="100%"
        onChange={urlValue}
        disabled={btnLoading}
        clearable
      />
      <Spacer h={2} />
      <Button
        loading={btnLoading}
        auto
        type="secondary"
        onClick={() => downloadVideo(url)}
      >
        Descargar
      </Button>
    </>
  );
};

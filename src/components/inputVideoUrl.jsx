import { Download, Youtube } from "@geist-ui/icons";
import { Input, Button, Spacer, Note } from "@geist-ui/core";
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
        placeholder="URL de video en youtube ctrl+v"
        width="100%"
        onChange={urlValue}
        disabled={btnLoading}
        clearable
      />
      <Spacer h={2} />
      <Button 
      iconRight={<Download />} 
        className="input-video-url__button"
        loading={btnLoading}
        auto
        type="secondary"
        onClick={() => downloadVideo(url)}
      >
        Descargar
      </Button>
      <Spacer h={1} />
    </>
  );
};

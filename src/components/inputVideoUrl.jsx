import { useState } from "react";
import { Download, Youtube } from "@geist-ui/icons";
import { Input, Button, Spacer } from "@geist-ui/core";
import { getVideoInfo } from "../api/api.js";
import { isEmpty } from "lodash";
export const InputVideoUrl = ({
  downloadVideo,
  btnLoading,
  setVideoInfo,
  setOpenAnimation,
  setVisibleCard,
}) => {
  const [url, setUrl] = useState("");
  const urlValue = async (value) => {
    setUrl(value.target.value);
    if (!isEmpty(value.target.value)) {
      const response = await getVideoInfo(value.target.value);
      if (response.status) {
        setVideoInfo(response.data);
        setOpenAnimation(true);
        setVisibleCard(true);
      }
    }
  };
  return (
    <>
      <Input
        scale={1.5}
        icon={<Youtube />}
        placeholder="URL de video en youtube ctrl+v"
        width="100%"
        onChange={(value) => {
          urlValue(value);
        }}
        disabled={btnLoading}
        clearable
      />
    </>
  );
};

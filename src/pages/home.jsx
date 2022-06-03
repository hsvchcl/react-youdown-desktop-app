import "../styles/style.css";
import { useEffect, useState } from "react";
import { Page, useToasts, Toggle, Spacer } from "@geist-ui/core";
import { Settings } from "@geist-ui/icons";
import { get, isEmpty } from "lodash";

import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { ModalMessage } from "../components/ModalMessage/ModalMessage";
import { ModalConfig } from "../components/ModalConfig/ModalConfig";
import { ModalInfo } from "../components/ModalInfo/ModalInfo";
import { ModalDownloadMessage } from "../components/ModalDownloadComplete/DownloadComplete";
import { VideoCardInfo } from "../components/VideoCardInfo/VideoCardInfo";
import { validateUrl, clearURL } from "../utils/index";
import { downloadVideo, checkAPIStatus, getConfiguration } from "../api/api";
import Logo from "../assets/logo_svg.svg";
import LogoLigth from "../assets/logo_ligth.svg";

export const Home = ({ switchThemes, themeType }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [openCloseModalConfig, setOpenCloseModalConfig] = useState(false);
  const [openCloseModalInfo, setOpenCloseModalInfo] = useState(false);
  const [openCloseModalDownloadMessage, setOpenCloseModalDownloadMessage] =
    useState(false);
  const [openAnimation, setOpenAnimation] = useState(false);
  const [config, setConfig] = useState({});
  const [downloadInfo, setDownloadInfo] = useState({});
  const [videoInfo, setVideoInfo] = useState({});
  const [visibleCard, setVisibleCard] = useState(false);
  const [logoSet, setLogo] = useState(Logo);

  const { setToast } = useToasts({ placement: "topRight" });

  useEffect(() => {
    if (openCloseModal === false) {
      getConfiguration().then((result) => {
        const ffmpegPath = get(result, "config.path_downloads", null);
        const downloadFilePath = get(result, "config.path_ffmpeg", null);
        if (!ffmpegPath && !downloadFilePath) {
          setOpenCloseModalConfig(true);
        } else {
          setConfig(result.config);
        }
      });
    } else {
      setOpenCloseModalConfig(false);
    }
  }, [openCloseModal]);

  useEffect(() => {
    if (!isEmpty(videoInfo)) {
      console.log(videoInfo);
    }
  }, [videoInfo]);

  useEffect(() => {
    if (btnLoading) {
      setToast({
        text: "Descargando Archivo",
        delay: 5000,
        type: "warning",
      });
    }
  }, [btnLoading]);

  useEffect(() => {
    console.log(themeType);
    if (themeType === "light") {
      setLogo(LogoLigth);
    } else {
      setLogo(Logo);
    }
  }, [themeType]);

  const downloadVideoByUrl = async ({ urlVideo, typeDownload = "video" }) => {
    setBtnLoading(true);
    const isValidUrl = validateUrl(urlVideo);
    if (isValidUrl) {
      const urlClean = clearURL(urlVideo);
      const queryObject = {
        videoList: [urlClean],
        type: typeDownload,
      };

      const downloadProccess = await downloadVideo(JSON.stringify(queryObject));
      setBtnLoading(false);
      setDownloadInfo(downloadProccess);
      setOpenCloseModalDownloadMessage(true);
    } else {
      setBtnLoading(false);
      setToast({
        text: "Por favor ingrese una URL válida",
        delay: 3000,
        type: "error",
      });
    }
  };

  const checkStatus = async () => {
    checkAPIStatus().then((response) => {
      const { status } = response;
      if (!status) {
        setOpenCloseModal(true);
      } else {
        setOpenCloseModal(false);
      }
    });
  };

  return (
    <Page
      height="100vh"
      dotBackdrop={true}
      dotSize="1px"
      dotSpace={0.2}
      width={50}
      onMouseEnter={() => {
        checkStatus();
      }}
    >
      {!isEmpty(videoInfo) && visibleCard && (
        <VideoCardInfo
          videoInfo={videoInfo}
          openAnimation={openAnimation}
          setOpenAnimation={setOpenAnimation}
          setVisibleCard={setVisibleCard}
          setVideoInfo={setVideoInfo}
          downloadVideoByUrl={downloadVideoByUrl}
          btnLoading={btnLoading}
        />
      )}
      <ModalMessage
        open={openCloseModal}
        setOpenCloseModal={setOpenCloseModal}
      />
      <ModalInfo
        open={openCloseModalInfo}
        setOpenCloseModalInfo={setOpenCloseModalInfo}
      />
      {/* Config Modal */}
      <ModalConfig
        open={openCloseModalConfig}
        config={config}
        setOpenCloseModalConfig={setOpenCloseModalConfig}
        setConfig={setConfig}
      />
      <ModalDownloadMessage
        open={openCloseModalDownloadMessage}
        setOpenCloseModalDownloadMessage={setOpenCloseModalDownloadMessage}
        downloadInfo={downloadInfo}
      />
      <Spacer h={2}></Spacer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img
          src={logoSet}
          height="150px"
          alt=""
          className={!isEmpty(videoInfo) ? "rotate_logo" : "rotate_logo_normal"}
        />
      </div>
      <Spacer h={3}></Spacer>
      <Section>
        <InputVideoUrl
          downloadVideo={downloadVideoByUrl}
          btnLoading={btnLoading}
          setVideoInfo={setVideoInfo}
          setOpenAnimation={setOpenAnimation}
          setVisibleCard={setVisibleCard}
          videoInfo={videoInfo}
        />
      </Section>
      <Page.Footer
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "end",
          alignItems: "end",
          gap: 20,
        }}
      >
        <Spacer w={"100%"} />
        <span style={{cursor:'pointer'}}>
        <Settings onClick={() => setOpenCloseModalConfig(true)} />
        </span>
        <Toggle
          type="secondary"
          initialChecked={false}
          onChange={switchThemes}
          className="claseCheck"
        />
      </Page.Footer>
    </Page>
  );
};

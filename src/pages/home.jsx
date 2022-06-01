import "../styles/style.css";
import { useEffect, useState } from "react";
import {
  Page,
  Tabs,
  useToasts,
  Toggle,
  Button,
  Grid,
  Spacer,
} from "@geist-ui/core";
import { Twitch, Twitter, Menu } from "@geist-ui/icons";
import { get, isEmpty } from "lodash";

import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { ModalMessage } from "../components/ModalMessage/ModalMessage";
import { ModalConfig } from "../components/ModalConfig/ModalConfig";
import { ModalInfo } from "../components/ModalInfo/ModalInfo";
import { ModalDownloadMessage } from "../components/ModalDownloadComplete/DownloadComplete";
import { DrawerLateral } from "../components/DrawerLateralMenu/DrawerLateral";
import { VideoCardInfo } from "../components/VideoCardInfo/VideoCardInfo";
import { validateUrl, clearURL } from "../utils/index";
import { downloadVideo, checkAPIStatus, getConfiguration } from "../api/api";
import Logo from "../assets/logo_svg.svg";
import LogoLigth from '../assets/logo_ligth.svg';

export const Home = ({ switchThemes, themeType }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [tabSel, setTabSel] = useState("audioonly");
  const [btnLoading, setBtnLoading] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [openCloseModalConfig, setOpenCloseModalConfig] = useState(false);
  const [openCloseModalInfo, setOpenCloseModalInfo] = useState(false);
  const [openCloseModalDownloadMessage, setOpenCloseModalDownloadMessage] =
    useState(false);
  const [openAnimation, setOpenAnimation] = useState(false);
  const [config, setConfig] = useState({});
  const [stateDrawer, setDrawerState] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState({});
  const [videoInfo, setVideoInfo] = useState({});
  const [visibleCard, setVisibleCard] = useState(false);
  const [logoSet, setLogo] = useState(Logo);

  const { setToast } = useToasts({ placement: "bottomLeft" });

  useEffect(() => {
    let executed = false;
    setMenuItems([
      {
        title: "Audio",
        icon: Twitch,
        value: 1,
        description: "Descarga solo el audio de un video en formato mp3",
        type: "audioonly",
      },
      {
        title: "Video",
        icon: Twitter,
        value: 2,
        description: "Descarga video y audio",
        type: "audioandvideo",
      },
    ]);
    //CheckAPIStatus
    async function checkStatus() {
      checkAPIStatus().then((response) => {
        const { status } = response;
        if (!status) {
          setOpenCloseModal(true);
        } else {
          setOpenCloseModal(false);
          if (!executed) {
            setToast({
              text: `👍🏻  En línea`,
              delay: 2000,
              type: "success",
            });
          }
          executed = true;
        }
      });
    }

    //Check api status
    checkStatus();
    setInterval(function () {
      checkStatus();
    }, 5000);

    // Check config
  }, []);

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
    if (themeType === 'light') {
      setLogo(LogoLigth);
    }else{
      setLogo(Logo);
    }
  }, [themeType]);

  const downloadVideoByUrl = async (urlVideo) => {
    setBtnLoading(true);
    const isValidUrl = validateUrl(urlVideo);
    if (isValidUrl) {
      const urlClean = clearURL(urlVideo);
      const queryObject = {
        videoList: [urlClean],
        type: tabSel,
        path: "Downloads",
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

  return (
    <Page
      height="100vh"
      dotBackdrop={true}
      dotSize="0.8px"
      dotSpace={0.6}
      width={50}
    >
      {!isEmpty(videoInfo) && visibleCard && (
        <VideoCardInfo
          videoInfo={videoInfo}
          openAnimation={openAnimation}
          setOpenAnimation={setOpenAnimation}
          setVisibleCard={setVisibleCard}
          setVideoInfo={setVideoInfo}
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
      {/* Menu */}
      <DrawerLateral
        setDrawerState={setDrawerState}
        setOpenCloseModalConfig={setOpenCloseModalConfig}
        setOpenCloseModalInfo={setOpenCloseModalInfo}
        stateDrawer={stateDrawer}
      />
      <Spacer h={10}></Spacer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img src={logoSet} height="150px" alt="" className={!isEmpty(videoInfo) ? 'rotate_logo':'rotate_logo_normal'} />
      </div>
      <Spacer h={3}></Spacer>
      <Section>
        <InputVideoUrl
          downloadVideo={downloadVideoByUrl}
          btnLoading={btnLoading}
          setVideoInfo={setVideoInfo}
          setOpenAnimation={setOpenAnimation}
          setVisibleCard={setVisibleCard}
        />
      </Section>
      <Page.Footer style={{ textAlign: "right", marginBottom: "30px" }}>
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

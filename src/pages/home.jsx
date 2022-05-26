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
  Drawer,
  Divider,
} from "@geist-ui/core";
import { Twitch, Twitter, Settings, Menu, Info } from "@geist-ui/icons";
import { get } from "lodash";
import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { validateUrl, clearURL } from "../utils/index";
import { ModalMessage } from "../components/ModalMessage/ModalMessage";
import { ModalConfig } from "../components/ModalConfig/ModalConfig";
import { ModalInfo } from "../components/ModalInfo/ModalInfo";
import { ModalDownloadMessage } from "../components/ModalDownloadComplete/DownloadComplete";
import { downloadVideo, checkAPIStatus, getConfiguration } from "../api/api";
import Logo from "../assets/logo_svg.svg";

export const Home = ({ switchThemes }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [tabSel, setTabSel] = useState("audioonly");
  const [btnLoading, setBtnLoading] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [openCloseModalConfig, setOpenCloseModalConfig] = useState(false);
  const [openCloseModalInfo, setOpenCloseModalInfo] = useState(false);
  const [openCloseModalDownloadMessage, setOpenCloseModalDownloadMessage] =
    useState(false);
  const [config, setConfig] = useState({});
  const [stateDrawer, setDrawerState] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState({});

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
    }, 30000);

    // Check config
    getConfiguration().then((result) => {
      console.log(result);
      const ffmpegPath = get(result, "config.path_downloads", null);
      const downloadFilePath = get(result, "config.path_ffmpeg", null);
      if (!ffmpegPath && !downloadFilePath) {
        setOpenCloseModalConfig(true);
      } else {
        setConfig(result.config);
      }
    });
  }, []);

  useEffect(() => {
    if (btnLoading) {
      setToast({
        text: "Descargando Archivo",
        delay: 5000,
        type: "warning",
      });
    }
  }, [btnLoading]);

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
      <ModalMessage
        open={openCloseModal}
        setOpenCloseModal={setOpenCloseModal}
      />
      <ModalInfo
        open={openCloseModalInfo}
        setOpenCloseModalInfo={setOpenCloseModalInfo}
      />
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
      <Grid.Container gap={2}>
        <Grid md={12} justify="left">
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <img src={Logo} height="40px" alt="" />
            <span style={{ fontSize: "30px", fontWeight: 700 }}>YouDown</span>
          </div>
        </Grid>
        <Grid md={12} justify="right">
          <Spacer w={"100%"} />
          <Button
            icon={<Menu />}
            auto
            onClick={() => setDrawerState(true)}
            scale={1}
          />
        </Grid>
      </Grid.Container>
      <Spacer h={6} />
      <Tab initialOpenTab={"audioonly"} setTabSel={setTabSel}>
        {menuItems.map((menuItem) => (
          <Tabs.Item
            key={Math.random()}
            label={menuItem.title}
            value={menuItem.type}
          >
            <DownloadSection>
              <Section>
                <h2>{menuItem.title}</h2>
                <p>{menuItem.description}</p>
                <InputVideoUrl
                  downloadVideo={downloadVideoByUrl}
                  btnLoading={btnLoading}
                />
              </Section>
            </DownloadSection>
          </Tabs.Item>
        ))}
      </Tab>
      <Page.Footer style={{ textAlign: "right", marginBottom: "30px" }}>
        <Toggle
          type="secondary"
          initialChecked={false}
          onChange={switchThemes}
          className="claseCheck"
        />
      </Page.Footer>
      <Drawer
        visible={stateDrawer}
        onClose={() => setDrawerState(false)}
        placement="right"
        width={18}
      >
        {/* <Drawer.Title>YouDown</Drawer.Title> */}
        <Drawer.Subtitle>Opciones</Drawer.Subtitle>
        <Drawer.Content style={{ padding: "40px" }}>
          <div className="drawer__menus home__h3_menu_style">
            <Settings />
            <h3
              onClick={() => {
                setOpenCloseModalConfig(true);
                setDrawerState(false);
              }}
            >
              Configuración
            </h3>
          </div>

          <Divider></Divider>
          <div className="drawer__menus home__h3_menu_style">
            <Info />
            <h3
              onClick={() => {
                setOpenCloseModalInfo(true);
                setDrawerState(false);
              }}
            >
              Información
            </h3>
          </div>
        </Drawer.Content>
      </Drawer>
    </Page>
  );
};

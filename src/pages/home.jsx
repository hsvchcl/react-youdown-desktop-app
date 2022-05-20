import "../styles/style.css";
import { useEffect, useState } from "react";
import {
  Page,
  Text,
  Tabs,
  useToasts,
  Toggle,
  Dot,
  Image,
  Grid,
  Button,
  Spacer,
} from "@geist-ui/core";
import { Twitch, Twitter, Settings } from "@geist-ui/icons";
import { get } from "lodash";
import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { validateUrl, clearURL } from "../utils/index";
import { ModalMessage } from "../components/ModalMessage/ModalMessage";
import { ModalConfig } from "../components/ModalConfig/ModalConfig";
import { downloadVideo, checkAPIStatus, getConfiguration } from "../api/api";
import Logo from "../assets/logo_svg.svg";

export const Home = ({ switchThemes }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [tabSel, setTabSel] = useState("audioonly");
  const [btnLoading, setBtnLoading] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [openCloseModalConfig, setOpenCloseModalConfig] = useState(false);
  const [config, setConfig] = useState({});
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
      setToast({
        text: downloadProccess.message,
        delay: 5000,
        type: downloadProccess.status ? "success" : "error",
      });
    } else {
      setToast({
        text: "Debe ingresar una URL válida",
        delay: 2000,
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
      <ModalMessage open={openCloseModal} />
      <ModalConfig
        open={openCloseModalConfig}
        config={config}
        setOpenCloseModalConfig={setOpenCloseModalConfig}
        setConfig={setConfig}
      />
      <Grid.Container gap={2}>
        <Grid md={12} justify="left">
          <Toggle
            type="secondary"
            initialChecked={false}
            onChange={switchThemes}
            className="claseCheck"
          />
        </Grid>
        <Grid md={12} justify="right">
          <Spacer w={"100%"} />
          <Button
            iconRight={<Settings />}
            auto
            scale={2 / 3}
            px={0.6}
            type="secondary"
            onClick={() => setOpenCloseModalConfig(true)}
          />
        </Grid>
      </Grid.Container>

      <Text style={{ textAlign: "center" }} h1>
        <Image width="128px" height="128px" src={Logo} /> YouDown!
      </Text>
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
      <Page.Footer style={{ textAlign: "right", marginBottom: "20px" }}>
        <Dot
          type="error"
          style={{ fontWeight: "bold" }}
          className="home__dot_capitalize"
        >
          https://github.com/hsvchcl
        </Dot>
      </Page.Footer>
    </Page>
  );
};

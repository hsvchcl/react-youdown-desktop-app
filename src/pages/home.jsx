import "./style.css";
import { Page, Text, Tabs, useToasts, Toggle, Dot } from "@geist-ui/core";
import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { Twitch, Twitter } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import { validateUrl, clearURL } from "../utils/index";
import { ModalMessage } from "../components/ModalMessage/ModalMessage";
import { downloadVideo, checkAPIStatus } from "../api/api";
export const Home = ({ switchThemes }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [tabSel, setTabSel] = useState("audioonly");
  const [btnLoading, setBtnLoading] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
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
              type: "success"
            });
          }
          executed = true;
        }
      });
    }
    checkStatus();
    setInterval(function () {
      checkStatus();
    }, 30000);
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
    const isValidUrl = validateUrl(urlVideo);
    if (isValidUrl) {
      const urlClean = clearURL(urlVideo);
      const queryObject = {
        videoList: [urlClean],
        type: tabSel,
        path: "Downloads",
      };
      setBtnLoading(true);
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
      dotSize="1px"
      dotSpace={0.6}
      width={50}
    >
      <ModalMessage open={openCloseModal} />
      <Toggle
        type="secondary"
        initialChecked={false}
        onChange={switchThemes}
        className="claseCheck"
      />
      <Text style={{ textAlign: "center" }} h1>
        YouDown
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
        <Dot type="error" style={{ fontWeight: "bold" }}>
          hsvchcl Github
        </Dot>
      </Page.Footer>
    </Page>
  );
};

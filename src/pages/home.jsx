import { Page, Text, Tabs, useToasts } from "@geist-ui/core";
import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { Twitch, Twitter } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import { validateUrl } from "../utils/index";
export const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { setToast } = useToasts();
  useEffect(() => {
    setMenuItems([
      {
        title: "Solo Audio",
        icon: Twitch,
        value: 1,
        description: "Descarga solo el audio de un video en formato mp3.",
      },
      {
        title: "Video",
        icon: Twitter,
        value: 2,
        description: "Descarga el video completo.",
      },
    ]);
  }, []);

  const downloadVideoByUrl = async (status) => {
    const isValidUrl = validateUrl(status);
    if (isValidUrl) {
      // const downloadProccess = await downloadVideos(status, "audioonly");
      // console.log(downloadProccess);
      console.log(status);
    } else {
      setToast({
        text: "Debe ingresar una URL válida",
        delay: 2000,
        type: "error",
      });
    }
  };

  return (
    <Page>
      <Text style={{ textAlign: "center" }} h1>
        YouDown
      </Text>
      <Tab initialOpenTab={1}>
        {menuItems.map((menuItem) => (
          <Tabs.Item
            key={Math.random()}
            label={menuItem.title}
            value={menuItem.value}
          >
            <DownloadSection>
              <Section>
                <h2>{menuItem.title}</h2>
                <p>{menuItem.description}</p>
                <InputVideoUrl downloadVideo={downloadVideoByUrl} />
              </Section>
            </DownloadSection>
          </Tabs.Item>
        ))}
      </Tab>
    </Page>
  );
};

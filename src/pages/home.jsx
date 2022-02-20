import { Page, Text, Tabs } from "@geist-ui/core";
import { Tab } from "../components/tab";
import { DownloadSection } from "../components/downloadSection";
import { Section } from "../components/section";
import { InputVideoUrl } from "../components/inputVideoUrl";
import { Twitch, Twitter } from "@geist-ui/icons";
import { useEffect, useState } from "react";
export const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    setMenuItems([
      {
        title: "Audio",
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

  return (
    <Page>
      <Text style={{ textAlign: "center" }} h1>
        YoutubeDown
      </Text>
      <Tab>
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
                <InputVideoUrl />
              </Section>
            </DownloadSection>
          </Tabs.Item>
        ))}
      </Tab>
    </Page>
  );
};

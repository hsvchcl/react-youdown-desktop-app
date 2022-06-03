import { Spacer, Card, Text, Badge, ButtonGroup, Button } from "@geist-ui/core";
import { XCircleFill, Music, Video } from "@geist-ui/icons";
export const VideoCardInfo = ({
  videoInfo,
  openAnimation,
  setOpenAnimation,
  setVisibleCard,
  setVideoInfo,
  downloadVideoByUrl,
  btnLoading,
}) => {
  return (
    <div className={"video_card_info__card"}>
      <Card
        shadow
        hoverable
        className={openAnimation ? "scale-up-top" : "scale-down-top"}
      >
        <Card.Content
          style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}
          className="home__card_video_info"
        >
          <img src={videoInfo.thumbail.url} alt="image" />
          <div style={{ marginTop: 10, width: "100%" }}>
            <div style={{ textAlign: "end" }}>
              <span style={{ cursor: "pointer" }}>
                <XCircleFill
                  onClick={() => {
                    if (!btnLoading) {
                      setOpenAnimation(false);
                      setTimeout(() => {
                        setVisibleCard(false);
                        setVideoInfo({});
                      }, 500);
                    }
                  }}
                />
              </span>
            </div>
            <Spacer h={1}></Spacer>
            <Badge scale={0.9} marginBottom={0.5} type="secondary">
              {videoInfo.author.name}
            </Badge>
            <Text h5 my={0} className="video_card_info__video_title">
              {videoInfo.title}
            </Text>
            <Spacer h={1} />
            <ButtonGroup scale={1 / 3}>
              <Button
                loading={btnLoading}
                icon={<Music />}
                scale={1 / 3}
                onClick={() => {
                  const urlVideo = videoInfo.video_url;
                  const typeDownload = "audioonly";
                  downloadVideoByUrl({ urlVideo, typeDownload });
                }}
              >
                Descargar Audio
              </Button>
              <Button
                icon={<Video />}
                onClick={() => {
                  const urlVideo = videoInfo.video_url;
                  const typeDownload = "audioandvideo";
                  downloadVideoByUrl({ urlVideo, typeDownload });
                }}
                scale={1 / 3}
                loading={btnLoading}
              >
                Descargar Video
              </Button>
            </ButtonGroup>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

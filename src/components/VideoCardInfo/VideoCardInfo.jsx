import { Spacer, Card, Text, Image, Badge } from "@geist-ui/core";
import { XCircleFill } from "@geist-ui/icons";
export const VideoCardInfo = ({
  videoInfo,
  openAnimation,
  setOpenAnimation,
  setVisibleCard,
  setVideoInfo
}) => {
  return (
    <div
      style={{
        width: 350,
        position: "absolute",
        bottom: 20,
        right: -30,
        zIndex: 1000,
      }}
      className={openAnimation ? "scale-up-bottom" : "scale-down-bottom"}
    >
      <Card shadow hoverable>
        <Card.Content style={{ textAlign: "end", paddingBottom: 0 }}>
          <span style={{ cursor: "pointer" }}>
            <XCircleFill
              onClick={() => {
                setOpenAnimation(false);
                setTimeout(() => {
                  setVisibleCard(false);
                  setVideoInfo({})
                }, 500);
              }}
            />
          </span>
        </Card.Content>
        <Card.Content style={{ paddingTop: 0 }}>
          <Image
            draggable={false}
            src={videoInfo.thumbail.url}
          />
          <div>
            <Text h5 my={0}>
              {videoInfo.title}
            </Text>
            <Badge type="warning">{videoInfo.author.name}</Badge>{" "}
            <Spacer h={0.5} />
            {/* <Text>
                Introduced in HTTP/1.0, HTTP headers make this protocol easy to
                extend
              </Text> */}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

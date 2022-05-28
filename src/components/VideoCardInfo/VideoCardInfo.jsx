import { Spacer, Card, Text, Image, Badge } from "@geist-ui/core";

export const VideoCardInfo = (videoInfo) => {
  return (
    <div style={{ position: "absolute", bottom: 20, zIndex: 1000 }}>
      <Card shadow hoverable className="home__card_video_info">
        <Image
          className="home__card_video_info_image"
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
      </Card>
    </div>
  );
};

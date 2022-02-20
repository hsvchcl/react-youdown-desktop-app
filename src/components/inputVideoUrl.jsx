import { Youtube } from "@geist-ui/icons";
import { Input, Button, Spacer } from "@geist-ui/core";
export const InputVideoUrl = () => {
  return (
    <>
      <Input
        scale={4 / 3}
        icon={<Youtube />}
        placeholder="Youtube video URL"
        width="100%"
      />
      <Spacer h={2} />
      <Button auto type="secondary">
        Descargar
      </Button>
    </>
  );
};

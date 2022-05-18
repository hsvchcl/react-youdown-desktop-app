import { Modal, Button, Input, Spacer } from "@geist-ui/core";
import { Save } from "@geist-ui/icons";
export const ModalConfig = ({ open }) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      <Modal.Title>Configuración</Modal.Title>
      {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
      <Modal.Content style={{ textAlign: "left" }}>
        <p>
          Para poder utilizar esta aplicacion se require configurar las
          siguientes variables:
        </p>
        <Spacer h={1} />
        <Input placeholder="/opt/homebrew/Cellar/ffmpeg/5.0.1/bin/ffmpeg" width="100%">
          Path de instalación Ffmpeg
        </Input>
        <Spacer h={1} />
        <Input placeholder="/Users/hnsvchcl/Downloads" width="100%" >
          Path para almacenar las descargas
        </Input>
        <Spacer h={2} />
        <Button
          icon={<Save />}
          shadow
          onClick={() => document.location.reload(true)}
          type="secondary"
        >
          Guardar
        </Button>
      </Modal.Content>
    </Modal>
  );
};

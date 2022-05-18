import { Modal, Button } from "@geist-ui/core";
import { RefreshCw } from "@geist-ui/icons";
export const ModalMessage = ({ open }) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      <Modal.Title>ouuutch!</Modal.Title>
      {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
      <Modal.Content style={{ textAlign: "center" }}>
        <p>No tiene conexión a la API 🤓</p>
        <Button
          icon={<RefreshCw />}
          shadow
          onClick={() => document.location.reload(true)}
          type="secondary"
        >
          Recargar
        </Button>
      </Modal.Content>
    </Modal>
  );
};

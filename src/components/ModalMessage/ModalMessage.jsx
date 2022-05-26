import { Modal, Button } from "@geist-ui/core";
import { RefreshCw } from "@geist-ui/icons";
export const ModalMessage = ({ open }, setOpenCloseModal) => {
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
          onClick={() => window.location.reload()}
          type="secondary"
        >
          Recargar
        </Button>
      </Modal.Content>
    </Modal>
  );
};

import { Modal, Spacer } from "@geist-ui/core";
import { Download, RefreshCw } from "@geist-ui/icons";
const shell = window.require("electron").shell;
export const ModalMessage = ({ open }, setOpenCloseModal) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      <Modal.Title>😱 ouuutch!</Modal.Title>
      {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
      <Modal.Content style={{ textAlign: "center" }}>
        <p>No tenemos conexión con la API</p>
      </Modal.Content>
      <Modal.Action onClick={() => window.location.reload()}>
        {" "}
        <RefreshCw />
        <Spacer w={1} />
        Recargar
      </Modal.Action>
      <Modal.Action
        onClick={() =>
          shell.openExternal(
            "https://github.com/hsvchcl/node-youdown-desktop-api"
          )
        }
      >
        {" "}
        <Download />
        <Spacer w={1} />
        Descargar
      </Modal.Action>
    </Modal>
  );
};

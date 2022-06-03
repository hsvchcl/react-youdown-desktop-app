import { Modal, Spacer, Image, Tag, Tooltip } from "@geist-ui/core";
import { X, Folder } from "@geist-ui/icons";
import SuccessSvg from "../../assets/sucess.svg";
import ErrorSvg from "../../assets/error.svg";
var shell = window.require("electron").shell;

export const ModalDownloadMessage = ({
  open,
  setOpenCloseModalDownloadMessage,
  downloadInfo,
}) => {
  return (
    <>
      {downloadInfo.status === true && (
        <Modal
          visible={open}
          disableBackdropClick
          backdropClassName="modal__blured"
        >
          <Modal.Content style={{ textAlign: "center" }}>
            <Image src={SuccessSvg} width={4}></Image>
            <Spacer h={3} />
            <h4>Descarga Finalizada</h4>
            <p>Archivo guardado correctamente en:</p>
            <Tag
              type="lite"
              style={{ cursor: "pointer", fontWeight:700 }}
              onClick={() => {
                shell.showItemInFolder(downloadInfo.path_download);
              }}
            >
              <Tooltip text={"Abrir directorio"}>
              {downloadInfo.path_download}
              </Tooltip>
            </Tag>
            <Spacer h={2} />
          </Modal.Content>
          <Modal.Action onClick={() => setOpenCloseModalDownloadMessage(false)}>
            <X />
            <Spacer w={0.5} />
            Cerrar
          </Modal.Action>
        </Modal>
      )}
      {downloadInfo.status === false && (
        <Modal
          visible={open}
          disableBackdropClick
          backdropClassName="modal__blured"
        >
          <Modal.Content style={{ textAlign: "center" }}>
            <Image src={ErrorSvg} width={4}></Image>
            <Spacer h={3} />
            <h4>Ocurrió un error</h4>
            <p>No se pudo completar la descarga 😩</p>
          </Modal.Content>
          <Modal.Action
            passive
            onClick={() => setOpenCloseModalDownloadMessage(false)}
          >
            <X />
            <Spacer w={0.5} />
            Cerrar
          </Modal.Action>
        </Modal>
      )}
    </>
  );
};

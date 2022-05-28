import { useEffect, useState } from "react";
import { Modal, Input, Spacer, useToasts, Card, Button } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import { saveConfiguration } from "../../api/api";
var shell = window.require("electron").shell;

export const ModalConfig = ({
  open,
  config,
  setOpenCloseModalConfig,
  setConfig,
}) => {
  const [form, setForm] = useState({ path_ffmpeg: "", path_downloads: "" });
  const [formInvalid, setFormInvalid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setToast } = useToasts({ placement: "bottomLeft" });

  useEffect(() => {
    const isValidPathFfmpeg = validatePathFormat(form.path_ffmpeg);
    const isValidPathDownloads = validatePathFormat(form.path_downloads);

    if (isValidPathFfmpeg && isValidPathDownloads) {
      setFormInvalid(false);
    } else {
      setFormInvalid(true);
    }
  }, [form]);

  const validatePathFormat = (path) => {
    return /((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)/i.test(path);
  };

  const saveConfig = (form) => {
    setLoading(true);
    saveConfiguration(form).then((result) => {
      if (result.status) {
        setLoading(false);
        setToast({
          text: result.message,
          delay: 2000,
          type: "success",
        });
        setConfig(form);
        setTimeout(() => {
          setOpenCloseModalConfig(false);
        }, 2000);
      }
    });
  };

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
          Para poder utilizar esta aplicacion se require configurar variables de
          entorno
        </p>
        <Spacer h={1} />
        <Input
          placeholder="/opt/homebrew/Cellar/ffmpeg/5.0.1/bin/ffmpeg"
          width="100%"
          initialValue={config?.path_ffmpeg}
          onChange={(value) =>
            setForm({ ...form, path_ffmpeg: value.target.value })
          }
        >
          Ruta de librería Ffmpeg
        </Input>
        <Spacer h={1} />
        <Input
          placeholder="/Users/hnsvchcl/Downloads"
          width="100%"
          initialValue={config?.path_downloads}
          onChange={(value) =>
            setForm({ ...form, path_downloads: value.target.value })
          }
        >
          Ruta donde almacenará las descargas
        </Input>
        <Spacer h={2} />
        <Card hoverable>
          <div className="modal_config__card_info">
            <p>Revisa el manual en:</p>
            <Button
              type="secondary"
              icon={<Github />}
              ghost
              auto
              scale={0.7}
              onClick={() => {
                shell.openExternal(
                  "https://github.com/hsvchcl/react-youdown-desktop-app"
                );
              }}
            >
              GitHub
            </Button>
          </div>
        </Card>
      </Modal.Content>
      <Modal.Action
        disabled={formInvalid}
        passive
        onClick={() => setOpenCloseModalConfig(false)}
      >
        Cerrar
      </Modal.Action>
      <Modal.Action
        disabled={formInvalid}
        loading={loading}
        onClick={() => saveConfig(form)}
      >
        Guardar
      </Modal.Action>
    </Modal>
  );
};

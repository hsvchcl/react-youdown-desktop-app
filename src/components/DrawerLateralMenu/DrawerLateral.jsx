import { Drawer, Divider } from "@geist-ui/core";
import { Settings, Info } from "@geist-ui/icons";
export const DrawerLateral = ({
  stateDrawer,
  setDrawerState,
  setOpenCloseModalConfig,
  setOpenCloseModalInfo,
}) => {
  return (
    <Drawer
      visible={stateDrawer}
      onClose={() => setDrawerState(false)}
      placement="right"
      width={20}
      height={20}
      className="drawer__style"
    >
      {/* <Drawer.Title>YouDown</Drawer.Title> */}
      <Drawer.Subtitle>Menu Principal</Drawer.Subtitle>
      <Drawer.Content style={{ padding: "40px" }}>
        <div className="drawer__menus drawer__h3_menu_style">
          <Settings />
          <h3
            onClick={() => {
              setOpenCloseModalConfig(true);
              setDrawerState(false);
            }}
          >
            Configuración
          </h3>
        </div>

        {/* <Divider></Divider> */}
        <div className="drawer__menus drawer__h3_menu_style">
          <Info />
          <h3
            onClick={() => {
              setOpenCloseModalInfo(true);
              setDrawerState(false);
            }}
          >
            Información
          </h3>
        </div>
      </Drawer.Content>
    </Drawer>
  );
};

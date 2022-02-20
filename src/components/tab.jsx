import { Tabs } from "@geist-ui/core";
export const Tab = (props) => {
  return (
    <Tabs initialValue="1" align="center" leftSpace={0}>
      {props.children}
    </Tabs>
  );
};

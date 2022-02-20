import { Tabs } from "@geist-ui/core";
export const Tab = ({ children, initialOpenTab }) => {
  return (
    <Tabs initialValue={initialOpenTab} align="center" leftSpace={0}>
      {children}
    </Tabs>
  );
};

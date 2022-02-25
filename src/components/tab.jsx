import { Tabs } from "@geist-ui/core";
export const Tab = ({ children, initialOpenTab, setTabSel }) => {
  return (
    <Tabs
      initialValue={initialOpenTab}
      align="center"
      width="100%"
      onChange={setTabSel}
    >
      {children}
    </Tabs>
  );
};

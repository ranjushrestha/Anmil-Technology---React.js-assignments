import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./components/Tabs";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Profile</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <h2>Home Content</h2>
            <p>Welcome to the home page!</p>
          </TabPanel>
          <TabPanel>
            <h2>Profile Content</h2>
            <p>View and edit your profile here.</p>
          </TabPanel>
          <TabPanel>
            <h2>Settings Content</h2>
            <p>Adjust your preferences in settings.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;

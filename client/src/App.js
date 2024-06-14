import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LogIn,
  Groups,
  Members,
  General,
  HomePage,
  Schedule,
  JoinGroup,
  NewMeeting,
} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/new-meeting" element={<NewMeeting />} />
        <Route path="/groups/:id/general" element={<General />} />
        <Route path="/groups/:id/members" element={<Members />} />
        <Route path="/groups/:id/schedule" element={<Schedule />} />
        <Route path="/invite/:groupToken" element={<JoinGroup />} />
      </Routes>
    </Router>
  );
}

export default App;

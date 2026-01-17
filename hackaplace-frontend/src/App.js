import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectRole from "./pages/SelectRole";

import ParticipantDashboardHome from "./pages/dashboard/participant/ParticipantHome";
import ParticipantProfile from "./pages/dashboard/participant/ParticipantProfile";
import ParticipantProjects from "./pages/dashboard/participant/ParticipantProjects";
import ProjectDetails from "./pages/dashboard/participant/ProjectDetails";
import ParticipantRegisteredEvents from "./pages/dashboard/participant/ParticipantRegisteredEvents";
import ParticipantBookmarks from "./pages/dashboard/participant/ParticipantBookmarks";
import ParticipantExternal from "./pages/dashboard/participant/ParticipantExternal";
import ParticipantInternalHackathons from "./pages/dashboard/participant/ParticipantInternalHackathons";
import InternalHackathonDetails from "./pages/dashboard/participant/InternalHackathonDetails";
import JoinEvent from "./pages/dashboard/participant/JoinEvent";
import ParticipantEventWorkspace from "./pages/dashboard/participant/ParticipantEventWorkspace";

import OrganizerDashboard from "./pages/dashboard/organizer/OrganizerDashboard";
import CreateHackathon from "./pages/dashboard/organizer/CreateHackathon";
import OrganizerHackathons from "./pages/dashboard/organizer/OrganizerHackathons";
import HackathonManage from "./pages/dashboard/organizer/HackathonManage";
import OrganizerAnnouncements from "./pages/dashboard/organizer/OrganizerAnnouncements";
import OrganizerProfile from "./pages/dashboard/organizer/OrganizerProfile";
import OrganizerParticipants from "./pages/dashboard/organizer/OrganizerParticipants";
import OrganizerTeamDetails from "./pages/dashboard/organizer/OrganizerTeamDetails";
import OrganizerSubmissions from "./pages/dashboard/organizer/OrganizerSubmissions";
import OrganizerSubmissionDetails from "./pages/dashboard/organizer/OrganizerSubmissionDetails";
import OrganizerEvaluations from "./pages/dashboard/organizer/OrganizerEvaluations";
import OrganizerHackathonEvaluations from "./pages/dashboard/organizer/OrganizerHackathonEvaluations";
import OrganizerEvaluationDetails from "./pages/dashboard/organizer/OrganizerEvaluationDetails";
import JudgeDashboard from "./pages/dashboard/judge/JudgeDashboard";
import JudgeAssignedHackathons from "./pages/dashboard/judge/JudgeAssignedHackathons";
import JudgeHackathonDetails from "./pages/dashboard/judge/JudgeHackathonDetails";
import JudgeEvaluations from "./pages/dashboard/judge/JudgeEvaluations";
import JudgeProjectEvaluation from "./pages/dashboard/judge/JudgeProjectEvaluation";
import JudgeCompletedEvaluations from "./pages/dashboard/judge/JudgeCompletedEvaluations";
import JudgeProfile from "./pages/dashboard/judge/JudgeProfile";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";

import Events from "./pages/Events";
import ExternalHackathons from "./pages/ExternalHackathons";
import Profile from "./pages/Profile";

function App() {
  return (
    <BookmarkProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-role" element={<SelectRole />} />
        
        {/* Role-based Dashboard Routes */}
        <Route path="/dashboard/participant" element={<ParticipantDashboardHome />} />
        <Route path="/dashboard/participant/profile" element={<ParticipantProfile />} />
        <Route path="/dashboard/participant/projects" element={<ParticipantProjects />} />
        <Route path="/dashboard/participant/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/dashboard/participant/registered-events" element={<ParticipantRegisteredEvents />} />
        <Route path="/dashboard/participant/event/:eventId" element={<ParticipantEventWorkspace />} />
        <Route path="/dashboard/participant/internal-hackathons" element={<ParticipantInternalHackathons />} />
        <Route path="/dashboard/participant/internal-hackathons/:hackathonId" element={<InternalHackathonDetails />} />
        <Route path="/dashboard/participant/internal-hackathons/:hackathonId/join" element={<JoinEvent />} />
        <Route path="/dashboard/participant/bookmarks" element={<ParticipantBookmarks />} />
        <Route path="/dashboard/participant/external" element={<ParticipantExternal />} />

        <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
        <Route path="/dashboard/organizer/create-hackathon" element={<CreateHackathon />} />
        <Route path="/dashboard/organizer/hackathons" element={<OrganizerHackathons />} />
        <Route path="/dashboard/organizer/hackathon/:hackathonId" element={<HackathonManage />} />
        <Route path="/dashboard/organizer/participants" element={<OrganizerParticipants />} />
        <Route path="/dashboard/organizer/participants/:hackathonId/team/:teamId" element={<OrganizerTeamDetails />} />
        <Route path="/dashboard/organizer/submissions" element={<OrganizerSubmissions />} />
        <Route path="/dashboard/organizer/submissions/:submissionId" element={<OrganizerSubmissionDetails />} />
        <Route path="/dashboard/organizer/evaluations" element={<OrganizerEvaluations />} />
        <Route path="/dashboard/organizer/evaluations/:hackathonId" element={<OrganizerHackathonEvaluations />} />
        <Route path="/dashboard/organizer/evaluations/:hackathonId/submission/:submissionId" element={<OrganizerEvaluationDetails />} />
        <Route path="/dashboard/organizer/announcements" element={<OrganizerAnnouncements />} />
        <Route path="/dashboard/organizer/profile" element={<OrganizerProfile />} />
        
        <Route path="/dashboard/judge" element={<JudgeDashboard />} />
        <Route path="/dashboard/judge/hackathons" element={<JudgeAssignedHackathons />} />
        <Route path="/dashboard/judge/hackathons/:hackathonId/details" element={<JudgeHackathonDetails />} />
        <Route path="/dashboard/judge/evaluations" element={<JudgeEvaluations />} />
        <Route path="/dashboard/judge/project/:submissionId" element={<JudgeProjectEvaluation />} />
        <Route path="/dashboard/judge/completed" element={<JudgeCompletedEvaluations />} />
        <Route path="/dashboard/judge/profile" element={<JudgeProfile />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* Fallback for base dashboard route */}
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />

        <Route path="/events" element={<Events />} />
        <Route path="/external-hackathons" element={<ExternalHackathons />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </BookmarkProvider>
  );
}

export default App;

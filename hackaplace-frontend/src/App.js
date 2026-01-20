import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Landing from "./pages/Landing";
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
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-role" element={<SelectRole />} />
        
        {/* Role-based Dashboard Routes */}
        <Route path="/dashboard/participant" element={<ProtectedRoute><ParticipantDashboardHome /></ProtectedRoute>} />
        <Route path="/dashboard/participant/profile" element={<ProtectedRoute><ParticipantProfile /></ProtectedRoute>} />
        <Route path="/dashboard/participant/projects" element={<ProtectedRoute><ParticipantProjects /></ProtectedRoute>} />
        <Route path="/dashboard/participant/projects/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/dashboard/participant/registered-events" element={<ProtectedRoute><ParticipantRegisteredEvents /></ProtectedRoute>} />
        <Route path="/dashboard/participant/event/:eventId" element={<ProtectedRoute><ParticipantEventWorkspace /></ProtectedRoute>} />
        <Route path="/dashboard/participant/internal-hackathons" element={<ProtectedRoute><ParticipantInternalHackathons /></ProtectedRoute>} />
        <Route path="/dashboard/participant/internal-hackathons/:hackathonId" element={<ProtectedRoute><InternalHackathonDetails /></ProtectedRoute>} />
        <Route path="/dashboard/participant/internal-hackathons/:hackathonId/join" element={<ProtectedRoute><JoinEvent /></ProtectedRoute>} />
        <Route path="/dashboard/participant/bookmarks" element={<ProtectedRoute><ParticipantBookmarks /></ProtectedRoute>} />
        <Route path="/dashboard/participant/external" element={<ProtectedRoute><ParticipantExternal /></ProtectedRoute>} />

        <Route path="/dashboard/organizer" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/create-hackathon" element={<ProtectedRoute><CreateHackathon /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/hackathons" element={<ProtectedRoute><OrganizerHackathons /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/hackathon/:hackathonId" element={<ProtectedRoute><HackathonManage /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/participants" element={<ProtectedRoute><OrganizerParticipants /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/participants/:hackathonId/team/:teamId" element={<ProtectedRoute><OrganizerTeamDetails /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/submissions" element={<ProtectedRoute><OrganizerSubmissions /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/submissions/:submissionId" element={<ProtectedRoute><OrganizerSubmissionDetails /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/evaluations" element={<ProtectedRoute><OrganizerEvaluations /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/evaluations/:hackathonId" element={<ProtectedRoute><OrganizerHackathonEvaluations /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/evaluations/:hackathonId/submission/:submissionId" element={<ProtectedRoute><OrganizerEvaluationDetails /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/announcements" element={<ProtectedRoute><OrganizerAnnouncements /></ProtectedRoute>} />
        <Route path="/dashboard/organizer/profile" element={<ProtectedRoute><OrganizerProfile /></ProtectedRoute>} />

        <Route path="/dashboard/judge" element={<ProtectedRoute><JudgeDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/judge/hackathons" element={<ProtectedRoute><JudgeAssignedHackathons /></ProtectedRoute>} />
        <Route path="/dashboard/judge/hackathons/:hackathonId/details" element={<ProtectedRoute><JudgeHackathonDetails /></ProtectedRoute>} />
        <Route path="/dashboard/judge/evaluations" element={<ProtectedRoute><JudgeEvaluations /></ProtectedRoute>} />
        <Route path="/dashboard/judge/project/:submissionId" element={<ProtectedRoute><JudgeProjectEvaluation /></ProtectedRoute>} />
        <Route path="/dashboard/judge/completed" element={<ProtectedRoute><JudgeCompletedEvaluations /></ProtectedRoute>} />
        <Route path="/dashboard/judge/profile" element={<ProtectedRoute><JudgeProfile /></ProtectedRoute>} />

        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        <Route path="/events" element={<Events />} />
        <Route path="/external-hackathons" element={<ExternalHackathons />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </BrowserRouter>
    </BookmarkProvider>
  );
}

export default App;

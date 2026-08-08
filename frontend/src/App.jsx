import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SemesterList from './pages/SemesterList';
import SubjectList from './pages/SubjectList';
import ContentView from './pages/ContentView';
import AiTutor from './pages/AiTutor';
import GpatPrep from './pages/GpatPrep';
import DrugInteraction from './pages/DrugInteraction';
import DailyChallenges from './pages/DailyChallenges';
import DiseaseMaps from './pages/DiseaseMaps';
import MedicineScanner from './pages/MedicineScanner';
import StudyPlanner from './pages/StudyPlanner';
import DrugGame from './pages/DrugGame';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-main font-sans">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/semesters" element={<SemesterList />} />
        <Route path="/semesters/:semesterId/subjects" element={<SubjectList />} />
        <Route path="/subjects/:subjectId/content" element={<ContentView />} />
        <Route path="/ai-tutor" element={<AiTutor />} />
        <Route path="/gpat" element={<GpatPrep />} />
        <Route path="/drug-interaction" element={<DrugInteraction />} />
        <Route path="/daily-challenges" element={<DailyChallenges />} />
        <Route path="/disease-maps" element={<DiseaseMaps />} />
        <Route path="/medicine-scanner" element={<MedicineScanner />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="/drug-game" element={<DrugGame />} />
      </Routes>
    </div>
  );
}

export default App;

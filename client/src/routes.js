
import IndexPage from './pages/index';
import ProtectedRoute from './components/router/ProtectedRoute';
import LoginPage from './pages/login';
import RegistrationPage from './pages/register';
import NurseOnlyRoute from './components/router/NurseOnlyRoute';
import PatientsPage from './pages/patients';
import TipsPage from './pages/tips';
import PatientOnlyRoute from './components/router/PatientOnlyRoute';
import EmergencyPage from './pages/emergency';
import GamesPage from './pages/games';
import VitalsPage from './pages/vitals';
import SymptomsPage from './pages/symptoms';
import NursesPage from './pages/nurses';

import { Navigate } from 'react-router-dom';

import RouteWithLoader from './components/router/RouteWithLoader';
import RouteWithSidebar from './components/router/RouteWithSidebar';

import {
    faBook,
    faBoxOpen,
    faChartPie,
    faFileAlt,
    faSignOutAlt,
    faTable,
    faInbox,
    faRocket,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import UnauthenticatedRoute from './components/router/UnauthenticatedRoute';
import MotivationalVideosPage from './pages/motivational_videos';


const routes = [
    {
        name: 'Root',
        path: '/api/',
        element: <Navigate to="/api/dashboard" />,
        icon: faBook,
        hiddenNurse: true,
        hiddenPatient: true
    },
    { 
        name: 'Dashboard',
        path: '/api/dashboard',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <IndexPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faChartPie,
        hiddenNurse: false,
        hiddenPatient: false
    },
    { 
        name: 'Emergency Alerts',
        path: '/api/emergencies/:patientId',
        element: (
            <RouteWithSidebar>
                <PatientOnlyRoute>
                    <EmergencyPage />
                </PatientOnlyRoute>
            </RouteWithSidebar>
        ),
        icon: faInbox,
        hiddenNurse: true,
        hiddenPatient: true
    },
    { 
        name: 'Emergency Alerts',
        path: '/api/emergencies',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <EmergencyPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faInbox,
        hiddenNurse: false,
        hiddenPatient: false
    },
    {
        name: 'Patients',
        path: '/api/patients',
        element: (
            <RouteWithSidebar>
                <NurseOnlyRoute>
                    <PatientsPage />
                </NurseOnlyRoute>
            </RouteWithSidebar>
        ),
        icon: faTable,
        hiddenNurse: false,
        hiddenPatient: true,
    },
    {
        name: 'Vitals',
        path: '/api/vitals/:patientId',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <VitalsPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faBoxOpen,
        hiddenNurse: true,
        hiddenPatient: true
    },
    {
        name: 'Vitals',
        path: '/api/vitals',
        element: (
            <RouteWithSidebar>
                <PatientOnlyRoute>
                    <VitalsPage />
                </PatientOnlyRoute>
            </RouteWithSidebar>
        ),
        icon: faBoxOpen,
        hiddenNurse: true,
        hiddenPatient: false
    },
    {
        name: 'Symptoms',
        path: '/api/symptoms/:patientId',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <SymptomsPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faFileAlt,
        hiddenNurse: true,
        hiddenPatient: true
    },
    {
        name: 'Symptoms',
        path: '/api/symptoms',
        element: (
            <RouteWithSidebar>
                <PatientOnlyRoute>
                    <SymptomsPage />
                </PatientOnlyRoute>
            </RouteWithSidebar>
        ),
        icon: faFileAlt,
        hiddenNurse: true,
        hiddenPatient: false
    },
    {
        name: 'Nurses',
        path: '/api/nurses',
        element: (
            <RouteWithSidebar>
                <PatientOnlyRoute>
                    <NursesPage />
                </PatientOnlyRoute>
            </RouteWithSidebar>
        ),
        icon: faTable,
        hiddenNurse: true,
        hiddenPatient: false
    },
    {
        name: 'Tips',
        path: '/api/tips',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <TipsPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faBook,
        hiddenNurse: false,
        hiddenPatient: false
    },
    {
        name: 'Motivational Videos',
        path: '/api/motivational_videos',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <MotivationalVideosPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faVideo,
        hiddenNurse: false,
        hiddenPatient: false
    },
    { 
        name: 'Games',
        path: '/api/games',
        element: (
            <RouteWithSidebar>
                <ProtectedRoute>
                    <GamesPage />
                </ProtectedRoute>
            </RouteWithSidebar>
        ),
        icon: faRocket,
        hiddenNurse: false,
        hiddenPatient: false
    },
    {
        name: 'Login',
        path: '/api/login',
        element: (
            <RouteWithLoader>
                <UnauthenticatedRoute>
                    <LoginPage />
                </UnauthenticatedRoute>
            </RouteWithLoader>
        ),
        icon: faSignOutAlt,
        hiddenNurse: true,
        hiddenPatient: true
    },
    {
        name: 'Register',
        path: '/api/register',
        element: (
            <RouteWithLoader>
                <UnauthenticatedRoute>
                    <RegistrationPage />
                </UnauthenticatedRoute>
            </RouteWithLoader>
        ),
        icon: faSignOutAlt,
        hiddenNurse: true,
        hiddenPatient: true
    },
  ];

export default routes;
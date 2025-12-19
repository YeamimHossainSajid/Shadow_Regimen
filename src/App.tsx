import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SystemBoot } from './components/SystemBoot';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger';
import { WorkoutPlanNavigator } from './components/WorkoutPlanNavigator';
import { ProgressChart } from './components/ProgressChart';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { Navigation } from './components/Navigation';
import { WorkoutList } from './components/fitness/WorkoutList';
import { LevelUpOverlay } from './components/LevelUpOverlay';
import { useHunterStore } from './store/hunterStore';
import { useNotificationStore } from './store/notificationStore';

function App() {
  const { hasBooted, hunter, initializeHunter, checkAndGeneratePenaltyQuests, levelUpFlag, clearLevelUpFlag, setHasBooted } = useHunterStore();
  const { addNotification } = useNotificationStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);

  // Wait for store hydration
  useEffect(() => {
    // Zustand persist is async, wait a bit for hydration
    const timer = setTimeout(() => {
      setIsHydrated(true);
      // Force boot if it's been persisted as false
      if (!hasBooted) {
        setTimeout(() => setHasBooted(true), 100);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hasBooted, setHasBooted]);

  // Force boot after 2 seconds max
  useEffect(() => {
    const forceBoot = setTimeout(() => {
      if (!hasBooted) {
        setHasBooted(true);
      }
    }, 2000);
    return () => clearTimeout(forceBoot);
  }, [hasBooted, setHasBooted]);

  useEffect(() => {
    if (hasBooted && !hunter && isHydrated) {
      initializeHunter();
    }
    if (hasBooted && hunter) {
      checkAndGeneratePenaltyQuests();
    }
  }, [hasBooted, hunter, initializeHunter, checkAndGeneratePenaltyQuests, isHydrated]);

  useEffect(() => {
    if (levelUpFlag && hunter) {
      setNewLevel(hunter.level);
      setShowLevelUp(true);
      addNotification(`LEVEL UP! You are now Level ${hunter.level}`, 'level-up');
      clearLevelUpFlag();
    }
  }, [levelUpFlag, hunter, addNotification, clearLevelUpFlag]);

  // Show something immediately while hydrating
  if (!isHydrated) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#00ffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: '18px',
      }}>
        <div style={{ textShadow: '0 0 10px #00ffff' }}>Initializing...</div>
      </div>
    );
  }

  if (!hasBooted) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        position: 'relative',
      }}>
        <SystemBoot />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {!hunter?.hasCompletedOnboarding ? (
        <div style={{
          width: '100vw',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          position: 'relative',
        }}>
          <Onboarding />
        </div>
      ) : (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          paddingBottom: '80px',
          position: 'relative',
        }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workout-logger" element={<WorkoutLogger />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/plans" element={<WorkoutPlanNavigator />} />
            <Route path="/progress" element={<ProgressChart />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Navigation />
          <Notifications />
          {showLevelUp && (
            <LevelUpOverlay
              newLevel={newLevel}
              onClose={() => setShowLevelUp(false)}
            />
          )}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;

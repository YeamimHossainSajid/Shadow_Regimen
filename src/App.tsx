import { useEffect } from 'react';
import { SystemBoot } from './components/SystemBoot';
import { useHunterStore } from './store/hunterStore';

function App() {
  const { hasBooted, hunter, initializeHunter } = useHunterStore();

  useEffect(() => {
    if (hasBooted && !hunter) {
      initializeHunter();
    }
  }, [hasBooted, hunter, initializeHunter]);

  return (
    <div className="min-h-screen bg-system-black text-white">
      <SystemBoot />
      
      {hasBooted && (
        <div className="p-8">
          <h1 className="font-orbitron text-4xl text-system-cyan mb-4">
            Shadow Regimen
          </h1>
          {hunter && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-black/30 backdrop-blur-sm border border-system-cyan/30 rounded-lg">
                <h2 className="font-rajdhani text-xl mb-2">Hunter Profile</h2>
                <p className="font-mono text-sm text-system-cyan/80">
                  ID: {hunter.id}
                </p>
                <p className="font-mono text-sm text-system-cyan/80">
                  Level: {hunter.level} | Rank: {hunter.rank}
                </p>
                <p className="font-mono text-sm text-system-cyan/80">
                  EXP: {hunter.exp} / {hunter.expToNextLevel}
                </p>
                <p className="font-mono text-sm text-system-cyan/80">
                  Streak: {hunter.streak} days
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


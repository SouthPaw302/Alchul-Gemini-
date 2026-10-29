import React, { useState } from 'react';
import { VirtualWorldCanvas, WorldEnvironmentType, CameraMode, TimeOfDay } from './VirtualWorldCanvas.tsx';
import { WorldHUD } from './WorldHUD.tsx';
import { WorldHotspot } from './sceneBuilder.ts';

interface VirtualWorldViewProps {
  onOpenCodexDoc?: (docPath: string) => void;
}

export const VirtualWorldView: React.FC<VirtualWorldViewProps> = ({ onOpenCodexDoc }) => {
  const [activeEnvironment, setActiveEnvironment] = useState<WorldEnvironmentType>('surface');
  const [cameraMode, setCameraMode] = useState<CameraMode>('scout');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('noon');
  const [selectedHotspot, setSelectedHotspot] = useState<WorldHotspot | null>(null);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-stone-950 overflow-hidden">
      <VirtualWorldCanvas
        onSelectHotspot={setSelectedHotspot}
        activeEnvironment={activeEnvironment}
        onChangeEnvironment={setActiveEnvironment}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
      />

      <WorldHUD
        activeEnvironment={activeEnvironment}
        onChangeEnvironment={setActiveEnvironment}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
        selectedHotspot={selectedHotspot}
        onCloseHotspot={() => setSelectedHotspot(null)}
        onOpenCodexDoc={onOpenCodexDoc}
      />
    </div>
  );
};

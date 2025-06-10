type Section = { duration: number; sound: string; durationSeconds: number; };

interface SectionProps {
  section: Section;
  index: number;
  removeSection: (index: number) => void;
  updateSectionTime: (index: number, duration: number) => void;
  updateSectionSeconds: (index: number, duration: number) => void;
  updateSectionSound: (index: number, sound: string) => void;
}

interface MeditationProps {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  name: string;
  currentSectionIndex: number;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
}

interface SessionControlsProps {
  sections: Section[];
  currentSectionIndex: number;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
}

interface SessionSaveProps {
  sections: Section[];
  saved: boolean;
  setSaved: (saved: boolean) => void;
  save: boolean;
  setSave: (saved: boolean) => void;
}

interface OpenSaveDialogButtonProps
{
  saved: boolean;
  setSave: (save: boolean) => void;
}


interface MeditationLoadProps {
  setSections: (sections: Section[]) => void;
}

interface StorageSession {
  stages: Section[];
  name: string;
  date: string;
}

interface StorageMeditations {
  meditations: StorageSession[];
}

export type {
  Section,
  SectionProps,
  MeditationProps,
  SessionControlsProps,
  SessionSaveProps,
  StorageSession,
  StorageMeditations,
  MeditationLoadProps,
  OpenSaveDialogButtonProps
};

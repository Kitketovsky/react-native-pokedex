export interface IPokemonLocation {
  location_area: {
    name: string;
    url: string;
  };
  version_details: VersionDetail[];
}

interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: {
    name: string;
    url: string;
  };
}

interface EncounterDetail {
  chance: number;
  condition_values: { name: string; url: string }[];
  max_level: number;
  method: {
    name: string;
    url: string;
  };
  min_level: number;
}

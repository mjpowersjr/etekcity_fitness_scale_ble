/** Domain and WebSocket constants. */
export const DOMAIN = "etekcity_fitness_scale_ble";
export const WS_CARD_CONFIG = `${DOMAIN}/card_config`;

/** Metric definitions with human-readable labels, icons, and units. */
export interface MetricDef {
  key: string;
  label: string;
  icon: string;
  unit: string;
  precision: number;
}

export const METRICS: MetricDef[] = [
  { key: "body_mass_index", label: "BMI", icon: "mdi:human-male-height-variant", unit: "", precision: 1 },
  { key: "body_fat_percentage", label: "Body Fat", icon: "mdi:human-handsdown", unit: "%", precision: 1 },
  { key: "fat_free_weight", label: "Fat Free Weight", icon: "mdi:run", unit: "", precision: 1 },
  { key: "subcutaneous_fat_percentage", label: "Subcut. Fat", icon: "mdi:human-handsdown", unit: "%", precision: 1 },
  { key: "visceral_fat_value", label: "Visceral Fat", icon: "mdi:human-handsdown", unit: "", precision: 0 },
  { key: "body_water_percentage", label: "Body Water", icon: "mdi:water-percent", unit: "%", precision: 1 },
  { key: "basal_metabolic_rate", label: "BMR", icon: "mdi:fire", unit: " cal", precision: 0 },
  { key: "skeletal_muscle_percentage", label: "Skeletal Muscle", icon: "mdi:weight-lifter", unit: "%", precision: 1 },
  { key: "muscle_mass", label: "Muscle Mass", icon: "mdi:weight-lifter", unit: "", precision: 1 },
  { key: "bone_mass", label: "Bone Mass", icon: "mdi:bone", unit: "", precision: 1 },
  { key: "protein_percentage", label: "Protein", icon: "mdi:egg-fried", unit: "%", precision: 1 },
  { key: "metabolic_age", label: "Metabolic Age", icon: "mdi:human-walker", unit: " yr", precision: 0 },
];

/** Keys used in the overview summary line. */
export const SUMMARY_KEYS = ["body_mass_index", "body_fat_percentage", "muscle_mass"];

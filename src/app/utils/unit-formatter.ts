export const UNIT_ABBREVIATIONS: Record<string, string> = {
  'kg': 'kg',
  'gramos': 'gr',
  'litros': 'l',
  'unidad': 'ud',
  'metros': 'm'
};

export function formatUnit(unit: string): string {
  return UNIT_ABBREVIATIONS[unit.toLowerCase()] || unit;
}

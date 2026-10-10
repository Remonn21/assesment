import type { Dimension } from '../../src/generated/prisma/enums';

export const DISC_GROUPS: Record<Dimension, string>[] = [
  { C: 'Accurate', D: 'Decisive', S: 'Considerate', I: 'Confident' },
  { C: 'Introspective', D: 'Strong willed', S: 'Moderate', I: 'Inspiring' },
  { C: 'Cautious', D: 'Straight-Forward', S: 'Generous', I: 'Charming' },
  { C: 'Orderly', D: 'Determined', S: 'Neighborly', I: 'Playful' },
  { C: 'Disciplined', D: 'Assertive', S: 'Good Listener', I: 'Cheerful' },
  { C: 'Soft spoken', D: 'Daring', S: 'Sympathetic', I: 'Entertaining' },
  { C: 'Careful', D: 'Competitive', S: 'Even-tempered', I: 'Enthusiastic' },
  { C: 'Controlled', D: 'Pioneering', S: 'Steady', I: 'Poised' },
  { C: 'Correct', D: 'Daring', S: 'Compassionate', I: 'Expressive' },
  { C: 'Restrained', D: 'Forceful', S: 'Accommodating', I: 'Talkative' },
  { C: 'Tactful', D: 'Extroverted', S: 'Stable', I: 'Persuasive' },
  { C: 'Constant', D: 'Impatient', S: 'Cooperative', I: 'Gregarious' },
  { C: 'Impartial', D: 'Vigorous', S: 'Calm', I: 'Influential' },
  { C: 'Diplomatic', D: 'Outspoken', S: 'Accepting', I: 'Friendly' },
];

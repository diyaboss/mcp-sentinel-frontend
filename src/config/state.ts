export interface SentinelConfig {
  intentEnforcement: boolean;
  provenanceTracking: boolean;
  fingerprinting: boolean;
  injectionDetection: boolean;
  taintTracking: boolean;
  askThreshold: number;
  blockThreshold: number;
}

export const defaultSentinelConfig: SentinelConfig = {
  intentEnforcement: true,
  provenanceTracking: true,
  fingerprinting: true,
  injectionDetection: true,
  taintTracking: true,
  askThreshold: 50,
  blockThreshold: 80,
};

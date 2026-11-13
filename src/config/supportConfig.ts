export type SupportPosition = 'bottom-right' | 'bottom-left';

export interface SupportConfig {
  enabled: boolean;
  widgetUrl: string;
  apiKey: string;
  position: SupportPosition;
  companyName: string;
  primaryColor: string;
}

export const SUPPORT_CONFIG: SupportConfig = {
  enabled: true,
  widgetUrl: '', // SupportRoot AI widget URL goes here
  apiKey: '',    // SupportRoot AI API key goes here
  position: 'bottom-right',
  companyName: 'Blinko',
  primaryColor: '#FF6B00',
};

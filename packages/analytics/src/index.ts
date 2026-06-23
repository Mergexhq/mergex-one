// Analytics package entrypoint
export const trackEvent = (event: string, properties?: any) => {
  console.log(`Tracked: ${event}`, properties);
};

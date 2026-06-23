// Notifications package entrypoint
export const sendNotification = async (userId: string, message: string) => {
  console.log(`Notification sent to ${userId}: ${message}`);
  return { success: true };
};

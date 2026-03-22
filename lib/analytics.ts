// Google Analytics event tracking helper
// Usage: trackEvent('donate_click', { amount: 1000, student: 'Priya' })

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

// Pre-defined events for common actions
export const analytics = {
  donateClick: (amount: number, studentName?: string) =>
    trackEvent("donate_click", {
      amount,
      ...(studentName && { student_name: studentName }),
    }),

  donateSuccess: (amount: number, studentName?: string) =>
    trackEvent("donate_success", {
      amount,
      currency: "INR",
      ...(studentName && { student_name: studentName }),
    }),

  whatsappShare: (page: string) =>
    trackEvent("whatsapp_share", { page }),

  studentProfileView: (studentId: string, studentName: string) =>
    trackEvent("student_profile_view", {
      student_id: studentId,
      student_name: studentName,
    }),

  contactClick: (method: "whatsapp" | "phone" | "email") =>
    trackEvent("contact_click", { method }),

  libraryPortalClick: () =>
    trackEvent("library_portal_click"),
};

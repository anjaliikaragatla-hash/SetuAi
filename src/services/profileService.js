// services/profileService.js
// All profile data ops. Replace with fetch('/api/profile') later.

const KEY = "setuai_user";

export const profileService = {
  get: () => {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  },
  update: (data) => {
    const current = profileService.get() || {};
    const updated = { ...current, ...data };
    localStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  }
};

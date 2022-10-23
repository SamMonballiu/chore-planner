interface ISettings {
  baseUrl: string;
  showRepeatIntervalOnInactiveChores: boolean;
  showActivationDateOnActiveChores: boolean;
}

export const Settings: ISettings = {
  baseUrl: import.meta.env.VITE_URL as string,
  showRepeatIntervalOnInactiveChores:
    import.meta.env.VITE_SHOW_INTERVAL_FOR_INACTIVE as boolean ?? false,
  showActivationDateOnActiveChores:
    import.meta.env.VITE_SHOW_DATE_FOR_ACTIVE as boolean ?? false,
};

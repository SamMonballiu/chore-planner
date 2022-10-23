interface ISettings {
  baseUrl: string;
  showRepeatIntervalOnInactiveChores: boolean;
}

export const Settings: ISettings = {
  baseUrl: import.meta.env.VITE_URL as string,
  showRepeatIntervalOnInactiveChores:
    (import.meta.env.VITE_SHOW_INTERVAL_FOR_INACTIVE as boolean) ?? false,
};

interface ISettings {
  baseUrl: string;
}

export const Settings: ISettings = {
  baseUrl: import.meta.env.VITE_URL as string,
};

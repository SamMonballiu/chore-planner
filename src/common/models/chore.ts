import { Entity } from "./entity";

export interface Chore extends Entity {
  name: string;
  owner: string;
  categoryId: string;
  repeatInterval?: number;
  lastActiveDate?: Date;
}

export const getIntervalProgressPercentage = (
  chore: Chore
): number | undefined => {
  if (chore.lastActiveDate === undefined) {
    return undefined;
  }

  if (chore.repeatInterval === undefined) {
    return 0;
  }

  const temp = new Date(chore.lastActiveDate);
  const choreStart = temp.getTime();
  temp.setDate(temp.getDate() + chore.repeatInterval);
  const choreEnd = temp.getTime();

  const today = new Date().getTime();
  const currentPointInInterval = today - choreStart;
  const totalInterval = choreEnd - choreStart;

  return Math.min(100, (currentPointInInterval / totalInterval) * 100);
};

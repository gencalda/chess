export function getTimeSince(lastActive: number) {
  return new Date().getTime() - new Date(lastActive * 1000).getTime();
}

export function msToTime(duration: number) {
  return {
    hours: Math.floor(duration / (1000 * 60 * 60)),
    minutes: Math.floor((duration / (1000 * 60)) % 60),
    seconds: Math.floor((duration / 1000) % 60),
  };
}

export function getGymBatchStatus(mockHour = null) {
  const now = new Date();
  const currentHour = mockHour !== null ? mockHour : now.getHours();
  const currentMinute = now.getMinutes();

  // Morning batch: 6 to 10 (6:00 AM to 10:00 AM)
  // Evening batch: 17 to 22 (5:00 PM to 10:00 PM)

  if (currentHour >= 6 && currentHour < 10) {
    const hoursLeft = 10 - currentHour;
    return {
      isOpen: true,
      batchName: "Morning Batch",
      timings: "6:00 AM – 10:00 AM",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      dotColor: "bg-emerald-400 animate-pulse",
      statusText: "OPEN NOW",
      subText: `Morning batch active • Closes at 10:00 AM (${hoursLeft}h remaining)`
    };
  }

  if (currentHour >= 17 && currentHour < 22) {
    const hoursLeft = 22 - currentHour;
    return {
      isOpen: true,
      batchName: "Evening Batch",
      timings: "5:00 PM – 10:00 PM",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      dotColor: "bg-emerald-400 animate-pulse",
      statusText: "OPEN NOW",
      subText: `Evening batch active • Closes at 10:00 PM (${hoursLeft}h remaining)`
    };
  }

  if (currentHour >= 10 && currentHour < 17) {
    const hoursUntilEvening = 17 - currentHour;
    return {
      isOpen: false,
      batchName: "Break Between Batches",
      timings: "Opens 5:00 PM",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      dotColor: "bg-amber-400",
      statusText: "OPENS AT 5:00 PM",
      subText: `Next is Evening Batch (5:00 PM – 10:00 PM) in ~${hoursUntilEvening}h`
    };
  }

  // Night hours (22:00 to 06:00)
  return {
    isOpen: false,
    batchName: "Night Break",
    timings: "Opens 6:00 AM",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    dotColor: "bg-blue-400",
    statusText: "OPENS AT 6:00 AM",
    subText: "Next is Morning Batch (6:00 AM – 10:00 AM)"
  };
}

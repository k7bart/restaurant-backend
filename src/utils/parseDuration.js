const parseDurationToMs = (duration) => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };

  return value * multipliers[match[2]];
};

module.exports = { parseDurationToMs };

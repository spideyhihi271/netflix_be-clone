module.exports = {
    minus_times_today: (target, minus_today) => {
        var now = new Date();
        var targetDate = new Date(target);
        now.setDate(now.getDate() - minus_today);
        var diffInMs = now.getTime() - targetDate.getTime();
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays
    }
}

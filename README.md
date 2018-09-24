# pacificCountDownClock
This is a countdown clock written in Javascript to allow a developer to receive a JSON object containing the days, hours, minutes, seconds left counting down from a given deadline.

# Calculating the Deadline
The function `calculateEndofToday()` is how the nearest midnight in the future is calculated. Currently, it is written to calculate the current day's end, the future midnight and return that in a date object.

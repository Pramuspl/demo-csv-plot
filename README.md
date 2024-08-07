# CSV Data Plot in Preact

My minimal implementation of a CSV Data Plot using [Preact](https://preactjs.com/) (with [signals](https://preactjs.com/guide/v10/signals/)), [papaparse](https://www.papaparse.com/), [recharts](https://recharts.org/) and [downsample](https://github.com/janjakubnanista/downsample).

## Installation and launching

```bash
npm/pnpm/yarn install
npm/pnpm/yarn run dev
```

## Requirements

### Functional Requirements

1. User can select a CSV file from a hard drive.
2. After data is read and parsed by the app, it should draw simple line plot with following requirements

   - Display a window (range) of datapoints where
     - `N` = size of the window (number of data points to draw)
     - `S` = datapoint index of left edge of the window. Defaults to 0
     - `S`, `N` can be provided by the user (via simple numeric input) but please provide some sensible defaults
   - User can click `Start` button which increments `S` by `P` every `T` milliseconds.
     - `T` can be provided by the user, defaults to 500.
     - `P` can be provided by the user, defaults to 10.
   - Every change to input parameters should be reflected on the chart.

3. Additionally a few aggregates are displayed below the plot: min, max, average, variance. Aggregates are calculated from displayed window of data only.

### Technical requirements

1. Limits
   - There will be no more than 100M data points in a file.
   - `T` won’t be lower than 16.
   - There is no limit for `N` so some form of data downsampling needs to be implemented.
2. Performance
   - both reading data and drawing a plot should be possible without starving JS event queue.
3. Data Correctness
   - Calculated aggregates must be correct for given range.
   - If downsampling is implemented it should be clear for the user what is the margin of error for given data point. You can implement it in any way you want but the market standard is to present error margin as a shadow behind original series as in following picture

# F1 Dashboard

A live dashboard for Formula 1 sessions. It shows timing, tires, sector times, weather, track status, race control messages, and team radio.

## Features

- **Live timing**: positions, lap times, gaps, and sector times for each driver.
- **Tires**: the tire compound for each driver.
- **Race control messages**: flags, penalties, and other messages from race control.
- **Team radio**: play team radio clips.
- **Weather and track status**: air and track temperature, rain, and the current flag.

The circuit map and car speed do not work now. The F1 feed sends car position and car data only with an F1 TV token.

## How it works

- `server/` connects to the F1 live timing feed (`livetiming.formula1.com/signalrcore`). It keeps the latest data and sends it to browsers over a WebSocket on port 3001.
- `src/` is the Next.js app. It connects to the server and shows the data.

The F1 feed sends data only during a live session.

## Getting started

You need Node 22.12 or newer and pnpm.

```bash
git clone https://github.com/bennnnzo/f1-dashboard.git
cd f1-dashboard
pnpm i
```

Start the server and the app in two terminals:

```bash
pnpm server
pnpm dev
```

Open http://localhost:3000.

The app connects to `ws://localhost:3001`. To use a different server, set `NEXT_PUBLIC_WS_URL` in `.env.local`.

## Record and replay

Record a live session to a log file:

```bash
pnpm record
```

The log goes to `server/simulate/logs/<start time>.jsonl`. If the `logs` folder does not exist, the tool asks to create it. Start it before the session starts.

Replay a log:

```bash
pnpm replay <log name>
```

The replay server uses port 3001, so stop `pnpm server` first. The replay starts when a browser connects, and it plays at 4x speed.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Start the Next.js app in dev mode. |
| `pnpm server` | Start the server. |
| `pnpm record` | Record the F1 feed to a log file. |
| `pnpm replay <log name>` | Replay a log file. |
| `pnpm build` | Build the app and compile the server to `dist/`. |
| `pnpm start` | Start the built app. |
| `pnpm start:server` | Start the compiled server. |
| `pnpm lint` | Check the code with Biome. |
| `pnpm format` | Fix the code with Biome. |

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please open an issue or contact me at [bp08262004@gmail.com].
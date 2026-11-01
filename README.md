<div align="center">

# Live F1

**A real-time Formula 1 dashboard: live timing, a 3D track map with flag sectors, race control and team radio.**

[![Live](https://img.shields.io/badge/live-live--f1.com-e10600?style=for-the-badge)](https://live-f1.com)
[![Demo](https://img.shields.io/badge/demo-try_it_now-ffc43a?style=for-the-badge&labelColor=27272a)](https://live-f1.com/demo)

![Next.js](https://img.shields.io/badge/Next.js_16-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232a?logo=react&logoColor=61dafb)
![Three.js](https://img.shields.io/badge/Three.js-000?logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-0f172a?logo=tailwindcss&logoColor=38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)

<img src=".github/readme/demo.gif" alt="Live F1 dashboard during a virtual safety car and a pit stop" width="100%">

</div>

## Features

<table>
<tr>
<td width="72%"><img src=".github/readme/hero.png" alt="Desktop layout during a virtual safety car"></td>
<td width="28%"><img src=".github/readme/mobile.png" alt="Phone layout"></td>
</tr>
</table>

### Timing
- Positions, gaps, intervals, last and best laps, and all three sectors with their mini sectors.
- Purple for the overall fastest, green for a personal best.
- Tyre compound, tyre age, pit stops and places gained or lost since the start.
- Rows slide to their new place when positions change. Cars in the pit lane and retired cars dim.

### Qualifying
- Gaps and intervals for the part each driver last ran in: Q1, Q2 or Q3.
- The drop zone and the cutoff line are marked while a part runs.
- "Out Lap" shows from pit exit until the lap ends.

### 3D track map
- The circuit in 3D with orbit controls. The camera returns to its start position after 5 seconds.
- Each marshal sector turns yellow or red when race control shows a flag there.

### Race control and team radio
- Race control messages with their flags, newest first.
- Team radio clips with a player and a seek bar.

### Session
- Track status (green, yellow, safety car, VSC, red), lap count and weather.
- One layout for desktop, tablet and phone.

## How it works

```mermaid
flowchart LR
    F1[F1 live timing<br/>SignalR] --> Server

    subgraph Server [server/]
        Store[(Data store)]
        Recorder[Recorder]
    end

    Server -- WebSocket :3001 --> App
    Recorder --> Log[.jsonl log]
    Log --> Replay[Replay server] -- WebSocket :3001 --> App
    Log -. cut into a clip .-> Demo[public/demo]
    Demo --> App

    subgraph App [Next.js app]
        Zustand[(Zustand store)] --> UI[Dashboard]
    end

    MV[MultiViewer API] -- circuit layout --> App
```

- **The server** (`server/`) connects to F1's live timing feed over SignalR. It keeps the full session state and sends it to each browser over a WebSocket: first the whole state, then every change.
- **The app** (`src/`) merges each message into a Zustand store, and the dashboard renders from there.
- **The track map** comes from the MultiViewer API. It is split into marshal sectors and coloured by race control flags.
- **Recordings** save every message with a timestamp. The replay server plays them back like a live session. `/demo` plays a short clip straight in the browser, with no server.

F1 only sends data during a live session. Car positions and car telemetry need an F1 TV token, so the app does not show them.

## Getting started

You need **Node 22.12 or newer** and **pnpm**.

```bash
git clone https://github.com/BENNNZO/f1-dashboard.git
cd f1-dashboard
pnpm install
```

Start the server and the app in two terminals:

```bash
pnpm server   # F1 feed → WebSocket on :3001
pnpm dev      # Next.js app on :3000
```

Open http://localhost:3000. Outside a live session the dashboard stays empty: open http://localhost:3000/demo, or replay a recording (see below).

To use another server, set `NEXT_PUBLIC_WS_URL` in `.env.local` (default `ws://localhost:3001`). The server port comes from `PORT` (default `3001`).

## Record and replay

Record a live session to a log file. Start it before the session begins:

```bash
pnpm record
```

The log goes to `server/simulate/logs/<start time>.jsonl`. If the `logs` folder does not exist, the recorder asks to create it.

Replay a log as if it were live:

```bash
pnpm replay <log name>   # file name without .jsonl
```

The replay server also uses port 3001, so stop `pnpm server` first. Playback starts when a browser connects and runs at 4× speed.

### The demo

[`/demo`](https://live-f1.com/demo) plays a clip in the browser, with no server: laps 51–53 of the 2026 United States Grand Prix, with two yellow flags and a virtual safety car, looped at 4× speed.

Everything it needs is in `public/demo/`:

| File | Content |
| --- | --- |
| `session.jsonl` | The clip. The first line is the full session state at the start of the clip. |
| `circuit.json` | The circuit layout, so the map needs no API call. |
| `radio/` | The team radio clips, so they keep working if F1 removes them. |

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

## Credits

- Live data: [Formula 1 live timing](https://livetiming.formula1.com).
- Circuit layouts: the [MultiViewer](https://multiviewer.app) API.

This project is not affiliated with, endorsed by, or connected to Formula 1, the FIA, or any team. F1, Formula 1 and related marks are trademarks of Formula One Licensing B.V.

## License

© 2026 Ben Phillips. All rights reserved.

The source is public so you can read it. You may not copy, change, distribute or deploy it without written permission.

## Contact

Questions or ideas? [Open an issue](https://github.com/BENNNZO/f1-dashboard/issues).
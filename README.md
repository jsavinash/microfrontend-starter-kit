# Microfrontend Starter Kit

A production-ready, highly scalable microfrontend monorepo built with **Turborepo**, **Vite Module Federation**, **React 19**, and **TypeScript**.

## Architecture

```
my-monorepo/
├── apps/
│   ├── host-shell/          # Container/Host application (port 3000)
│   ├── mfe-auth/            # Microfrontend: Authentication & Profile (port 3001)
│   └── mfe-dashboard/       # Microfrontend: Dashboard & Analytics (port 3002)
├── packages/
│   ├── ui-components/       # Shared design system components
│   ├── config-eslint/       # Shared ESLint configurations
│   ├── config-typescript/   # Shared TSConfig bases
│   └── utils/               # Shared helpers/constants
├── e2e/                     # Playwright E2E tests
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Tech Stack

| Category         | Technology                                         |
| ---------------- | -------------------------------------------------- |
| **Monorepo**     | Turborepo                                          |
| **Package Mgr**  | pnpm (workspaces)                                  |
| **Framework**    | React 19 + TypeScript                              |
| **Bundler**      | Vite 5                                             |
| **Module Fed.**  | @originjs/vite-plugin-federation                   |
| **Styling**      | Tailwind CSS                                       |
| **Testing**      | Vitest + React Testing Library / Playwright        |
| **Code Quality** | ESLint (flat config), Prettier, Husky, lint-staged |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9

### Installation

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install all dependencies
pnpm install

# Build all packages and apps
pnpm build
```

### Development

Start all applications:

```bash
pnpm dev
```

This will:

1. Build both microfrontends (`mfe-auth` on port 3001, `mfe-dashboard` on port 3002)
2. Start the MFEs in **preview mode** (serving production builds for Module Federation compatibility)
3. Start the **Host Shell** on port 3000 in dev mode

**Important:** Module Federation requires the remote MFEs to be built first so that `remoteEntry.js` is available. The `pnpm dev` command handles this automatically.

**Apps:**

- **Host Shell** → http://localhost:3000
- **MFE Auth** → http://localhost:3001
- **MFE Dashboard** → http://localhost:3002

Or start individual apps:

```bash
# Build MFEs first (required for Module Federation)
pnpm build:mfes

# Then start them in preview mode
pnpm --filter @repo/mfe-auth preview
pnpm --filter @repo/mfe-dashboard preview
pnpm --filter @repo/host-shell dev
```

### Testing

```bash
# Run all unit/integration tests
pnpm test

# Run tests for a specific package
pnpm --filter @repo/ui-components test

# Run E2E tests (requires dev servers running)
pnpm test:e2e
```

### Linting & Formatting

```bash
# Lint all projects
pnpm lint

# Auto-fix lint issues and format code
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Building for Production

```bash
# Build all apps and packages
pnpm build

# Preview production build
pnpm --filter @repo/host-shell preview
```

## Module Federation

The host-shell dynamically loads remote microfrontends:

- **MFE Auth** exposes `./App` at `http://localhost:3001/assets/remoteEntry.js`
- **MFE Dashboard** exposes `./App` at `http://localhost:3002/assets/remoteEntry.js`

Shared dependencies: `react`, `react-dom`, `react-router-dom`

### Error Handling

Each remote microfrontend is wrapped with:

- **Error Boundary** — Catches failures and displays a fallback UI with retry capability
- **Suspense** — Shows a loading spinner while the remote module loads

## Project Structure

### Apps

| App             | Port | Description                                    |
| --------------- | ---- | ---------------------------------------------- |
| `host-shell`    | 3000 | Container app with routing, navigation, layout |
| `mfe-auth`      | 3001 | Login, registration, and user profile          |
| `mfe-dashboard` | 3002 | Dashboard with metrics, charts, and analytics  |

### Packages

| Package             | Description                            |
| ------------------- | -------------------------------------- |
| `ui-components`     | Shared React components (Button, etc.) |
| `utils`             | Shared utility functions               |
| `config-eslint`     | Shared ESLint flat configs             |
| `config-typescript` | Shared TypeScript configuration bases  |

## Git Hooks

Husky v9 runs automated checks before every commit and push to enforce code quality and prevent common issues.

### Pre-commit Hook (6-Stage Pipeline)

Runs automatically before every `git commit`:

| Stage | Check                                                                                   | Blocks commit? |
| ----- | --------------------------------------------------------------------------------------- | :------------: |
| **1** | **Lint-staged** — ESLint `--fix` + Prettier on staged files                             |       ✅       |
| **2** | **TypeScript Type Check** — `turbo typecheck` if `.ts`/`.tsx` changed                   |       ✅       |
| **3** | **Unit Tests** — Runs tests for changed packages only                                   |       ✅       |
| **4** | **Debug Artifacts** — Blocks `debugger;` and `.only` in tests; warns on `console.log()` |       ✅       |
| **5** | **Large File Check** — Blocks files > 1MB                                               |       ✅       |
| **6** | **Dependency Audit** — Warns on high-severity vulnerabilities when lockfile changes     |       ⚠️       |

### Commit-msg Hook

Enforces [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `build`, `revert`

**Examples:**

- `feat(auth): add login page`
- `fix(host-shell): resolve routing issue`
- `chore(deps): update dependencies`

### Pre-push Hook (4-Stage Pipeline)

Runs automatically before every `git push`:

| Stage | Check                                                                    | Blocks push? |
| ----- | ------------------------------------------------------------------------ | :----------: |
| **1** | **Branch Protection** — Prevents pushing to `main`/`master`/`production` |      ✅      |
| **2** | **Full Build** — `pnpm build` across all packages                        |      ✅      |
| **3** | **Full Test Suite** — `pnpm test` (all packages)                         |      ✅      |
| **4** | **E2E Check** — Verifies E2E test files exist                            |      ⚠️      |

### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "emergency commit"

# Skip pre-push hook
git push --no-verify
```

**Warning:** Use `--no-verify` sparingly. Always run `pnpm lint:fix && pnpm test` manually before bypassing hooks.

## CI/CD Pipeline

This project includes a production-grade CI/CD pipeline using **GitHub Actions** with the following stages:

### Pipeline Stages

| Stage | Name                            | Description                                                         |
| ----- | ------------------------------- | ------------------------------------------------------------------- |
| 1     | **🔍 Quality Gate**             | Linting, TypeScript type checking, formatting check, security audit |
| 2     | **🧪 Unit & Integration Tests** | Vitest tests with coverage reports across all packages              |
| 3     | **📦 Build**                    | Compile all apps and packages via Turborepo                         |
| 4     | **🌐 E2E Tests**                | Playwright tests sharded across 2 parallel runners                  |
| 5     | **📊 E2E Report**               | Merged Playwright report from all shards                            |
| 6     | **🚀 Deploy to GitHub Pages**   | Deploy microfrontends to GitHub Pages (main branch only)            |
| 7     | **📬 Notify**                   | Deployment status notification                                      |

### Workflow Triggers

- **Push** to `main` or `develop` branches
- **Pull Requests** targeting `main`
- **Manual dispatch** via `workflow_dispatch` with deploy option

### Quality Gates

The pipeline enforces:

- **ESLint** — Zero warnings policy
- **TypeScript** — Strict type checking
- **Prettier** — Consistent code formatting
- **pnpm audit** — Dependency vulnerability scanning (high/moderate severity)
- **Vitest** — Unit/integration tests with coverage
- **Playwright** — E2E tests across 2 shards

## GitHub Pages Deployment

### Prerequisites

1. **GitHub repository** with GitHub Pages enabled
2. **Repository Settings** → **Pages** → **Source**: GitHub Actions

### How it Works

The deployment job assembles a flat deployment structure suitable for GitHub Pages:

```
https://<username>.github.io/microfrontend-starter-kit/
├── index.html                 ← host-shell entry point
├── assets/                    ← host-shell assets
├── mfe-auth/
│   ├── assets/
│   └── remoteEntry.js         ← MFE Auth remote entry
├── mfe-dashboard/
│   ├── assets/
│   └── remoteEntry.js         ← MFE Dashboard remote entry
└── .nojekyll                  ← Prevents GH Pages Jekyll processing
```

### Environment Variables for Deployment

The pipeline injects these env vars during the deploy job:

| Variable                 | Purpose                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `VITE_BASE_PATH`         | Base path for the deployed app (e.g., `/microfrontend-starter-kit/`) |
| `VITE_MFE_AUTH_URL`      | Production URL for MFE Auth `remoteEntry.js`                         |
| `VITE_MFE_DASHBOARD_URL` | Production URL for MFE Dashboard `remoteEntry.js`                    |

### Local Preview of Production Build

```bash
# Build with GitHub Pages base path (simulate deployment)
VITE_BASE_PATH=/ VITE_MFE_AUTH_URL=http://localhost:3001/assets/remoteEntry.js VITE_MFE_DASHBOARD_URL=http://localhost:3002/assets/remoteEntry.js pnpm build

# Serve locally
pnpm --filter @repo/host-shell preview
pnpm --filter @repo/mfe-auth preview
pnpm --filter @repo/mfe-dashboard preview
```

### Configuring for Your Repository

The pipeline is configured for repository at `https://github.com/jsavinash/microfrontend-starter-kit`. To adapt for your own repository:

1. **Update the workflow file** (`.github/workflows/ci-cd.yml`):
    - Replace `microfrontend-starter-kit` with your repository name in the deploy job's `VITE_BASE_PATH`, `VITE_MFE_AUTH_URL`, and `VITE_MFE_DASHBOARD_URL` env vars
    - Update the `concurrency` group if needed

2. **Enable GitHub Pages** in your repository:
    - Go to **Settings** → **Pages**
    - Under **Build and deployment**, select **GitHub Actions**

3. **Push to `main`** — The deployment will trigger automatically

### Security

- **Frozen lockfile** — Ensures reproducible builds (`pnpm install --frozen-lockfile`)
- **Read-only permissions** for content, write permissions only for pages and checks
- **Concurrency limits** — Cancels in-progress runs for non-main branches
- **Timeouts** — Each job has a timeout to prevent runaway CI costs

## License

MIT

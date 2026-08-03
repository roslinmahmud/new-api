# GitHub Copilot & AI Agent Instructions — Fork & Branch Conventions

> **Notice:** Core tech stack, architecture, database rules, i18n, and backend/frontend coding standards are defined in [`AGENTS.md`](../AGENTS.md). Refer to `AGENTS.md` for project-wide engineering invariants.

This repository is an **extended custom fork** of `QuantumNous/new-api`.

---

## 1. Branch Strategy & Target

- **Active Development Branch:** `dev`
  - ALL custom features, bug fixes, UI adjustments, and extensions MUST target the `dev` branch.
  - Never submit code or PRs targeting `main`.
- **Upstream Sync Branch:** `main`
  - `main` strictly tracks `upstream/main` (`QuantumNous/new-api`).
  - `main` is periodically synced automatically via GitHub Actions. Do NOT modify `main` manually.

---

## 2. Upstream Merge Conflict Prevention

To prevent merge debt when `main` is merged into `dev`, follow these structural rules:

### A. File Isolation First
- **Do not edit existing core files line-by-line if a standalone file can achieve the goal.**
- **Backend:** Place custom controllers, services, middleware, and models in dedicated files using a `custom_` prefix (e.g., `controller/custom_*.go`, `service/custom_*.go`, `router/custom_*.go`).
- **Frontend:** Place custom React components and pages in dedicated directories under `web/src/components/Custom/` or `web/src/pages/Custom/`.

### B. Inline Modification Protocol
If you MUST modify an existing upstream core file (e.g., registering a router in `router/main.go` or adding a menu item in the frontend layout):
1. Keep the edit minimal (a single function call or import).
2. Explicitly frame the custom code using comment markers:
   ```go
   // CUSTOM EXTENSION BEGIN: [Brief feature summary]
   customRouter.RegisterRoutes(router)
   // CUSTOM EXTENSION END
   ```

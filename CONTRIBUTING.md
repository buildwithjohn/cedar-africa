# Cedar Home Builder — Branch & Version Control Strategy

## Branch Structure

```
main          ← Production (live on Vercel)
  └── staging ← Testing / QA (preview on Vercel)
        └── develop ← All active development work
              └── feature/xxx ← Individual feature branches
```

| Branch | Purpose | Vercel Env | Who merges |
|--------|---------|------------|------------|
| `main` | **Production** — what clients see | Production URL | Merge from `staging` via PR only |
| `staging` | **Testing** — QA before going live | Preview URL | Merge from `develop` via PR |
| `develop` | **Active dev** — day-to-day work | None | Direct push or feature PRs |
| `feature/*` | Individual features | None | PR into `develop` |
| `fix/*` | Bug fixes | None | PR into `develop` |
| `hotfix/*` | Urgent production fix | None | PR direct into `main` + backmerge |

---

## Day-to-Day Workflow

### 1. Starting a new feature

```bash
# Always branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Do your work, then commit
git add .
git commit -m "feat: add drone footage gallery section"
git push origin feature/your-feature-name
```
Then open a Pull Request: `feature/your-feature-name` → `develop`

---

### 2. Promoting to Staging (Testing)

```bash
git checkout staging
git pull origin staging
git merge develop
git push origin staging
```
Vercel will auto-deploy a **preview URL** for staging — share this for review/QA.

---

### 3. Promoting to Production (Main)

Only after staging has been reviewed and approved:

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```
Vercel auto-deploys to **production URL** on every push to `main`.

---

### 4. Hotfix (urgent production bug)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-description

# Fix the bug
git add .
git commit -m "fix: resolve booking form crash"
git push origin hotfix/fix-description

# PR into main, then backmerge to develop
git checkout develop
git merge main
git push origin develop
```

---

## Commit Message Convention

```
feat:     New feature
fix:      Bug fix
style:    CSS / UI changes (no logic change)
refactor: Code restructure
docs:     Documentation only
chore:    Config, dependencies, build changes
```

Examples:
```
feat: add interactive drone map layer
fix: resolve mobile nav hamburger z-index
style: update hero section gold gradient
chore: update leaflet to v1.9.5
```

---

## Vercel Setup (connect once)

| Vercel Setting | Value |
|----------------|-------|
| Production Branch | `main` |
| Preview Branch | `staging` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

> Vercel auto-deploys `main` to production and `staging` to a preview URL on every push.

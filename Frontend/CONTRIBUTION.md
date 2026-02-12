# 🤝 CONTRIBUTION GUIDE - IPB Academic Help Center

Panduan kolaborasi Git dan development untuk tim ADS project.

---

## 📋 Table of Contents

1. Setup Git
2. Branching Strategy
3. Commit Convention
4. Pull Request Process
5. Code Review Guidelines
6. Conflict Resolution

---

## 🔧 Setup Git

### Clone Repository

```bash
git clone https://github.com/your-org/ipb-academic-help-center.git
cd ipb-academic-help-center/Frontend
```

### Setup Local

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development
npm start
```

### Configure Git

```bash
# Set user name & email (first time setup)
git config --global user.name "Nama Anda"
git config --global user.email "email@ipb.ac.id"

# View config
git config --list
```

---

## 🌿 Branching Strategy - Git Flow

### Main Branches

```
main (production)
  ↑
  └── develop (staging)
       ↑
       ├── feature/* (new features)
       ├── bugfix/* (bug fixes)
       ├── hotfix/* (urgent fixes)
       └── refactor/* (code refactoring)
```

### Branch Naming Convention

```
feature/feature-name          # Fitur baru
  Example: feature/login-page
  Example: feature/request-filter
  Example: feature/notification-system

bugfix/bug-name               # Bug fixes
  Example: bugfix/login-validation
  Example: bugfix/request-update-error

hotfix/issue-name             # Urgent fixes (from main)
  Example: hotfix/crash-on-logout

refactor/refactor-name        # Code refactoring
  Example: refactor/extract-components
  Example: refactor/optimize-hooks

docs/documentation-name       # Documentation updates
  Example: docs/api-documentation
```

### Creating a New Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Start development...
# (Edit files, test locally)

# When ready, push to remote
git push -u origin feature/your-feature-name
```

---

## 💬 Commit Convention

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: Fitur baru
- `fix`: Bug fixes
- `refactor`: Refactoring kode (tanpa mengubah fungsionalitas)
- `style`: Format, semicolons, brackets, etc
- `docs`: Dokumentasi/README changes
- `test`: Adding/updating tests
- `chore`: Build process, dependencies, tools

### Scope (Opsional)

- `auth`, `request`, `notification`, `dashboard`, `navbar`, `form`, `service`, dll

### Subject

- Gunakan imperative tense ("add", "fix", "refactor")
- Jangan capitalize first letter
- Jangan gunakan period (.) di akhir
- Maksimal 50 karakter

### Examples

```bash
# Fitur baru
git commit -m "feat(login): add role selection UI"
git commit -m "feat(request): implement create request form"

# Bug fix
git commit -m "fix(auth): resolve login validation error"
git commit -m "fix(dashboard): fix stat cards alignment on mobile"

# Refactoring
git commit -m "refactor(hooks): extract useServiceRequest logic"
git commit -m "refactor(components): simplify Alert component"

# Dokumentasi
git commit -m "docs: update SETUP.md with installation steps"

# Styling
git commit -m "style: format code with Prettier"
```

### Commit dengan Description

```bash
git commit -m "feat(request): add filter by status

- Add status filter tabs
- Implement filter logic in RequestListPage
- Add tests for filter functionality
- Update mock data

Closes #123"
```

---

## 📤 Pull Request Process

### Step 1: Prepare Local Branch

```bash
# Make sure local develop is up to date
git checkout develop
git pull origin develop

# Go back to feature branch
git checkout feature/your-feature
git rebase develop        # Or merge if prefer

# Resolve conflicts if any
git push origin feature/your-feature
```

### Step 2: Create Pull Request

**On GitHub/GitLab:**

1. Click "Create Pull Request" button
2. Fill PR details:

```markdown
## Description

[Jelaskan apa yang Anda ubah dan mengapa]

## Type of Change

- [ ] New feature (non-breaking change)
- [ ] Bug fix (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

- [x] Tested on Windows
- [ ] Tested on macOS
- [ ] Tested on Linux

## Screenshots (if UI changes)

[Attach screenshot jika ada UI changes]

## Checklist

- [x] Code follows style guidelines
- [x] Self-review done
- [x] Comments added for complex logic
- [x] Documentation updated
- [x] No breaking changes
- [ ] Tests added/updated
```

### Step 3: Code Review

**Reviewers akan check:**

- ✅ Code quality & readability
- ✅ TypeScript types
- ✅ Testing coverage
- ✅ Naming conventions
- ✅ Performance impact
- ✅ Security concerns

### Step 4: Address Feedback

```bash
# Make requested changes
# Edit files...

# Commit changes
git add .
git commit -m "refactor(request): address review feedback"

# Push updates
git push origin feature/your-feature
```

### Step 5: Merge to Develop

After approval:

```bash
# Admin akan merge ke develop
# PR akan close otomatis
```

---

## 🔍 Code Review Guidelines

### Sebagai Reviewer

✅ **DO**:

- Cek code logic & correctness
- Review type safety
- Check performance
- Suggest improvements
- Be respectful & constructive
- Ask questions jika unclear

❌ **DON'T**:

- Request unnecessary changes
- Nitpick code style (use formatter)
- Approve tanpa review
- Make dismissive comments

### Sebagai Author

✅ **DO**:

- Explain your changes clearly
- Keep PR scope small & focused
- Respond to feedback positively
- Request review changes jika perlu
- Be professional

❌ **DON'T**:

- Create huge PRs
- Mix multiple features
- Take feedback personally
- Force merge tanpa approval

### Review Checklist

- [ ] Code quality
- [ ] TypeScript types correct
- [ ] Error handling implemented
- [ ] No console.log/ debug code
- [ ] Performance acceptable
- [ ] No security vulnerabilities
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Follows naming conventions
- [ ] No breaking changes

---

## 🔄 Conflict Resolution

### Understanding Conflicts

Conflicts terjadi ketika:

- Multiple branches edit file yang sama
- Changes di area yang sama
- Git tidak bisa auto-merge

### Resolving Conflicts

```bash
# Step 1: Update develop
git checkout develop
git pull origin develop

# Step 2: Try to rebase feature branch
git checkout feature/your-feature
git rebase develop

# If conflicts occur, Git akan notify...
```

### Manual Conflict Resolution

Dalam file yang conflict, Anda akan lihat:

```
<<<<<<< HEAD (develop)
// Code dari develop
=======
// Code dari feature branch
>>>>>>> feature/your-feature
```

**Pilih mana yang ingin keep:**

```
// Keep develop version
// Code dari develop

// Or keep both
// Code dari develop
// Code dari feature branch

// Or keep feature version only
// Code dari feature branch
```

### Complete Rebase

```bash
# After resolving conflicts:
git add .
git rebase --continue

# Or abort if stuck:
git rebase --abort
```

### Push Resolved Changes

```bash
# Force push setelah rebase (HATI-HATI!)
git push origin feature/your-feature --force-with-lease
```

---

## 📊 Team Workflow Example

### Scenario: Tim 3 orang membuat fitur berbeda

**Team Members:**

- Ari: Feature login enhancement
- Budi: Feature request filter
- Citra: Feature notification system

### Timeline

**Day 1 - Ari mulai**

```bash
git checkout -b feature/login-enhancement
# ... development ...
git push origin feature/login-enhancement
# Create PR
```

**Day 2 - Ari PR merged, Budi mulai**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/request-filter
# ... development ...
git push origin feature/request-filter
# Create PR
```

**Day 3 - Budi PR merged, Citra mulai**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/notification-system
# ... development ...
git push origin feature/notification-system
# Create PR
```

**Day 4 - All features merged to develop**

```bash
# QA testing on develop branch
# When ready, create main PR
# Merge develop → main → Deploy to production
```

---

## 📁 File Management

### Adding New Files

```bash
# Create in appropriate folder
mkdir src/components/Pages
touch src/components/Pages/NewPage.tsx

# Stage & commit
git add src/components/Pages/NewPage.tsx
git commit -m "feat(newpage): add new page component"
```

### Renaming Files

```bash
# Use git mv to preserve history
git mv OLD_PATH NEW_PATH

git commit -m "refactor: rename file for clarity"
```

### Deleting Files

```bash
# Use git rm
git rm file-to-delete.tsx

git commit -m "refactor: remove unused component"
```

---

## 🔐 Security Best Practices

### Never Commit

❌ Passwords, API keys, tokens
❌ Private data, sensitive info
❌ node_modules (already in .gitignore)
❌ .env.local files (already in .gitignore)

### Setup Pre-commit Hooks (Optional)

```bash
# Install husky
npm install husky --save-dev
npx husky install

# Add hook to check for secrets
echo '#!/bin/sh' > .husky/pre-commit
echo 'npm run lint' >> .husky/pre-commit
chmod +x .husky/pre-commit
```

---

## 📞 Common Issues & Solutions

### Issue: Push rejected / "Need to pull first"

```bash
# Solution: Pull before push
git pull origin feature/your-feature
git push origin feature/your-feature
```

### Issue: Accidentally committed to wrong branch

```bash
# Solution: Use git cherry-pick or reset
git reset HEAD~1                    # Undo last commit
git checkout your-branch
git cherry-pick COMMIT_HASH         # Apply to correct branch
```

### Issue: Need to undo last commit

```bash
git reset --soft HEAD~1             # Keep changes
# or
git reset --hard HEAD~1             # Discard changes
```

### Issue: Branch deleted locally, need to recover

```bash
git reflog                          # Find commit hash
git checkout -b recovered-branch HASH
```

---

## 📚 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Pre-Submission Checklist

Sebelum push ke remote:

- [ ] Code locally tested ✓
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Code formatted: `npm run lint` (if available)
- [ ] No console.log/ debug code
- [ ] Comments added untuk complex logic
- [ ] Related issues documented
- [ ] PR description clear & detailed
- [ ] Screenshots attached (if UI changes)
- [ ] No unrelated changes included

---

## 🎯 Development Tips

### Efficient Development Workflow

```bash
# 1. Start your day
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Work on feature
# ... edit files ...

# 4. Commit regularly
git add .
git commit -m "feat: detailed commit message"

# 5. Before pushing, check status
git status
git log --oneline -5

# 6. Push to remote
git push origin feature/my-feature

# 7. Create PR on GitHub/GitLab
```

### Keep Branch Updated During Development

```bash
# Fetch latest updates
git fetch origin

# Rebase with develop
git rebase origin/develop

# If conflicts, resolve then:
git push origin feature/my-feature --force-with-lease
```

---

## 🎉 Kesimpulan

Dengan workflow ini, team bisa:

- ✅ Develop fitur paralel
- ✅ Avoid conflicts
- ✅ Track changes clearly
- ✅ Review code quality
- ✅ Maintain clean history
- ✅ Deploy safely

**Happy Collaborating!** 🚀

---

**Questions?** Diskusi dengan team lead atau check Git documentation.

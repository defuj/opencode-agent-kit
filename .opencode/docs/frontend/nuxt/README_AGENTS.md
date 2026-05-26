# Frontend Developer Agent

Expert frontend developer agent for Nuxt.js + Nuxt UI projects with MCP integration.

## 🎯 Agent

**Frontend Developer** (`frontend-developer.md`) - Senior frontend developer specializing in:

- Nuxt 4 & Vue 3 Composition API
- Nuxt UI component library
- TypeScript strict mode
- Performance optimization
- Accessibility (WCAG 2.1)
- Modern CSS & animations

## 📚 Documentation

Complete documentation in `docs/` folder:

| Document                                    | Description                      |
| ------------------------------------------- | -------------------------------- |
| [QUICK_START.md](./docs/QUICK_START.md)     | Get started in 5 minutes         |
| [EXAMPLES.md](./docs/EXAMPLES.md)           | 50+ practical code examples      |
| [API_PATTERNS.md](./docs/API_PATTERNS.md)   | useApi composable guide          |
| [WORKFLOWS.md](./docs/WORKFLOWS.md)         | 8 detailed development workflows |
| [CHEATSHEET.md](./docs/CHEATSHEET.md)       | Quick command reference          |
| [MCP_GUIDE.md](./docs/MCP_GUIDE.md)         | MCP server integration           |
| [TESTING_GUIDE.md](./docs/TESTING_GUIDE.md) | Testing & validation             |
| [INDEX.md](./docs/INDEX.md)                 | Complete navigation              |

## 🚀 Quick Start

1. **Activate agent:**

   ```
   @frontend Hello! What can you help me with?
   ```

2. **Create component:**

   ```
   @frontend Create Button component dengan props label dan variant
   ```

3. **Read documentation:**
   - Start: `docs/QUICK_START.md`
   - Examples: `docs/EXAMPLES.md`

## 🔧 Configuration

Agent configured in `../.opencode/config.json`:

- **Model:** Claude Sonnet 4
- **Temperature:** 0.4
- **MCP Servers:** Nuxt, Nuxt UI, Playwright, Figma
- **Skills:** 10+ professional skills integrated

## 📁 Structure

```
.opencode/agents/
├── README.md                  # This file
├── frontend-developer.md      # Agent definition (main file)
└── docs/                      # All documentation
    ├── INDEX.md               # Navigation hub
    ├── QUICK_START.md         # Getting started
    ├── EXAMPLES.md            # Code examples
    ├── API_PATTERNS.md        # API patterns
    └── ... (8+ more guides)
```

**Why this structure?**

- OpenCode shows ONLY `frontend-developer.md` in agent list
- All documentation in `docs/` folder (clean agent switcher)
- Easy to share/distribute as single package

## ✨ Features

- **MCP Integration:** Real-time Nuxt & Nuxt UI documentation
- **Skills Integration:** 10+ professional coding skills
- **Custom Patterns:** Project-specific patterns (e.g., useApi)
- **Type Safety:** TypeScript strict mode enforced
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Performance:** Lighthouse 90+ targets

## 🎓 Usage Examples

### Create Component

```
@frontend Create ProductCard component dengan:
- Image with lazy loading
- Price and discount badge
- Add to cart button
- Wishlist toggle
Gunakan Nuxt UI components.
```

### API Integration

```
@frontend Implement user list page dengan:
- useApi composable untuk fetch
- Error handling dengan retry
- Pagination
- Search functionality
```

### Performance Optimization

```
@frontend Optimize /products page:
- Current FCP: 3.5s
- Target: < 1.5s
- Lighthouse: 90+
```

## 📖 Learn More

- **Quick Start:** `docs/QUICK_START.md` (5 minutes)
- **Full Guide:** `docs/INDEX.md` (complete navigation)
- **API Patterns:** `docs/API_PATTERNS.md` (useApi guide)
- **Examples:** `docs/EXAMPLES.md` (50+ examples)

## 🤝 Sharing

To share this agent with others:

1. Copy entire `agents/` folder
2. Copy `../.opencode/config.json` (agent config section)
3. Share documentation: Point to `docs/QUICK_START.md`

Recipients will see only "Frontend Developer" in their agent list!

---

**Version:** 1.0.0  
**Status:** Production Ready ✅  
**Documentation:** 12 files | ~230 KB | 8,500+ lines

# Daily Writing Prompt Roadmap

## Version Strategy

### v1.x - Single File App (Current)
**Status**: ✅ Complete
**Branch**: `master`
**Features**: 365 prompts, daily rotation, offline functionality, clean UI

### v2.0 - MKStack Nostr Platform
**Status**: 🚧 In Development
**Branch**: `v2-mkstack-development`
**Timeline**: Q1 2025

**Core Features:**
- AI-powered development with Dork agent
- Nostr authentication and key management
- Enhanced prompt experience with distribution algorithm
- Response storage (localStorage + optional Nostr publishing)
- Writing streak tracking and analytics
- Prompt history and navigation
- Export/backup functionality
- PWA with dark mode
- Basic social: share responses to Nostr

**Technical Stack:**
- MKStack framework
- Dork AI agent for feature development
- Nostr protocol (50+ NIPs)
- NostrDeploy.com hosting
- Browser storage + Nostr relays

### v3.0 - Community Platform (Ditto Integration)
**Status**: 📋 Planned
**Branch**: `v3-ditto-community` (future)
**Timeline**: Q3 2025

**Community Features:**
- Advanced writing groups and circles
- Custom community relays with Ditto
- Real-time discussions and feeds
- Community-generated prompts
- Moderation tools and governance
- Advanced discovery and recommendation
- Community analytics and insights
- Cross-relay federation

**Technical Additions:**
- Ditto community platform integration
- PostgreSQL for complex queries
- Advanced relay management
- Scalable hosting infrastructure

## Migration Path

### v1 → v2 Migration
- **Backward compatible**: v1 remains available as lightweight option
- **Import capability**: Upload v1 response history to v2
- **Progressive enhancement**: v2 starts simple, adds features over time

### v2 → v3 Migration
- **Community opt-in**: Individual users can join/create communities
- **Data portability**: Nostr ensures responses are portable across platforms
- **Feature superset**: All v2 features remain in v3

## Development Branches

- `master` - v1.x stable releases
- `v2-mkstack-development` - v2.0 MKStack development
- `v3-ditto-community` - v3.0 community features (future)

## Release Philosophy

**v1**: Perfect the core writing experience
**v2**: Add individual empowerment (streaks, history, basic social)
**v3**: Enable community building and discovery

Each version stands alone while building toward a complete writing ecosystem.
# Daily Writing Prompt v2.0 Architecture Plan

## Overview
Transition from single-file HTML app to AI-powered Nostr writing platform built on MKStack. Ditto community features reserved for v3.0.

## Technology Stack
- **Framework**: MKStack (AI-powered Nostr app development)
- **AI Agent**: Dork (for natural language feature development)
- **Frontend**: MKStack components + custom writing interface
- **Protocol**: Nostr (50+ NIPs supported via MKStack)
- **Storage**: Browser localStorage + Nostr relays
- **Deployment**: NostrDeploy.com (instant deployment)

## Core Features

### V2.0 Core Features
- [ ] MKStack app initialization with Dork
- [ ] Nostr authentication (keys managed by MKStack)
- [ ] 365 daily prompts with distribution algorithm
- [ ] Response storage (localStorage + optional Nostr publishing)
- [ ] Writing streak tracking
- [ ] Prompt history and navigation
- [ ] Export functionality
- [ ] Dark mode and PWA
- [ ] Basic social: share responses to Nostr

### V3.0 Community Features (Ditto Integration)
- [ ] Advanced writing groups and circles
- [ ] Relay hosting and moderation
- [ ] Custom community prompts
- [ ] Advanced discovery and feeds
- [ ] Real-time discussions
- [ ] Community analytics

## Data Models

### Prompts
```typescript
interface Prompt {
  id: string;
  category: string;
  text: string;
  difficulty: 'light' | 'medium' | 'heavy';
  dayOfYear: number;
  createdBy?: string; // user pubkey for custom prompts
}
```

### User Responses
```typescript
interface Response {
  id: string;
  promptId: string;
  userPubkey: string;
  content: string;
  isPublic: boolean;
  nostrEventId?: string;
  createdAt: Date;
}
```

### User Stats
```typescript
interface UserStats {
  pubkey: string;
  currentStreak: number;
  longestStreak: number;
  totalResponses: number;
  joinDate: Date;
  lastActivity: Date;
}
```

## Integration Points

### Ditto Customizations
1. **Custom API Endpoints**
   - `/api/prompts` - Get daily/random prompts
   - `/api/responses` - CRUD for user responses
   - `/api/stats` - User writing statistics
   - `/api/streaks` - Streak calculations

2. **Event Processing**
   - Custom Nostr event kinds for prompts/responses
   - Integration with Ditto's event pipeline
   - Cross-relay synchronization

3. **Database Extensions**
   - Additional tables for prompts, responses, stats
   - Migrate existing 365 prompts to database
   - User preference storage

### Frontend Components
1. **Daily Prompt View** (enhanced v1 interface)
2. **Response Editor** (rich text + markdown)
3. **History Browser** (past prompts & responses)
4. **Social Feed** (community responses)
5. **Profile Dashboard** (stats, streaks, settings)

## Migration Strategy

### Backward Compatibility
- Keep v1.x as lightweight option
- v2.0 as optional upgrade path
- Import/export between versions

### Deployment Options
- **Self-hosted**: Full Ditto instance
- **SaaS**: Hosted version with registration
- **Hybrid**: Local storage + optional Nostr sync

## Development Workflow

### AI-First Development with MKStack
1. **Use Dork agent** to generate initial app structure
2. **Natural language prompts** for feature development
3. **Leverage pre-built Nostr components** from MKStack
4. **Integrate with Ditto** for community platform features
5. **Deploy via NostrDeploy.com** for instant hosting

### Technical Implementation
1. **MKStack setup** - Initialize AI-powered Nostr app
2. **Dork agent integration** - Natural language feature requests
3. **Custom prompt/response models** - Extend MKStack components
4. **Ditto backend integration** - Community and relay features
5. **One-command deployment** - NostrDeploy.com hosting

## Security Considerations
- Nostr key management
- Private response encryption
- Rate limiting for API endpoints
- Content moderation tools
- GDPR compliance for EU users

## Performance Targets
- < 2s initial load time
- < 500ms prompt switching
- Offline-first PWA functionality
- Sync across devices via Nostr

---

This architecture provides a clear path from simple daily prompts to a full writing community platform while maintaining the core simplicity that makes v1 effective.
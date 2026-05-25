---
name: api-documentation
description: API documentation generation with Postman sync workflow. Use when defining API contracts, creating endpoints, or designing API documentation.
---

# API Documentation & Postman Sync

Workflow for generating API documentation and optionally syncing to Postman collections.

## When to Activate

- Defining API contracts (endpoints, request/response schemas)
- Creating new API endpoints or modules
- Generating API documentation from code
- After completing backend endpoint implementation

## Confirmation Flow (User Must Approve)

Before any Postman sync, ALWAYS ask the user using the `question` tool:

```markdown
questions: [
  {
    header: "Postman Sync",
    question: "Do you also want to create/update this API in Postman?",
    options: [
      { label: "Yes (Recommended)", description: "Create/update Postman collection with all endpoints, requests, and response examples" },
      { label: "No", description: "Skip Postman sync, continue without" },
      { label: "Custom answer", description: "Type your own response" }
    ]
  }
]
```

Default fallback: If user doesn't select, pick "Yes (Recommended)".

## Postman Sync Workflow

### Prerequisites
- Postman MCP server enabled
- `POSTMAN_API_KEY` configured
- Postman workspace ID (ask user if not known)

### Step 1: Prepare API Contract Data

Before calling Postman tools, compile:

```json
{
  "collectionName": "My API - v1",
  "workspaceId": "ws-xxxxx",
  "baseUrl": "https://api.example.com",
  "endpoints": [
    {
      "name": "List Users",
      "method": "GET",
      "path": "/api/users",
      "description": "Get paginated list of users",
      "headers": { "Content-Type": "application/json", "Authorization": "Bearer {{token}}" },
      "queryParams": [
        { "key": "limit", "value": "10", "description": "Max results" },
        { "key": "offset", "value": "0", "description": "Pagination offset" }
      ],
      "responses": [
        { "code": 200, "name": "Success", "body": "{ \"users\": [], \"total\": 0 }" },
        { "code": 401, "name": "Unauthorized", "body": "{ \"error\": \"Unauthorized\" }" }
      ]
    }
  ]
}
```

### Step 2: Resolve Workspace

```markdown
1. Call `postman_getWorkspaces` to list available workspaces
2. If workspace ID known, use it directly
3. If unknown, ask user: "Which Postman workspace should this collection be created in?"
4. Use question tool with workspace list as options
```

### Step 3: Check Existing Collection

```markdown
1. Call `postman_getCollections(workspace)` to list collections
2. Search for collection by name match
3. If found: Ask user to merge/update or create new:
   - "Collection 'X' already exists. Update it or create a new one?"
   - Options: Update existing, Create new with suffix, Cancel
4. If not found: Create new collection
```

### Step 4: Create or Update Collection

**New Collection:**
```markdown
Call `postman_createCollection` with:
- workspace: the target workspace ID
- collection: full collection object with:
  - info: { name, schema }
  - item: array of endpoint items (can be nested in folders)
```

**Update Existing:**
```markdown
Call `postman_patchCollection` with:
- collectionId: existing collection ID
- collection: { info: { name, description }, variable: [...] }
```

### Step 5: Add Requests

For each endpoint, call `postman_createCollectionRequest`:

```markdown
Parameters:
- collectionId: the collection ID
- folderId: (optional) folder to place request in
- name: endpoint name (e.g., "List Users")
- method: GET/POST/PUT/PATCH/DELETE
- url: full URL (e.g., "{{baseUrl}}/api/users")
- headerData: array of { key, value, description }
- queryParams: array of { key, value, description, enabled }
- dataMode: raw / urlencoded / formdata / graphql
- rawModeData: raw JSON body (for POST/PUT/PATCH)
```

### Step 6: Add Response Examples

For each response variant, call `postman_createCollectionResponse`:

```markdown
Parameters:
- collectionId: the collection ID
- request: the request ID (from step 5 output)
- name: response name (e.g., "200 Success", "401 Unauthorized")
- responseCode: { code: 200, name: "OK" }
- text: response body string
- headers: array of response headers
- mime: "application/json"
```

### Step 7: Organize with Folders (Optional)

For multi-module APIs, group related endpoints:

```markdown
1. Call `postman_createCollectionFolder(collectionId, name)` for each module
2. Pass folderId when creating requests in step 5
```

## Postman MCP Tool Reference

| Tool | Purpose |
|------|---------|
| `postman_getWorkspaces` | List available workspaces |
| `postman_getCollections(workspace)` | List collections in workspace |
| `postman_getCollection(collectionId)` | Get collection details |
| `postman_createCollection(workspace, collection)` | Create new collection |
| `postman_patchCollection(collectionId, collection)` | Update collection |
| `postman_createCollectionFolder(collectionId, name)` | Create folder |
| `postman_createCollectionRequest(collectionId, ...)` | Create request |
| `postman_createCollectionResponse(collectionId, request, ...)` | Add response example |
| `postman_getCollectionContext(collectionId)` | Get collection summary |
| `postman_getRequestCodeContext(collectionId, requestId)` | Get request details for code gen |

## Security Notes

- Do NOT include real API keys or tokens in Postman collection variables
- Use Postman variables (`{{variableName}}`) for sensitive values
- Set `"disabled": true` for query parameters that should not be sent
- For auth headers, prefer Bearer token pattern with `{{token}}` variable
- Never commit Postman API key to source control

## Example Workflow

```
1. Define API contract: GET /api/users, POST /api/users
2. Ask user: "Sync to Postman?" → Yes
3. Get workspace list → user selects "My Project Workspace"
4. Check existing collections → "My API" doesn't exist
5. Create collection "My API - v1" in workspace
6. Create folder "Users" in collection
7. Create request "List Users" (GET) in folder
8. Create request "Create User" (POST) in folder
9. Add success/error response examples for each
10. Report: "Postman collection 'My API - v1' created with 2 endpoints"
```

# ChainFundMe Backend API Documentation

A multi-chain blockchain-based crowdfunding platform backend built with Node.js, Express, MongoDB, and TypeScript. This API supports campaign creation across multiple blockchain networks, funding, comments, and user management with Privy authentication.

## Table of Contents

- [Setup](#setup)
- [Authentication](#authentication)
- [Supported Blockchain Networks](#supported-blockchain-networks)
- [API Base URL](#api-base-url)
- [Campaign Routes](#campaign-routes)
- [Comment Routes](#comment-routes)
- [Funder Routes](#funder-routes)
- [User Routes](#user-routes)
- [Error Handling](#error-handling)

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB
- Redis
- Privy account for authentication

### Installation

```bash
npm install
# or
pnpm install
```

### Environment Variables

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
```

### Running the Application

```bash
# Development
npm run dev

# Production
npm run build && npm start
```

## Authentication

This API uses **Privy authentication** with JWT tokens. Protected routes require a Bearer token in the Authorization header.

### Authentication Header Format

```
Authorization: Bearer <your_jwt_token>
```

Routes marked with 🔒 require authentication.

## Supported Blockchain Networks

ChainFundMe supports campaign creation and funding across multiple blockchain networks:

### **Production Networks:**
- **Base Mainnet** (Chain ID: 8453)
  - Native Token: ETH
  - Supported Tokens: USDC, CNGN, Frenchie, ENB, BHUSKY
  
- **BSC Mainnet** (Chain ID: 56) 
  - Native Token: BNB
  - Supported Tokens: USDT

### **Test Networks:**
- **Base Sepolia** (Chain ID: 84532)
  - Native Token: ETH  
  - Supported Tokens: USDC, Frenchie
  
- **BSC Testnet** (Chain ID: 97)
  - Native Token: BNB
  - Supported Tokens: USDT

### **Multi-Chain Campaign Features:**
- Campaigns can be created on any supported network
- Each campaign supports multiple tokens native to its blockchain
- Cross-chain funding is handled per network's native tokens
- Token pricing is automatically converted to USD for consistent campaign tracking

---

## API Base URL

All API endpoints are prefixed with `/api/v1`

Local Base URL: `http://localhost:3000/api/v1`
Live Base URL staging: `https://api-stage.chainfundme.com/api/v1`

---

## Campaign Routes

### 1. Create Campaign 🔒

**POST** `/api/v1/campaign/create`

Creates a new campaign with images upload.

**Authentication:** Required  
**Content-Type:** multipart/form-data

**Request Body:**

- `title` (string, required): Campaign title
- `description` (string, required): Campaign description
- `category` (string, required): Campaign category
- `targetAmount` (string, required): Target funding amount
- `startDate` (string, required): Campaign start date (ISO format)
- `endDate` (string, required): Campaign end date (ISO format)
- `chain` (number, required): Blockchain network ID
- `creator` (string, required): Creator type e.g Individual, Organization
- `campaignImages` (files, required): Campaign images (multipart upload)

**Example Request:**

```javascript
const formData = new FormData();
formData.append("title", "Save the Ocean Campaign");
formData.append(
  "description",
  "Help us clean the oceans and protect marine life"
);
formData.append("category", "Environmental");
formData.append("targetAmount", "10000");
formData.append("startDate", "2024-01-15T00:00:00Z");
formData.append("endDate", "2024-03-15T23:59:59Z");
formData.append("creator", "organization");
formData.append("campaignImages", displayImageFile);
formData.append("campaignImages", coverImageFile);

fetch("/api/v1/campaign/create", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
  body: formData,
});
```

---

### 2. Get All Campaigns

**GET** `/api/v1/campaign/`

Retrieves all published campaigns with pagination.

**Authentication:** Not required  
**Query Parameters:**

- `page` (optional, number): Page number for pagination

**Example Request:**

```javascript
// Get first page
fetch("/api/v1/campaign/");

// Get specific page
fetch("/api/v1/campaign/?page=2");
```

**Example Response:**

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Campaigns successfully fetched",
  "data": {
    "campaignData": [
      {
        "_id": "campaign_id",
        "cmid": "unique_campaign_id",
        "title": "Save the Ocean Campaign",
        "description": "Help us clean the oceans",
        "category": "Environmental",
        "targetAmount": "10000",
        "currentAmount": 2500,
        "image": "https://...",
        "coverImage": "https://...",
        "owner": {
          "_id": "user_id",
          "name": "John Doe",
          "walletAddress": "0x1234..."
        },
        "chain": {
          "networkId": 8453,
          "name": "Base"
        },
        "published": true,
        "createdAt": "2024-01-15T00:00:00Z"
      }
    ],
    "noHits": 1
  }
}
```

---

### 3. Get Single Campaign

**GET** `/api/v1/campaign/:campaignId`

Retrieves a specific campaign by ID with comments, tokens, and chain information.

**Authentication:** Not required  
**Parameters:**

- `campaignId` (string, required): Campaign unique ID (cmid)

**Example Request:**

```javascript
fetch("/api/v1/campaign/cm_xyz123");
```

**Example Response:**

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "fetched campaign-cm_xyz123 successfully",
  "data": {
    "_id": "campaign_id",
    "cmid": "cm_xyz123",
    "title": "Save the Ocean Campaign",
    "description": "Detailed campaign description",
    "targetAmount": "10000",
    "currentAmount": 2500,
    "comments": [
      {
        "_id": "comment_id",
        "comment": "Great initiative!",
        "likes": 5,
        "user": {
          "_id": "user_id",
          "name": "Jane Smith"
        },
        "replies": []
      }
    ],
    "tokens": [
      {
        "_id": "token_id",
        "address": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        "name": "USDC(base)",
        "symbol": "USDC",
        "decimals": 6
      }
    ],
    "chain": {
      "networkId": 8453,
      "name": "Base"
    },
    "owner": {
      "_id": "user_id",
      "name": "John Doe"
    }
  }
}
```

---

### 4. Publish Campaign 🔒

**POST** `/api/v1/campaign/publish/:campaignId`

Publishes a campaign and deploys it to the blockchain.

**Authentication:** Required  
**Parameters:**

- `campaignId` (string, required): Campaign unique ID (cmid)

**Example Request:**

```javascript
fetch("/api/v1/campaign/publish/cm_xyz123", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
});
```

---

## Comment Routes

All comment routes are prefixed with `/api/v1/campaign/comments`

### 1. Add Comment 🔒

**POST** `/api/v1/campaign/comments/create`

Adds a comment to a campaign.

**Authentication:** Required  
**Content-Type:** application/json

**Request Body:**

- `campaignId` (string, required): Campaign unique ID
- `comment` (string, required): Comment content

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/create", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    campaignId: "cm_xyz123",
    comment: "This is an amazing project! I support this cause.",
  }),
});
```

---

### 2. Get Comments

**GET** `/api/v1/campaign/comments/:campaignId`

Retrieves all comments for a specific campaign.

**Authentication:** Not required  
**Parameters:**

- `campaignId` (string, required): Campaign unique ID

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/cm_xyz123");
```

---

### 3. Edit Comment 🔒

**POST** `/api/v1/campaign/comments/edit/:commentId`

Edits a comment (only by the comment author).

**Authentication:** Required  
**Parameters:**

- `commentId` (string, required): Comment ID

**Request Body:**

- `comment` (string, required): Updated comment content

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/edit/comment_id_123", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    comment: "Updated comment content",
  }),
});
```

---

### 4. Delete Comment 🔒

**DELETE** `/api/v1/campaign/comments/delete/:commentId`

Deletes a comment (only by the comment author).

**Authentication:** Required  
**Parameters:**

- `commentId` (string, required): Comment ID

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/delete/comment_id_123", {
  method: "DELETE",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
});
```

---

### 5. Like Comment 🔒

**PUT** `/api/v1/campaign/comments/like/:commentId`

Likes a comment.

**Authentication:** Required  
**Parameters:**

- `commentId` (string, required): Comment ID

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/like/comment_id_123", {
  method: "PUT",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
});
```

---

### 6. Reply to Comment 🔒

**POST** `/api/v1/campaign/comments/reply/:commentId`

Adds a reply to a comment.

**Authentication:** Required  
**Parameters:**

- `commentId` (string, required): Comment ID to reply to

**Request Body:**

- `reply` (string, required): Reply content

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/reply/comment_id_123", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    reply: "Thank you for your support!",
  }),
});
```

---

### 7. Like Reply 🔒

**PUT** `/api/v1/campaign/comments/reply/like/:replyId`

Likes a comment reply.

**Authentication:** Required  
**Parameters:**

- `replyId` (string, required): Reply ID

**Example Request:**

```javascript
fetch("/api/v1/campaign/comments/reply/like/reply_id_123", {
  method: "PUT",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
});
```

---

## User Routes

All user routes are prefixed with `/api/v1/user`

### 1. Update Profile 🔒

**POST** `/api/v1/user/profile`

Updates user profile information.

**Authentication:** Required  
**Content-Type:** application/json

**Request Body:**

- `name` (string, optional): User's name
- `bio` (string, optional): User's bio
- `email` (string, optional): User's email
- `socialLinks` (object, optional): User's social links
- `profileImage` (file, optional): User's profile image

**Example Request:**

```javascript
const formData = new FormData();
formData.set("name", name);
formData.set("bio", bio);
formData.set("email", email);
formData.set("socialLinks", JSON.stringify(socialLinks));
formData.set("profileImage", profileImageFile);

fetch("/api/v1/user/profile", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  body: formData,
});
```

---

### 2. Get Profile 🔒

**GET** `/api/v1/user/profile`

Retrieves user profile with created campaigns and funding history.

**Authentication:** Required

**Example Request:**

```javascript
fetch("/api/v1/user/profile", {
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
  },
});
```

**Example Response:**

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Successfully fetched profile",
  "data": {
    "_id": "user_id",
    "privyId": "privy_user_id",
    "walletAddress": "0x1234...",
    "email": "user@example.com",
    "name": "John Doe",
    "bio": "Blockchain enthusiast",
    "followers": 150,
    "createdCampaigns": [
      // Campaign objects with populated data
    ],
    "fundingHistory": [
      // Funding transaction objects
    ]
  }
}
```

---

### 3. Follow User 🔒

**POST** `/api/v1/user/follow`

Follows another user.

**Authentication:** Required  
**Content-Type:** application/json

**Request Body:**

- `userId` (string, required): ID of user to follow

**Example Request:**

```javascript
fetch("/api/v1/user/follow", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_JWT_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: "user_id_to_follow",
  }),
});
```

---

## Error Handling

The API uses standardized error responses with appropriate HTTP status codes:

### Error Response Format

```json
{
  "status": "Error",
  "statusCode": 400,
  "message": "Error description"
}
```

### Common Error Codes

- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Authentication Errors

- Missing Authorization header
- Invalid Bearer token format
- Expired or invalid JWT token
- User not found in Privy

### Validation Errors

- Missing required fields
- Invalid data types
- Invalid date formats
- Unsupported token addresses
- Unsupported blockchain networks

---

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis
- **Authentication**: Privy
- **File Upload**: AWS S3 + Multer
- **Image Storage**: Pinata IPFS
- **Blockchain**: Viem for Web3 interactions
- **Validation**: Yup schema validation

---

## Development

### Project Structure

```
├── app.ts                    # Main application entry point
├── addChain.ts              # Script to populate supported blockchain networks
├── addToken.ts              # Script to populate supported tokens per network
├── ecosystem.config.js      # PM2 configuration for production deployment
├── routes/                  # API route definitions
│   ├── campaign.route.ts
│   ├── comment.route.ts 
│   ├── funder.route.ts
│   └── user.route.ts
├── controllers/             # Route handlers
│   ├── campaign.controller.ts
│   ├── comments.controller.ts
│   ├── funder.controller.ts
│   ├── replyComment.controller.ts
│   ├── user.controller.ts
│   └── utill.ts
├── models/                  # MongoDB schemas
│   ├── Campaign.ts          # Multi-chain campaign model
│   ├── Chain.ts             # Supported blockchain networks
│   ├── Token.ts             # Network-specific token configurations
│   └── User.ts
├── middleware/              # Custom middleware
│   ├── auth.ts              # Privy authentication middleware
│   ├── error-handler.ts     # Global error handling
│   └── not-found.ts         # 404 handler
├── db/                      # Database connection
│   └── connectDb.ts
├── errors/                  # Custom error classes
├── types/                   # TypeScript type definitions
└── .github/workflows/       # CI/CD deployment workflows
    ├── deploy-prod.yml      # Production deployment
    └── deploy-stage.yml     # Staging deployment
```

### Available Scripts

- `npm run dev` or `pnpm dev` - Start development server with hot reload (using tsx)
- `npm run build` or `pnpm build` - Build TypeScript to JavaScript
- `npm start` or `pnpm start` - Build and start production server
- `npm run clean` or `pnpm clean` - Remove build artifacts

### Database Setup Scripts

- `node addChain.js` - Populate database with supported blockchain networks
- `node addToken.js` - Populate database with supported tokens per network

### Deployment

The application uses automated CI/CD deployment with GitHub Actions:

#### **Staging Deployment:**
- **Branch:** `stage`
- **URL:** `https://api-stage.chainfundme.com`
- **Process:** Automated deployment on push to stage branch
- **PM2 App:** `chainfundme-stage`

#### **Production Deployment:**  
- **Branch:** `main` (or `prod`)
- **Process:** Automated deployment via GitHub Actions
- **PM2 App:** `chainfundme-prod` (cluster mode with 2 instances)

#### **Manual Deployment:**
```bash
# Install dependencies
pnpm install

# Build the application  
pnpm build

# Start with PM2
pm2 start ecosystem.config.js --only chainfundme-prod
# or for staging
pm2 start ecosystem.config.js --only chainfundme-stage
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - see LICENSE file for details.

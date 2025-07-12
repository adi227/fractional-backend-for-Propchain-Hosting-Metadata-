# fractional-backend-for-Propchain-Hosting-Metadata-

Certainly. Here's a professional, symbol-free version of the `README.md` suitable for a GitHub repository or documentation portal:

---

# Fractional Real Estate Metadata API

This repository contains an Express.js backend service that provides dynamic metadata for an ERC1155-based fractional real estate platform. The metadata supports integration with NFT marketplaces, wallet interfaces, and custom dApps.

## Purpose

The backend serves token-specific metadata including property name, image, price per share, and dynamic ETH yield rate. This enables the smart contract to deliver real-time NFT metadata through the `uri()` function.

## Folder Structure

```
fractional-backend/
├── index.js           Main Express server file
├── package.json       Project dependencies and configuration
└── node_modules/      Installed packages
```

## Features

* Provides a REST endpoint `/property/:id/metadata` for dynamic token metadata
* Simulates periodic yield rate updates every 12 hours using `node-cron`
* Compatible with ERC1155 smart contracts using dynamic URI resolution
* Returns OpenSea-compliant metadata format

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/yourusername/fractional-backend.git
cd fractional-backend
npm install
```

## Local Development Usage

To start the server locally:

```
node index.js
```

Once running, metadata can be accessed at:

```
http://localhost:3000/property/101/metadata
```

## Deployment Instructions

### Push to GitHub

Ensure your GitHub repository includes:

* `index.js`
* `package.json`

### Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Use the following deployment settings:

| Setting       | Value         |
| ------------- | ------------- |
| Environment   | Node          |
| Build Command | npm install   |
| Start Command | node index.js |

Once deployed, the server will be publicly accessible at:

```
https://your-app-name.onrender.com/property/101/metadata
```

## Sample Metadata Response

```json
{
  "name": "Palm Beach Villa",
  "description": "Fractional ownership of Palm Beach Villa. Earn real ETH yield.",
  "image": "https://yourcdn.com/images/palm-villa.png",
  "attributes": [
    { "trait_type": "Property ID", "value": 101 },
    { "trait_type": "Price Per Share (ETH)", "value": 0.05 },
    { "trait_type": "Yield Rate (ETH/day/share)", "value": 0.0001 },
    { "display_type": "date", "trait_type": "Last Updated", "value": 1720812345 }
  ]
}
```

## Smart Contract Integration

In the ERC1155 smart contract, update the `uri()` function to dynamically point to this metadata API:

```solidity
function uri(uint256 tokenId) public view override returns (string memory) {
    return string(
        abi.encodePacked(
            "https://your-app-name.onrender.com/property/",
            Strings.toString(tokenId),
            "/metadata"
        )
    );
}
```

## Author

This backend service is part of the Fractional Real Estate dApp ecosystem and supports real-time NFT metadata integration.



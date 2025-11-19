Space Galaxy NFT – ERC-721 Smart Contract

A complete, production-ready NFT (ERC-721) smart contract developed using Solidity 0.8.20, Remix IDE, and MetaMask.
This project demonstrates the full workflow of building, deploying, and testing an NFT collection on an EVM network.

🚀 Features

ERC-721 NFT collection (Space Galaxy NFT)

Secure minting function

Base URI configuration (IPFS or any storage)

Owner-only permissions

Gas optimization enabled

Sepolia Testnet deployment ready

Frontend minting page included (HTML + CSS + JS)

📂 Folder Structure
space-galaxy-nft/
 ├─ contract/               → NFT Solidity contract (SpaceGalaxyNFT.sol)
 ├─ frontend/               → Simple minting UI (HTML/CSS/JS)
 ├─ documentation/          → Project documentation + README
 └─ screenshots/            → Proof of Remix testing

🧰 Requirements

MetaMask wallet

Remix IDE (https://remix.ethereum.org
)

Basic knowledge of Ethereum networks

Web server (optional for production frontend)

⚙️ Smart Contract Deployment Guide

Open Remix at https://remix.ethereum.org

Create and paste the contract file:
contract/SpaceGalaxyNFT.sol

Select Solidity Compiler 0.8.20

Click Compile SpaceGalaxyNFT.sol

Open Deploy & Run

Choose: Injected Provider – MetaMask

Select your network (Sepolia Testnet recommended)

Set constructor parameter baseTokenURI

Click Deploy

Copy the contract address

🌐 Frontend Setup (Mint Page)

Open frontend/app.js

Replace the contract address:

const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";


Open frontend/index.html in a browser with MetaMask installed

Click "Connect Wallet"

Click "Mint Now" to mint NFTs

🛠️ Customization Options

Change collection name inside contract (Space Galaxy NFT, SGNFT)

Update styles in style.css

Edit texts in index.html

Modify contract parameters:

MAX_SUPPLY

mintPrice

maxPerWallet

🔒 License

This project is sold as a starter template.
Buyer can use it in personal or commercial projects.

👨‍💻 Author

Freelance Blockchain Developer
Solidity • Web3 • Smart Contracts

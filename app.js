// استبدل هذا بعنوان عقدك بعد النشر
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS";

const CONTRACT_ABI = [
  {
    "inputs":[{"internalType":"string","name":"_baseTokenURI","type":"string"}],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"MAX_SUPPLY",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"maxPerWallet",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"mintIsActive",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"mintPrice",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],
    "name":"mint",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"totalSupply",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider, signer, contract, currentAccount = null;
let mintAmount = 1;

const connectButton = document.getElementById("connectButton");
const mintButton = document.getElementById("mintButton");
const walletAddressEl = document.getElementById("walletAddress");
const totalSupplyEl = document.getElementById("totalSupply");
const maxSupplyEl = document.getElementById("maxSupply");
const maxSupply2El = document.getElementById("maxSupply2");
const mintPriceEl = document.getElementById("mintPrice");
const maxPerWalletEl = document.getElementById("maxPerWallet");
const mintStatusEl = document.getElementById("mintStatus");
const mintAmountEl = document.getElementById("mintAmount");
const totalPriceEl = document.getElementById("totalPrice");
const messageEl = document.getElementById("message");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");

function setMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? "#ff7c7c" : "#a6ffb4";
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

async function initContract() {
  if (!window.ethereum) {
    setMessage("Please install MetaMask.", true);
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    currentAccount = accounts[0];
    walletAddressEl.textContent = shortenAddress(currentAccount);
    connectButton.textContent = "Connected";
    await initContract();
    await refreshInfo();
  } catch (err) {
    setMessage("Connection failed.", true);
  }
}

async function refreshInfo() {
  if (!contract) return;
  try {
    const [supply, maxSupply, price, maxPerWallet, isActive] = await Promise.all([
      contract.totalSupply(),
      contract.MAX_SUPPLY(),
      contract.mintPrice(),
      contract.maxPerWallet(),
      contract.mintIsActive()
    ]);

    totalSupplyEl.textContent = supply.toString();
    maxSupplyEl.textContent = maxSupply.toString();
    maxSupply2El.textContent = maxSupply.toString();
    mintPriceEl.textContent = ethers.utils.formatEther(price);
    maxPerWalletEl.textContent = maxPerWallet.toString();
    mintStatusEl.textContent = isActive ? "Live" : "Paused";

    updateTotalPrice(price);
  } catch {
    setMessage("Error loading contract data.", true);
  }
}

function updateTotalPrice(pricePerNft) {
  const total = Number(ethers.utils.formatEther(pricePerNft)) * mintAmount;
  totalPriceEl.textContent = total.toString();
}

plusBtn.addEventListener("click", () => {
  if (mintAmount < 10) {
    mintAmount++;
    mintAmountEl.textContent = mintAmount;
    refreshInfo();
  }
});

minusBtn.addEventListener("click", () => {
  if (mintAmount > 1) {
    mintAmount--;
    mintAmountEl.textContent = mintAmount;
    refreshInfo();
  }
});

async function mintNft() {
  try {
    const price = await contract.mintPrice();
    const totalCost = price.mul(mintAmount);
    const tx = await contract.mint(mintAmount, { value: totalCost });
    await tx.wait();
    setMessage("Mint successful! 🚀");
    refreshInfo();
  } catch (err) {
    setMessage("Mint failed.", true);
  }
}

connectButton.addEventListener("click", connectWallet);
mintButton.addEventListener("click", mintNft);

window.addEventListener("load", async () => {
  if (window.ethereum) {
    await initContract();
    refreshInfo();
  }
});

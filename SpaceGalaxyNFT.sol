// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SpaceGalaxyNFT is ERC721Enumerable, Ownable {
    uint256 public constant MAX_SUPPLY = 5555;
    uint256 public mintPrice = 0.01 ether;
    uint256 public maxPerWallet = 5;

    string private baseTokenURI;
    bool public mintIsActive = false;

    mapping(address => uint256) public walletMints;

    constructor(string memory _baseTokenURI) ERC721("Space Galaxy NFT", "SGNFT") {
        baseTokenURI = _baseTokenURI;
    }

    function setMintActive(bool _state) external onlyOwner {
        mintIsActive = _state;
    }

    function setMintPrice(uint256 _price) external onlyOwner {
        mintPrice = _price;
    }

    function setMaxPerWallet(uint256 _max) external onlyOwner {
        maxPerWallet = _max;
    }

    function setBaseURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mint(uint256 _amount) external payable {
        require(mintIsActive, "Mint not active");
        require(_amount > 0, "Amount = 0");
        require(totalSupply() + _amount <= MAX_SUPPLY, "Max supply reached");
        require(
            walletMints[msg.sender] + _amount <= maxPerWallet,
            "Max per wallet reached"
        );
        require(msg.value >= mintPrice * _amount, "Not enough ETH");

        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(msg.sender, tokenId);
        }

        walletMints[msg.sender] += _amount;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}

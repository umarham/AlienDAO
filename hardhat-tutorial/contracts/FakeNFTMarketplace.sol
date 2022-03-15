// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FakeNFTMarketplace {
    //@dev maintain a mapping of Fake TokenID to Owner addresses
    mapping(uint256 => address) public tokens;
    // Set the purchase price for each Fake NFT
    uint256 nftPrice = 0.1 ether;

    function purchase(uint256 _tokenId) external payable {
        require(msg.value == nftPrice, "This Nft costs 0.1 ether");
        tokens[_tokenId] = msg.sender;
    }

    function getPrice() external view returns (uint256) {
        return nftPrice;
    }

    //checks whether the given tokenId has already been sold or not
    function available(uint256 _tokenId) external view returns (bool) {
        if (tokens[_tokenId] == address(0)) {
            return true;
        }
        return false;
    }


}
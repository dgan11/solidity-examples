// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Add an interface to move 721 from someones wallet to someone elses
interface IERC721 {
  function transferFrom(address _from, address _to, uint256 _tokenId) external;
}

contract Escrow {
    address public nftAddress;
    uint256 public nftID;
		address payable seller;
		address payable buyer;

    constructor(address _nftAddress, uint256 _nftID, address payable _seller, address payable _buyer) {
			nftAddress = _nftAddress;
			nftID = _nftID;
			seller = _seller;
			buyer = _buyer;
		}

    // Transfer Ownership of property from one wallet to another
    function finalizeSale() public {
			IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }

}

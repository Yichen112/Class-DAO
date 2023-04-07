// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//Voting token created with the following features:
//Can keep track on the individual votes for a governance on-chain as well as giving to power to delegate a vote to a trusted third-party
//Ability for the holders of the tokens to burn/destroy them
//Specific accounts can be granted the ability to emit new tokens, such that our ERC721 token is mintable
//Besides, token with a flexible access control where each action within the DAO requires a separate role, which can be granted to several authorized accounts


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";

contract VotingToken is ERC721, ERC721Burnable, AccessControl, EIP712, ERC721Votes {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("Dauphine DAO", "DTK") EIP712("Dauphine DAO", "1") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

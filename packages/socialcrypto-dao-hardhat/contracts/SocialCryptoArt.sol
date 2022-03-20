//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import {ERC721M} from "./ERC721M/ERC721M.sol";
import "./@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./@rarible/royalties/contracts/LibPart.sol";
import "./@rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

contract SocialCryptoArt is ERC721M, RoyaltiesV2Impl, Ownable {
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    // using Counters for Counters.Counter;
    // Counters.Counter private tokenIds;

    ////////////////////////////////////////////////////////////////
    //                         STORAGE                            //
    ////////////////////////////////////////////////////////////////

    uint256 public constant PRICE = 0.02 ether;
    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant MAX_TX = 10;
    address marketplaceContractAddress;
    string public baseURI;

    ////////////////////////////////////////////////////////////////
    //                       CONSTRUCTOR                          //
    ////////////////////////////////////////////////////////////////
    constructor(address _marketplaceContractAddress)
        payable
        ERC721M("SocialCryptoArt", "SCA")
    {
        marketplaceContractAddress = _marketplaceContractAddress;
    }

    ////////////////////////////////////////////////////////////////
    //                           USER                             //
    ////////////////////////////////////////////////////////////////

    function createSocialToken(string memory _baseURI, uint256 amount)
        external
        payable
        returns (uint256)
    {
        require(msg.sender == tx.origin, "No contracts allowed");
        // tokenIds.increment();
        // uint256 newItemId = tokenIds.current();

        uint256 _totalSupply = totalSupply();
        require(msg.value >= PRICE * amount, "insufficient ether amount");
        require(amount <= MAX_TX, "Amount exceeds tx limit");

        baseURI = _baseURI;
        //_setTokenURI(newItemId, tokenURI);
        setApprovalForAll(marketplaceContractAddress, true);
        // return newItemId;
        _mint(msg.sender, amount);
    }

    ////////////////////////////////////////////////////////////////
    //                    SOLIDITY OVERRIDES                      //
    ////////////////////////////////////////////////////////////////

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), "NONEXISTENT_TOKEN");
        string memory _baseURI = baseURI;
        return
            bytes(_baseURI).length == 0
                ? ""
                : string(abi.encodePacked(_baseURI, toString(id)));
    }

    ////////////////////////////////////////////////////////////////
    //                           UTILS                            //
    ////////////////////////////////////////////////////////////////
    function _transferETH(address to, uint256 value) internal {
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, ) = to.call{value: value}("");
        require(success, "ETH transfer failed");
    }

    // @dev royalties functions
    function setRoyalties(
        uint256 _tokenId,
        address payable _royaltiesRecipientAddress,
        uint96 _percentageBasisPoints
    ) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if (_royalties.length > 0) {
            return (
                _royalties[0].account,
                (_salePrice * _royalties[0].value) / 10000
            );
        }
        return (address(0), 0);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        pure
        virtual
        override
        returns (bool)
    {
        if (interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }

        if (interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }

        return super.supportsInterface(interfaceId);
    }
}

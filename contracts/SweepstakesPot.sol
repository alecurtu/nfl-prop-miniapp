// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title SweepstakesPot
/// @notice Collects USDC entries for a contest and allows owner to settle & distribute equally among winners.
contract SweepstakesPot is Ownable {
    IERC20 public immutable usdc;
    uint256 public constant ENTRY_AMOUNT = 1e6; // 1 USDC (6 decimals)

    struct Entry {
        address user;
        bytes32 answersHash;
    }

    mapping(bytes32 => Entry[]) public entries; // contestId => entries

    event Entered(bytes32 indexed contestId, address indexed user, bytes32 answersHash);
    event Settled(bytes32 indexed contestId, uint256 winners, uint256 paidPerWinner);

    constructor(address _usdc, address _owner) Ownable(_owner) {
        usdc = IERC20(_usdc);
    }

    function enter(bytes32 contestId, bytes32 answersHash) external {
        require(usdc.transferFrom(msg.sender, address(this), ENTRY_AMOUNT), "transfer failed");
        entries[contestId].push(Entry({ user: msg.sender, answersHash: answersHash }));
        emit Entered(contestId, msg.sender, answersHash);
    }

    function settle(bytes32 contestId, address[] calldata winners) external onlyOwner {
        require(winners.length > 0, "no winners");
        uint256 balance = usdc.balanceOf(address(this));
        uint256 per = balance / winners.length;
        require(per > 0, "amount too small");

        for (uint256 i = 0; i < winners.length; i++) {
            require(usdc.transfer(winners[i], per), "payout failed");
        }
        emit Settled(contestId, winners.length, per);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@selfxyz/contracts/contracts/abstract/SelfVerificationRoot.sol";
import "@selfxyz/contracts/contracts/interfaces/ISelfVerificationRoot.sol";
import "@selfxyz/contracts/contracts/libraries/SelfStructs.sol";
import "@selfxyz/contracts/contracts/libraries/SelfUtils.sol";
import "@selfxyz/contracts/contracts/interfaces/IIdentityVerificationHubV2.sol";

/**
 * @title AgeGateRegistry
 * @notice Universal age verification registry using Self Protocol
 * @dev @zambrose - ETHGlobal Buenos Aires 2025
 *
 */
contract AgeGateRegistry is SelfVerificationRoot {

    // Verification config IDs for different age requirements
    bytes32 public config18Plus;
    bytes32 public config21Plus;

    // User verification data - maps address to verified age threshold
    mapping(address => uint256) public userMinAge;
    mapping(address => uint256) public verificationTimestamp;

    event UserVerified(address indexed user, uint256 minAge, uint256 timestamp);

    /**
     * @notice Constructor deploys contract and registers verification configs
     * @param hubV2 Self Protocol Identity Verification Hub address
     * @param scopeSeed Unique identifier for this app's verification scope
     *
     * The scope creates an isolated verification namespace - users' nullifiers
     * (verification IDs) are unique per scope, preventing cross-app tracking.
     */
    constructor(
        address hubV2,
        string memory scopeSeed
    ) SelfVerificationRoot(hubV2, scopeSeed) {
        string[] memory noCountries = new string[](0);

        // Register 18+ verification config with Self Protocol Hub
        SelfUtils.UnformattedVerificationConfigV2 memory config18 =
            SelfUtils.UnformattedVerificationConfigV2({
                olderThan: 18,
                forbiddenCountries: noCountries,
                ofacEnabled: false
            });

        SelfStructs.VerificationConfigV2 memory formatted18 =
            SelfUtils.formatVerificationConfigV2(config18);
        config18Plus = IIdentityVerificationHubV2(hubV2).setVerificationConfigV2(formatted18);

        // Register 21+ verification config with Self Protocol Hub
        SelfUtils.UnformattedVerificationConfigV2 memory config21 =
            SelfUtils.UnformattedVerificationConfigV2({
                olderThan: 21,
                forbiddenCountries: noCountries,
                ofacEnabled: false
            });

        SelfStructs.VerificationConfigV2 memory formatted21 =
            SelfUtils.formatVerificationConfigV2(config21);
        config21Plus = IIdentityVerificationHubV2(hubV2).setVerificationConfigV2(formatted21);
    }

    /**
     * @notice Return appropriate config ID based on user's required age
     * @dev Called by Self Protocol Hub to determine which verification rules to apply
     *
     * The user passes their required age (18 or 21) as userData when generating
     * their QR code. This function decodes that and returns the matching config.
     */
    function getConfigId(
        bytes32,
        bytes32,
        bytes memory userDefinedData
    ) public view override returns (bytes32) {
        uint256 minAge = abi.decode(userDefinedData, (uint256));
        return minAge >= 21 ? config21Plus : config18Plus;
    }

    /**
     * @notice Handle successful verification callback from Self Protocol Hub
     * @dev This is called automatically after the ZK proof is verified
     *
     * At this point, Self Protocol has cryptographically verified that:
     * 1. User has a valid passport
     * 2. User meets the age requirement
     * 3. User is not on OFAC sanctions list (if enabled)
     *
     * We store the verified age threshold and timestamp for future reference.
     */
    function customVerificationHook(
        ISelfVerificationRoot.GenericDiscloseOutputV2 memory output,
        bytes memory userData
    ) internal override {
        // Convert userIdentifier (uint256) to address - the Hub contract passes
        // the user's address encoded as uint256 in the output struct
        address user = address(uint160(output.userIdentifier));
        uint256 minAge = abi.decode(userData, (uint256));

        userMinAge[user] = minAge;
        verificationTimestamp[user] = block.timestamp;

        emit UserVerified(user, minAge, block.timestamp);
    }

    /**
     * @notice Check if user is verified for a given age requirement
     * @param user Address to check
     * @param requiredAge Minimum age requirement (18 or 21)
     * @return bool True if user has verified for at least this age
     *
     * This is what other contracts or frontends call to gate access.
     */
    function isVerified(address user, uint256 requiredAge) external view returns (bool) {
        return userMinAge[user] >= requiredAge;
    }

    /**
     * @notice Get complete verification details for a user
     * @param user Address to query
     * @return minAge The minimum age threshold user verified for
     * @return timestamp When verification occurred (Unix timestamp)
     * @return verified Whether user has any verification on record
     */
    function getVerificationDetails(address user) external view returns (
        uint256 minAge,
        uint256 timestamp,
        bool verified
    ) {
        minAge = userMinAge[user];
        timestamp = verificationTimestamp[user];
        verified = minAge > 0;
    }
}

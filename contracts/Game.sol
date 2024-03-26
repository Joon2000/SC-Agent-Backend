// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface DataBase {
    enum CharacterType {
        Baby, //0
        Teenager, //1
        Elderly //2
    }

    function getCharacter(
        uint _index
    ) external view returns (uint, uint, CharacterType);

    function updateCharacter(
        uint _index,
        uint health,
        uint attackPower
    ) external;
}

contract Game {
    address dataBaseAddress = 0xF46fD9b50Fb39499e199a897f0233369FF92b20c;

    DataBase dataBaseContract = DataBase(dataBaseAddress);

    struct Character {
        uint health;
        uint attackPower;
        DataBase.CharacterType characterType;
    }

    modifier attackConstraint(uint _defenderIndex) {
        Character memory defender = getCharacter(_defenderIndex);
        require(
            defender.characterType != DataBase.CharacterType.Baby,
            "Cannot attack a Baby!"
        );
        _;
    }

    function getCharacter(
        uint _index
    ) internal view returns (Character memory) {
        (
            uint _health,
            uint _attackPower,
            DataBase.CharacterType _characterType
        ) = dataBaseContract.getCharacter(_index);
        return Character(_health, _attackPower, _characterType);
    }

    function attack(
        uint _attackerIndex,
        uint _defenderIndex
    ) public attackConstraint(_defenderIndex) {
        Character memory attacker = getCharacter(_attackerIndex);
        Character memory defender = getCharacter(_defenderIndex);
        if (defender.health >= attacker.attackPower) {
            defender.health -= attacker.attackPower;
        } else {
            defender.health = 0;
        }

        dataBaseContract.updateCharacter(
            _defenderIndex,
            defender.health,
            defender.attackPower
        );
    }
}

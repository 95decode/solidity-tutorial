// SPDX-License-Identifier: None
pragma solidity 0.8.4;

interface IHelloWorld {
    function modifyText(string memory text) external returns (bool);

    function readText(address addr) external view returns (string memory);

    event ModifyText(address indexed addr, string text);
}

contract HelloWorld is IHelloWorld {
    mapping (address => string) private _text;

    constructor() {
        _text[msg.sender] = "Hello World!";

        emit ModifyText(address(msg.sender), _text[msg.sender]);
    }

    function modifyText(string memory text) external override returns (bool) {
        _text[msg.sender] = text;
        emit ModifyText(address(msg.sender), text);
        return true;
    }

    function readText(address addr) external view override returns (string memory) {
        require(bytes(_text[addr]).length > 0, "Error : empty string");

        return _text[addr];
    }
}

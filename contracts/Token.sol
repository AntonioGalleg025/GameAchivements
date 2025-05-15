// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TokenJuegos is ERC1155, Ownable {
    string public name = "GameAchievements";
    string public symbol = "GA";

    string private baseURI;

    // Mapeo para asociar IDs con nombres de logros
    mapping(uint256 => string) public achievementNames;

    // Constructor que inicializa la URI base y los logros predefinidos
    constructor(string memory _baseURI) ERC1155("") Ownable(msg.sender) {
        baseURI = _baseURI;

        // Asignación de nombres a los logros
        achievementNames[1] = "Derrota al Primer Jefe";
        achievementNames[2] = "Termina el Juego sin Morir";
        achievementNames[3] = "Juega 100 horas";
    }

    // Sobrescribe la función URI para devolver la ruta del archivo JSON con los metadatos
    function uri(uint256 _id) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_id), ".json"));
    }

    // Función para acuñar tokens de logros
    function mintAchievement(address to, uint256 id, uint256 amount) public onlyOwner {
        _mint(to, id, amount, "");
    }

    // Función para destruir tokens de logros
    function burnAchievement(address from, uint256 id, uint256 amount) public onlyOwner {
        _burn(from, id, amount);
    }
}

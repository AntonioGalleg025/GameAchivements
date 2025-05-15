# GameAchievements - Sistema de Logros en Blockchain con ERC-1155

Este proyecto tiene como objetivo la creación y despliegue de un sistema basado en **blockchain** para la emisión de logros (achievements) en formato **token ERC-1155** para juegos u otras aplicaciones. Los jugadores reciben logros como **tokens no fungibles (NFTs)** que representan hitos alcanzados en un juego.

---

## 📖 Descripción

GameAchievements implementa una solución para gestionar la emisión y visualización de logros digitales utilizando tecnología blockchain. Cada logro es un token ERC-1155 que puede ser acuñado, transferido y verificado fácilmente. La solución consta de:

- Un contrato inteligente desplegado en la red de prueba **Sepolia**.
- Una interfaz web interactiva que permite la conexión con **MetaMask** para interactuar con el contrato y mintear logros.
- Visualización del saldo de ETH en Sepolia y de los tokens obtenidos.

---

## 🚀 Características principales

- **Emisión de logros:** Los administradores pueden mintear logros (tokens ERC-1155) para los jugadores.
- **Consulta de saldos:** Los usuarios pueden consultar su saldo de ETH en Sepolia y la cantidad de tokens de cada logro que poseen.
- **Interacción con MetaMask:** La web se conecta fácilmente con MetaMask para firmar transacciones y consultar datos en blockchain.
- **Despliegue público:** La interfaz web puede ser desplegada en servicios como GitHub Pages para fácil acceso.

---

## 🛠️ Tecnologías usadas

### Frontend:
- **HTML5**, **CSS3** y **Bootstrap 5** para diseño responsivo y moderno.
- **JavaScript** con **ethers.js** para la comunicación con la blockchain.

### Blockchain:
- **Ethereum Sepolia Testnet** como red de despliegue.
- **Solidity** para desarrollo del contrato inteligente ERC-1155.
- **MetaMask** para gestión de cuentas y firma de transacciones.

### Despliegue:
- **GitHub Pages** para alojar la aplicación web de forma gratuita.

---

## 📂 Estructura del proyecto


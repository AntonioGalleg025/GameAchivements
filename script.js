const connectButton = document.getElementById('connectButton');
const userAddressDisplay = document.getElementById('userAddress');
const sepoliaBalanceDisplay = document.getElementById('sepoliaBalance');
const mintForm = document.getElementById('mintForm');
const status = document.getElementById('status');
const balanceList = document.getElementById('balance');

let signer;
let contract;

// Cambia esta dirección por la tuya (dirección de contrato desplegado)
const contractAddress = "0x43159009b15521Ae4cF9450de064ECE666d83833";

const contractABI = [
  "function mintAchievement(address to, uint256 id, uint256 amount) public",
  "function balanceOf(address account, uint256 id) public view returns (uint256)",
  "function achievementNames(uint256) public view returns (string)"
];

const tokenNames = {
  1: "Derrota al Primer Jefe",
  2: "Termina el Juego sin Morir",
  3: "Juega 100 horas"
};

connectButton.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      const userAddress = await signer.getAddress();
      userAddressDisplay.textContent = `Conectado: ${userAddress}`;

      await showSepoliaBalance();
      await showTokenBalances();
      showStatus("");
    } catch (err) {
      console.error("Error al conectar:", err);
      userAddressDisplay.textContent = '❌ Error al conectar con MetaMask';
    }
  } else {
    alert("Por favor instala MetaMask para usar esta aplicación.");
  }
});

async function showSepoliaBalance() {
  if (!signer) return;
  try {
    const balance = await signer.getBalance();
    const balanceEth = ethers.utils.formatEther(balance);
    sepoliaBalanceDisplay.textContent = `Balance Sepolia: ${balanceEth} ETH`;
  } catch (error) {
    console.error("Error al obtener balance Sepolia:", error);
    sepoliaBalanceDisplay.textContent = "Error al obtener balance Sepolia";
  }
}

mintForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contract) {
    showStatus("❌ Conecta MetaMask primero.");
    return;
  }

  const to = document.getElementById('recipient').value.trim();
  const id = parseInt(document.getElementById('tokenId').value);
  const amount = parseFloat(document.getElementById('amount').value);

  if (!Number.isInteger(amount) || amount < 1) {
    showStatus("❌ La cantidad debe ser un número entero mayor o igual a 1.");
    return;
  }

  if (!ethers.utils.isAddress(to)) {
    showStatus("❌ Dirección de destinatario no válida.");
    return;
  }

  try {
    showStatus("⏳ Enviando transacción...");
    const tx = await contract.mintAchievement(to, id, amount);
    await tx.wait();
    showStatus(`✅ Logro minteado correctamente (Tx: ${tx.hash})`, 'success');
    await showTokenBalances();
  } catch (error) {
    console.error("Error al mintear:", error);
    showStatus("❌ Error al mintear el logro. Revisa la consola.", 'error');
  }
});

async function showTokenBalances() {
  if (!contract || !signer) {
    balanceList.textContent = "Conecta MetaMask primero.";
    return;
  }

  try {
    const address = await signer.getAddress();
    console.log("Obteniendo balances para:", address);
    let balancesText = "";

    for (const id of Object.keys(tokenNames)) {
      const balance = await contract.balanceOf(address, id);
      console.log(`Balance token ID ${id}:`, balance.toString());
      balancesText += `Tienes ${balance.toString()} tokens de "${tokenNames[id]}" (ID: ${id})\n`;
    }

    balanceList.textContent = balancesText || "No tienes tokens aún.";
  } catch (err) {
    console.error('Error al obtener el balance:', err);
    balanceList.textContent = "Error al obtener el balance.";
  }
}

function showStatus(message, type = "error") {
  status.textContent = message;
  status.className = type;
}

import { Contract } from '@ethersproject/contracts';
import Web3 from "web3";





export var address = "";
 


  // export const gerUserTokenBalance = async (address) => {
  //   let response = await slrContract.methods.balanceOf(address).call();
    
  //   let weiBalance = web3.utils.fromWei(response);
    
  //   return weiBalance;
  //   };
  
    
  

export const contractAbi = [{"inputs":[{"internalType":"address","name":"_SLRV1","type":"address"},{"internalType":"address","name":"_SLRV2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Migrate","type":"event"},{"inputs":[],"name":"MigrationOFF","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"MigrationON","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SLRV1","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLRV2","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newBlance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oldBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"}]

export const contractAddress = '0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698';

export const getContract_migration = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, contractAbi, signer);
	return contract;
};

 



let slrConstant;
slrConstant = {
  contractAddress: "0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698",
  abi: [{"inputs":[{"internalType":"address","name":"_SLRV1","type":"address"},{"internalType":"address","name":"_SLRV2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Migrate","type":"event"},{"inputs":[],"name":"MigrationOFF","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"MigrationON","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"SLRV1","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLRV2","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newBlance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oldBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"payable","type":"function"}],
};

var web3 = new Web3(window.ethereum);

export var slrContract_MIGRATION = new web3.eth.Contract(
  slrConstant.abi,
  slrConstant.contractAddress
);

export default slrContract_MIGRATION;

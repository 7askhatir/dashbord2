import React, { Component, useState } from 'react'

import { getContract, slrContract, contractAddress, gerUserTokenBalance } from '../Helpers/contract';
import { getContract_migration, slrContract_MIGRATION } from '../Helpers/contract_migration';

import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletLink from 'walletlink';

import Modal from "../Modal/Modal";
import web3 from "web3";
import {dataService} from '../Helpers/storageService';


export const gerUserUSDT_PAID = async (address) => {
	let decimals = 18;
	let info = await slrContract.methods.getAccountDividendsInfo(address).call();
	if (info[2] === 0) {
		return ({
			status: "success",
			paidUSDT: info[3] / Math.pow(10, decimals),
			pendingUSDT: info[4] / Math.pow(10, decimals),
			position : info[2],
			lastPAY : new Date(info[5] * 1000).toLocaleString() 
		});
	} else {
		return ({
			status: "pending",
			paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
			pendingUSDT: info[4] / Math.pow(10, decimals),
			position : info[2],
			lastPAY : new Date(info[5] * 1000).toLocaleString() 
		});
	}

};




export const get_allowance = async (address) => {
	let decimals = 18;
	let info = await slrContract.methods.allowance(address, "0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698").call();

	return info / Math.pow(10, decimals)


};





export const getTotalPaidUSDT = async () => {


	let decimals = 18;

	let info = await slrContract.methods.getTotalDividendsDistributed().call();
	localStorage.setItem('TotalPaidUSDT',  info / Math.pow(10, decimals));


	//alert(info/ Math.pow(10, decimals))
	return info / Math.pow(10, decimals);
};



getTotalPaidUSDT();

















































const Header = () => {



	var address_local = localStorage.getItem('address');
	var balance_last = localStorage.getItem('Balance');
	var _paidUSDT = localStorage.getItem('USDT_pendings');
	var _TotalPaidUSDT = localStorage.getItem('TotalPaidUSDT');
	var _USDT_pendings_exact = localStorage.getItem('USDT_pendings_exact');

	const [list, setList] = React.useState([]);
	const [balance, setBalance] = React.useState('');


	var tokenBalance = 0;
	var USDT_paid = 0;
	var USDT_pendings = 0;
	var TotalPaidUSDT = 0;
	var allowance = 0;


	const getBalanceButton = async (address) => {
// debugger*
        
		tokenBalance = await gerUserTokenBalance(address);
		USDT_pendings = await gerUserUSDT_PAID(address);
		TotalPaidUSDT = await getTotalPaidUSDT();
		setbalance_(tokenBalance);
        dataService.setData(tokenBalance);
		setUSDT_pendings_(USDT_pendings.paidUSDT);
		setpaidUSDT_(USDT_pendings.pendingUSDT);

		setTotalPaidUSDT_(TotalPaidUSDT);
		setallowance(allowance);

		seterror(null)

		setPosition(USDT_pendings.position);
	setLastPAY(USDT_pendings.lastPAY);

	localStorage.setItem('position', USDT_pendings.position);
	localStorage.setItem('lastPAY', USDT_pendings.lastPAY);


		address_local = address;
		localStorage.setItem('Balance', tokenBalance);
		localStorage.setItem('USDT_paid', USDT_paid);
		localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
		localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
		localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
		localStorage.setItem('address', address);
		let date1 = new Date();
		localStorage.setItem('date1', date1);

	};


	const getBalance_with_walletconnect = async (address) => {

		try {
			tokenBalance = await gerUserTokenBalance(address);
			USDT_pendings = await gerUserUSDT_PAID(address);
			allowance = await get_allowance(address);
			TotalPaidUSDT = await getTotalPaidUSDT();



			//USDT_pendings  = await gerUserUSDT_PAID(address);
			setbalance_(tokenBalance);
			setUSDT_pendings_(USDT_pendings.paidUSDT);
			setpaidUSDT_(USDT_pendings.pendingUSDT);
			setallowance(allowance)

			seterror(null)
			setPosition(USDT_pendings.position);
			setLastPAY(USDT_pendings.lastPAY);
		
			localStorage.setItem('position', USDT_pendings.position);
			localStorage.setItem('lastPAY', USDT_pendings.lastPAY);

			
			address_local = address;
			localStorage.setItem('Balance', tokenBalance);
			localStorage.setItem('USDT_paid', paidUSDT_);
			localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
			localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
			localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
			localStorage.setItem('address', address);

			setShow(false);


		} catch { }


	};

	   TotalPaidUSDT =  getTotalPaidUSDT(); 
	const date1 = localStorage.getItem('date1');
	const date2 = new Date();



	function getDifferenceInMinutes(date1, date2) {
		const diffInMs = Math.abs(new Date(date2) - new Date(date1));
		// alert( diffInMs / (1000 * 60));
		return diffInMs / (1000 * 60);
	}
	var datediff = 0;
	if (date1) {
		datediff = getDifferenceInMinutes(date1, date2);
	}

	if (datediff >= 15) {
		localStorage.clear();
	}

	//modal
	const [show, setShow] = useState(false);
	const [web3Library, setWeb3Library] = React.useState();
	const [web3Account, setWeb3Account] = React.useState();
	const [balance_, setbalance_] = React.useState();
	const [error, seterror] = React.useState();
	const [allowance_, setallowance] = React.useState();
	const [USDT_pendings_, setUSDT_pendings_] = React.useState();
	const [paidUSDT_, setpaidUSDT_] = React.useState();
	const [TotalPaidUSDT_, setTotalPaidUSDT_] = React.useState();
	const [_balance_last, set_balance_last] = React.useState();
	const [walletlinkProvider, setWalletlinkProvider] = React.useState();
	const [walletConnectProvider, setWalletConnectProvider] = React.useState();

	const [ position, setPosition ] = React.useState();
	const [ lastPAY, setLastPAY ] = React.useState();

	if (balance_last) {
		// setTimeout(() => {
		//    set_balance_last(balance_last); 
		// }, 2000);
	}







	//vanilla
	const writeToContract = async () => {
		// try {
		// 	//   const randomNumber = Math.floor(Math.random() * 100);
		// 	const myContract = getContract(web3Library, web3Account);
		// 	const overrides = {
		// 		gasLimit: 48000
		// 	};


		// 	if (balance_) {
		// 		var amount = balance_
		// 	} else {
		// 		var amount = balance_last
		// 	}

		// 	// alert(amount);
		// 	var tokens = web3.utils.toWei(amount.toString(), 'ether')

		// 	const response = await myContract.approve('0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698', tokens, overrides)

		// } catch (ex) {
		// 	console.log(ex);
		// 	//  alert(ex);
		// 	seterror(ex.toString());
		// }
	};

	//Contract_MIGRATION
	const writeToContract_MIGRATION = async () => {
		// try {
		// 	//   const randomNumber = Math.floor(Math.random() * 100);
		// 	const myContract = getContract_migration(web3Library, web3Account);
		// 	const overrides = {
		// 		gasLimit: 320000
		// 	};


		// 	if (balance_) {
		// 		var amount = balance_
		// 	} else {
		// 		var amount = balance_last
		// 	}

		// 	// alert(amount);
		// 	var tokens = web3.utils.toWei(amount, 'ether')
		// 	//alert(address_local);
		// 	const response = await myContract.swap(tokens, {
		// 		from: address_local,
		// 		//   to : "0x82d383fed1b668444ba1f8e677b7e42f56fd3cbab68341f6dff0e0341e36425f",
		// 		//  value: 10,
		// 		gasPrice: 6000000000,
		// 		gasLimit: 2100000,
		// 	})
		// 		.then(res =>
		// 			console.log('Success', res))
		// 		.catch(err => console.log(err))


		// 	//const response = await myContract.Migrate(  0,tokens)

		// } catch (ex) {
		// 	console.log(ex);
		// 	alert(ex);
		// 	seterror(ex.toString());
		// }
	};







	//vanilla metamask
	const connectMetamask = async () => {
		try {
			
			if (window.ethereum) {
				try {
					// check if the chain to connect to is installed
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
					});
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const account = accounts[0];
					// console.log(account);
					// console.log(accounts);
					setWeb3Account(account);
					const library = new Web3Provider(window.ethereum, 'any');

					setWeb3Library(library);

					getBalanceButton(account);
						// setShow(false)

				} catch (error) {
					// This error code indicates that the chain has not been added to MetaMask
					// if it is not, then install it into the user MetaMask
					// console.log("-------------------------------- err")
					// console.log(error.message)
					// console.log(error.code)
					if (error.code === 4902) {
						// console.log("---------entre--------");
						const params = [
							{
								chainId: '0x38',
								chainName: 'Binance Smart Chain Mainnet',
								rpcUrls: ['https://bsc-dataseed.binance.org/'],
								nativeCurrency: {
									name: 'BNB',
									symbol: 'BNB',
									decimals: 18
								},
								blockExplorerUrls: ['https://bscscan.com']
							}
						];
						window.ethereum
							.request({ method: "wallet_addEthereumChain", params })
							.then(() => console.log("Success"))
							.catch((error) => {


								// console.log("Error", error.message)
								// console.log("Error", error.code)


							});
					}
					if (error.code === 4902) {
						try {
							await window.ethereum.request({
								method: 'wallet_addEthereumChain',
								params: [
									{
										chainId: '0x38',
										rpcUrl: 'https://bsc-dataseed.binance.org/',
									},
								],
							});
						} catch (addError) {
							console.error(addError);
						}
					}


					console.error(error);
				}
			} else {
				// if no window.ethereum then MetaMask is not installed
				alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
			}






		} catch (ex) {
			console.log(ex);
		}


	};

	//vanilla walletconnect
	const connectWaletConnect = async () => {
	//	debugger
		try {
			const RPC_URLS = {
				56: 'https://bsc-dataseed1.binance.org'
			};
			const provider = new WalletConnectProvider({
				rpc: {
					// 1: RPC_URLS[1],
					// 4: RPC_URLS[4],
					56: RPC_URLS[56]
				},
				qrcode: true,
				pollingInterval: 15000
			});
			setWalletConnectProvider(provider);
			const accounts = await provider.enable();
			const account = accounts[0];
			//debugger;
			const library = new Web3Provider(provider, 'any');


			setWeb3Library(library);
			setWeb3Account(account);



			getBalance_with_walletconnect(account);




			let date1 = new Date();
			localStorage.setItem('date1', date1);



			//alert('read balance ' + tokenBalance);



		} catch (ex) {
			console.log(ex);
			//return;
		}



		if (web3Account) {
			setShow(false)
		}
	};

	//vanilla coinbase
	const connectCoinbase = async () => {
		try {
			// Initialize WalletLink
			const walletLink = new WalletLink({
				appName: 'Salary-app',
				darkMode: true
			});

			const provider = walletLink.makeWeb3Provider(
				'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
				4
			);
			setWalletlinkProvider(provider);
			const accounts = await provider.request({
				method: 'eth_requestAccounts'
			});
			const account = accounts[0];

			const library = new Web3Provider(provider, 'any');

			console.log('library');
			console.log(library);
			setWeb3Library(library);
			setWeb3Account(account);
		} catch (ex) {
			console.log(ex);
		}
	};

	const disconnectWalletconnect = () => {
		try {
			walletConnectProvider.disconnect();
			dataService.setData(0);
			setWalletConnectProvider(null);
		} catch {
			// console.log()
		}
		localStorage.clear();
		address_local = null;

		setbalance_(0);
		setUSDT_pendings_(0);
		setpaidUSDT_(0);
		setShow(false)
		set_balance_last("0.00");
		seterror(null)
		//  window.location.reload(false);
	}

	function isMobileDevice() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	  }

	const ConnectWalletMetamask = ()=>{
		console.log(isMobileDevice());
		if (isMobileDevice()) {
			console.log("yes");
			const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
			const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
			return (
			  <a href={metamaskAppDeepLink}>
				 <button >
				   Connect to MetaMask
				 </button>
			  </a>
			);
		}}











































	return (


		<>

			<header class="topbar-nav">
                
				<nav class="navbar navbar-expand fixed-top">

					<ul class="navbar-nav mr-auto align-items-center">
						<li class="nav-item">
							<a class="nav-link toggle-menu" href="javascript:void();">
								<i class="icon-menu menu-icon"></i>
							</a>
						</li>
						

					</ul>

					  <button onClick={ConnectWalletMetamask} class="btn-primary" type="button">
					      Connect MetaMask
				      </button>





					<div class="input-group">

						<div class="right-nav-link ml-auto input-group-append">

							<a class="nav-link dropdown-toggle-nocaret position-relative" href="https://pancakeswap.finance/swap?outputCurrency=0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">
								<button class="btn btn-white " type="button">BUY $SLR 
								</button></a>


							<button onClick={() => setShow(true)} className={address_local ? 'btn  btn-success btn-connect' : 'btn  btn-dark btn-connect'} type="button">{address_local ? address_local.substring(0, 6) + '...' + address_local.substring(36, 42) : 'Connect wallet'}
							</button>



							<Modal class="bg-theme bg-theme1" title="Connect wallet" onClose={() => setShow(false)} show={show}>


								<button onClick={connectMetamask} className={address_local ? ' hide' : 'btn  btn-connect btn-modal'} type="button">   <img class="meta-icon pointer icon_connect {address_local ? 'Connected' : 'Connect wallet'}" src="assets/images/MetaMask_Fox.svg.png" width="45" /> <p class="bottom_0">Metamask</p>
								</button>
                              
								<button onClick={connectWaletConnect} className={address_local ? ' hide' : 'btn  btn-connect btn-modal'} type="button"><img class="meta-icon pointer icon_connect" src="assets/images/walletconnect.png" width="45" /> <p class="bottom_0">WalletConnect</p>
								</button>




								<button onClick={disconnectWalletconnect} className={address_local ? ' btn btn-danger btn-connect' : 'hide'} type="button">Disconnect
								</button>

							</Modal>




						</div>
					</div>






					<ul class="navbar-nav align-items-center right-nav-link">

						<li class="nav-item ">
							<a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();"><i class="fa fa-bar-chart chart-btn"></i></a>
							<ul class="dropdown-menu dropdown-menu-right">
								<li class="dropdown-item">  CHART ON POOCOIN</li>
								<li class="dropdown-item">  CHART ON DEXTOOLS</li>

							</ul>
						</li>

					</ul>


				</nav>
			</header>
		</>
	);
};
export default Header;

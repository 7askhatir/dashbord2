import React, { Component , useState } from 'react'  
 
import { getContract  , slrContract ,contractAddress , gerUserTokenBalance } from '../Helpers/contract';
import { getContract_migration  , slrContract_MIGRATION  } from '../Helpers/contract_migration';

import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletLink from 'walletlink';
 
import Modal from "../Modal/Modal";
import web3 from "web3";


export const gerUserUSDT_PAID = async (address) => {
    let decimals = 18;
	let info = await slrContract.methods.getAccountUSDTDividendsInfo(address).call();
    if (info[2] === 0) {
		return({
        status: "success",
        paidUSDT: info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
      });
    } else {
		return ({
        status: "pending",
        paidUSDT: info[3] / Math.pow(10, decimals) == info[4] / Math.pow(10, decimals) ? 0.0 : info[3] / Math.pow(10, decimals),
        pendingUSDT: info[4] / Math.pow(10, decimals),
      });
    }
 
  };




  export const get_allowance = async (address) => {
    let decimals = 18;
	let info = await slrContract.methods.allowance(address,"0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698").call();

return info/ Math.pow(10, decimals)
    
 
  };




  
  export const getTotalPaidUSDT  = async () => {
	 
 
    let decimals = 18;
  
    let info = await slrContract.methods.getTotalUSDTDividendsDistributed().call();
    


  //alert(info/ Math.pow(10, decimals))
	return info / Math.pow(10, decimals);
  };
  






  
  export default function Migration(){  
    // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  


	 
var address_local = localStorage.getItem('address');
var balance_last=  localStorage.getItem('Balance');

var _paidUSDT =  localStorage.getItem('USDT_pendings');
var _TotalPaidUSDT =  localStorage.getItem('TotalPaidUSDT');
var _USDT_pendings_exact =  localStorage.getItem('USDT_pendings_exact');

var tokenBalance= 0 ;


// setTimeout(() => {
   //set_balance_last(balance_last); 
// }, 2000);

var USDT_paid= 0 ;
var USDT_pendings= 0 ;
var TotalPaidUSDT= 0 ;
var allowance = 0;

//TotalPaidUSDT = await getTotalPaidUSDT(); 
// setTimeout(() => {
// 	  TotalPaidUSDT =  getTotalPaidUSDT(); 
	//   getBalanceButton("0xC14A2a9Bf6152640aED9525300c80931d2323d86");
//   }, 3000);
  
const getBalanceButton = async (address) => {
	// debugger
	tokenBalance = await gerUserTokenBalance(address); 
	USDT_pendings = await gerUserUSDT_PAID(address); 
	TotalPaidUSDT = await getTotalPaidUSDT(); 


	allowance = await get_allowance(address); 
 


	 
	setbalance_(tokenBalance);
  
	setUSDT_pendings_(USDT_pendings.paidUSDT);
	setpaidUSDT_(USDT_pendings.pendingUSDT );
	
setTotalPaidUSDT_(TotalPaidUSDT);
setallowance(allowance);
 
seterror(null)


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
	
	try{ 
	tokenBalance = await gerUserTokenBalance(address);
	USDT_pendings = await gerUserUSDT_PAID(address); 


	allowance = await get_allowance(address); 




	//USDT_pendings  = await gerUserUSDT_PAID(address);
	setbalance_(tokenBalance);
	setUSDT_pendings_(USDT_pendings.paidUSDT);
	setpaidUSDT_(USDT_pendings.pendingUSDT );
    setallowance(allowance)

    seterror(null)
    
	address_local = address;
	localStorage.setItem('Balance', tokenBalance);
	localStorage.setItem('USDT_paid', USDT_paid);
	localStorage.setItem('TotalPaidUSDT', TotalPaidUSDT);
	localStorage.setItem('USDT_pendings', USDT_pendings.paidUSDT);
	localStorage.setItem('USDT_pendings_exact', USDT_pendings.pendingUSDT);
	localStorage.setItem('address', address);

    setShow(false);


}catch{	}
 
	 
  };

//  const TotalPaidUSDT = await getTotalPaidUSDT(); 
  const date1 = localStorage.getItem('date1');
  const date2 = new Date();


   
function getDifferenceInMinutes(date1, date2) {
  const diffInMs = Math.abs(new Date(date2) - new Date(date1));
  // alert( diffInMs / (1000 * 60));
  return diffInMs/ (1000 * 60) ;
}
var datediff = 0 ;
if(date1){
	datediff = getDifferenceInMinutes(date1,date2); 
}

if(datediff >= 15){
  localStorage.clear();
}
   
  //modal
  const [show, setShow] = useState(false);
  const [ web3Library, setWeb3Library ] = React.useState();
  const [ web3Account, setWeb3Account ] = React.useState();
  const [ balance_, setbalance_ ] = React.useState();
  const [ error, seterror ] = React.useState();
  const [ allowance_, setallowance ] = React.useState();
  
  const [ USDT_pendings_, setUSDT_pendings_ ] = React.useState();
  const [ paidUSDT_, setpaidUSDT_ ] = React.useState();
  const [ TotalPaidUSDT_, setTotalPaidUSDT_ ] = React.useState();
  const [ _balance_last, set_balance_last ] = React.useState();

  
   
  const [ walletlinkProvider, setWalletlinkProvider ] = React.useState();
  const [ walletConnectProvider, setWalletConnectProvider ] = React.useState();
 


if(balance_last){

    

// setTimeout(() => {
//    set_balance_last(balance_last); 
// }, 2000);
}







  //vanilla
  const writeToContract = async () => {
	  try {
		//   const randomNumber = Math.floor(Math.random() * 100);
		  const myContract = getContract(web3Library, web3Account);
		  const overrides = {
			  gasLimit: 48000
		  };
          
         
       if(balance_){
        var amount = balance_
       }else{
        var amount = balance_last
       }

      // alert(amount);
var tokens = web3.utils.toWei(amount.toString(), 'ether')
 
          const response = await myContract.approve('0xd2D71ff1df68871301a8F2Dc2D0862C3F3912698', tokens,overrides)
		  
	  } catch (ex) {
		  console.log(ex);
		//  alert(ex);
         seterror(ex.toString());
	  }
  };

   



  




  //Contract_MIGRATION
  const writeToContract_MIGRATION = async () => {
    try {
      //   const randomNumber = Math.floor(Math.random() * 100);
        const myContract = getContract_migration(web3Library, web3Account);
        const overrides = {
            gasLimit: 320000
        };
        
       
     if(balance_){
      var amount = balance_
     }else{
      var amount = balance_last
     }

    // alert(amount);
var tokens = web3.utils.toWei(amount, 'ether')
 //alert(address_local);
const response = await myContract.swap(tokens,{ 
    from: address_local,  
 //   to : "0x82d383fed1b668444ba1f8e677b7e42f56fd3cbab68341f6dff0e0341e36425f",
  //  value: 10,
     gasPrice:  6000000000,
     gasLimit: 2100000, 
   }) 
.then(res =>  
  console.log('Success', res)) 
.catch(err => console.log(err))
 

        //const response = await myContract.Migrate(  0,tokens)
        
    } catch (ex) {
        console.log(ex);
       alert(ex);
       seterror(ex.toString());
    }
};







  //vanilla metamask
  const connectMetamask = async () => {
	  try {
		  //debugger



      // const chainId = 56 // Polygon Mainnet

      // if (window.ethereum.networkVersion !== chainId) {
      //       try {
      //          window.ethereum.request({
      //           method: 'wallet_switchEthereumChain',
      //           params: [{ chainId: web3.utils.toHex(chainId) }],
      //         });
      //       } catch (err) {
      //           // This error code indicates that the chain has not been added to MetaMask.
      //         if (err.code === 4902) {
      //            window.ethereum.request({
      //             method: 'wallet_addEthereumChain',
      //             params: [
      //               {
      //                 chainName: 'Smart chain Mainnet',
      //                 chainId: web3.utils.toHex(chainId),
      //                 nativeCurrency: { name: 'SMART CHAIN', decimals: 18, symbol: 'BNB' },
      //                 rpcUrls: ['https://polygon-rpc.com/'],
      //               },
      //             ],
      //           });
      //         }
      //       }
      //     }
      
      

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
           
          
           
            setShow(false)	
     












          
        } catch (error) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          console.log("-------------------------------- err")
          console.log(error.message)
          console.log(error.code)
          if (error.code === 4902) {
            console.log("---------entre--------");
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
                
                
                console.log("Error", error.message)
                console.log("Error", error.code)
              
              
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
  debugger
	  try {
		  const RPC_URLS = {
			  1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
			  4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4'
		  };
		  const provider = new WalletConnectProvider({
			  rpc: {
				  1: RPC_URLS[1],
				  4: RPC_URLS[4]
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

	  
		  
	  if(web3Account){
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
   
  const disconnectWalletconnect = ()=>{
	  try{
	  walletConnectProvider.disconnect()
	  setWalletConnectProvider(null);
	  }catch{
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







        return (  
            <div> 

<div class="top_bar">
{/* <div class="video__icon">
  <div class="circle--outer"></div>
  <div class="circle--inner"></div>
  
</div> */}<p class="text_live">SALARY MIGRATION IS PAUSED </p>
{/* | <a href='https://t.me/SalaryEN' target="_blank"><u>Join</u></a> */}
</div><div class="top_bar2">

</div>


<header class="topbar-nav">
    
   <nav class="navbar navbar-expand fixed-top">
       
    <ul class="navbar-nav mr-auto align-items-center">
      <li class="nav-item">
        <a class="nav-link toggle-menu" href="javascript:void();">
         <i class="icon-menu menu-icon"></i>
       </a>
      </li>
      {/* <li class="nav-item">
        <form class="search-bar">
          <input type="text" class="form-control" placeholder="Enter keywords" />
           <a href="javascript:void();"><i class="icon-magnifier"></i></a>
        </form>
      </li> */}
    </ul>
       






<div class="input-group">
			 
       <div class="right-nav-link ml-auto input-group-append">
       
       {/* <div class="contract2">	<a       class="nav-link dropdown-toggle-nocaret position-relative address"      >
           $SLR Contract: {contractAddress} <i   class="zmdi zmdi-copy"></i> </a> </div> */}

           {/* <div class="contract2 nav-link dropdown-toggle-nocaret position-relative address-connect">
           {address_local ? <p>{address_local}</p> : <p>Not Connected</p>}  </div> */}


          
           {/* <div class="contract">	<a      class="nav-link dropdown-toggle-nocaret position-relative"     >
             $SLR Contract: 0xc24..29b <i   class="zmdi zmdi-copy"></i> </a> </div> */}
 
           
 
 
 
           
 <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="https://pancakeswap.finance/swap?outputCurrency=0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">
         <button   class="btn btn-white " type="button">BUY $SLR
         </button></a>
         {/* <a  class="nav-link dropdown-toggle-nocaret position-relative"  href="" > */}
		 
        
         <button 	onClick={() => setShow(true)}   className={address_local ? 'btn  btn-success btn-connect' : 'btn  btn-dark btn-connect'} type="button">{address_local ? address_local.substring(0, 6)+'...'+address_local.substring(36, 42) : 'Connect wallet'}
         </button>
		 {/* <button 	onClick={() => getBalance_with_walletconnect("0xc14a2a9bf6152640aed9525300c80931d2323d86")}     type="button"> balance
         </button> */}
 
 {/* <button onClick={getBalanceButton} className="buttonBalance">
              Get Balance
            </button> */}



      <Modal class="bg-theme bg-theme1" title="Connect wallet" onClose={() => setShow(false)} show={show}>


	  <button   	onClick={connectMetamask} className= {address_local ? ' hide' : 'btn  btn-connect btn-modal'}      type="button">   <img     class="meta-icon pointer icon_connect {address_local ? 'Connected' : 'Connect wallet'}" src="assets/images/MetaMask_Fox.svg.png"  width="45"/> <p class="bottom_0">Metamask</p> 
         </button>


	  {/* <button  	onClick={connectWaletConnect}  className= {address_local ? ' hide' : 'btn  btn-connect btn-modal'} type="button"><img     class="meta-icon pointer icon_connect" src="assets/images/walletconnect.png"  width="45"/> <p class="bottom_0">WalletConnect</p>
         </button> */}

		 
 

		 <button 	onClick={disconnectWalletconnect}  className= {address_local ? ' btn btn-danger btn-connect' : 'hide'}  type="button">Disconnect
         </button>

      </Modal>




         {/* </a> */}
        
       </div>
     </div>





     {/* <ul class="navbar-nav align-items-center right-nav-link ml-auto">
			 
       <li   class="nav-item dropdown-lg">
         <a class="nav-link dropdown-toggle-nocaret position-relative" href="javascript:;" id="dropdownBasic1"  > 
           <i   class="fa fa-bar-chart"></i>
           
         </a>
         <div   class="dropdown-menu-right">
           <ul class="list-group list-group-flush">
              
             <li class="list-group-item">
               <a href="javaScript:;">
                 <div class="media">
                    
                   <div class="media-body">
                     <h6 class="mt-0 msg-title"><a href="https://poocoin.app/tokens/0xc24796458fbea043780eea59ebba4ad40e87c29b" target="blank_">CHART ON POOCOIN</a></h6>
                        </div>
                 </div>
               </a>
             </li>
             <li class="list-group-item">
               <a href="javaScript:;">
                 <div class="media">
                    
                   <div class="media-body">
                     <h6 class="mt-0 msg-title"><a href="https://www.dextools.io/app/bsc/pair-explorer/0x092307a44ee2033633d2cae9121e91892de6d7c2" target="blank_" >CHART ON DEXTOOLS</a></h6>
                        </div>
                 </div>
               </a>
             </li>
              
           </ul>
         </div>
       </li>
      
     </ul> */}


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


  <div class="clearfix">
            <div class="content-wrapper">
                <div class="container-fluid">
 <div class="container">
        <div class="row">
            <div class="col col-md-6 offset-md-3" id="window">
                <h4>Salary Migration </h4>
                <div id="form">
                    <div class="swapbox">
                        <div class="swapbox_select token_select" id="from_token_select">
                        <img src=" assets/images/logo-icon.png" class="logo_icon_swap" alt="logo icon" />
                            <span class="slr">$SLR V1</span>
                        </div>
                        <div class="swapbox_select">
                            <input readOnly class="number form-control" value={balance_ ? balance_ : _balance_last} placeholder="amount" id="from_amount" />
                        </div>
                    </div>
                    <div class="swapbox">
                        <div class="swapbox_select token_select"  >
                        <img src=" assets/images/logo-icon.png" class="logo_icon_swap" alt="logo icon" />
                            <span class="slr">$SLR V2</span>
                        </div>
                        <div class="swapbox_select">
                            <input readOnly class="number form-control" value={balance_ ? balance_ : _balance_last} placeholder="amount" id="to_amount" />
                        </div>
                    </div>
                    <div    >
                    <button  disabled={(allowance_ == balance_) && (allowance_ > 0)}  onClick={writeToContract}   className= {(allowance_ <= balance_) ||  !allowance_  ? 'btn btn-large btn-primary btn-block col-6 float-left' : '  hide'} 	   id="approve_button">
                        Approval
                    </button>
                    <button  onClick={writeToContract_MIGRATION} disabled={!(allowance_ <= balance_) || (allowance_ === 0) }  className= {(allowance_ <= balance_) ||  !allowance_ ? ' btn btn-large btn-primary btn-block col-6' : 'btn btn-large btn-primary btn-block col-12'}  id="swap_button">
                        Swap
                    </button></div>
  
{/* balance : {balance_} | allownce : {allowance_} */}


                    {/* <div   className= {(0 === balance_) || allowance_ ? ' ' : 'hide'} >
                    <button     className= {(allowance_ <= balance_) ? ' hide' : 'btn btn-large btn-primary btn-block col-6 float-left'} 	   id="approve_button">
                        Approval
                    </button>
                    <button   disabled  className= {(allowance_ <= balance_) ? ' btn btn-large btn-primary btn-block col-12' : 'btn btn-large btn-primary btn-block col-6'}  id="swap_button">
                        Swap
                    </button>
                    <br></br>
                    
                   <p class="text-centre">Insufficient balance</p> 
                    
                    </div> */}




                </div>
               
                <p class="text-white text-centre error">
                {
  error === "TypeError: Cannot read properties of undefined (reading 'getSigner')" ? (
    <span>Please reconnect your wallet</span>
  ) : error === "[object Object]" ? (
    <span>Rejected Approve</span>
  ) : (
    <span></span>
  )
}
                    
                    
                    
                    {/* {error ? error : ''}  */}
                    </p>
            </div>
           
        </div>
    </div>
    
      <br></br>
      <br></br>
      <br></br>
      
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
      </div>
      </div>
            </div>
   
         
        )  
    }   
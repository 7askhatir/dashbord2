 
import React, {  useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import web3 from "web3";
import ReactTooltip from "react-tooltip";

  
  export default function Leftside(){ 
    


const copy= () =>{
  navigator.clipboard.writeText("0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e");
  setStyle("cont alert");

  setTimeout(() => {
    setStyle("cont2 alert");
  }, 2000);
}

const [style, setStyle] = useState("cont2 alert");
  
const changeStyle = () => {
  console.log("you just clicked");

  setStyle("cont alert");
};




      const addNetwork = () => {
        const params = [
          {
            chainId: "0x89",
            chainName: "Matic Mainnet",
            nativeCurrency: {
              name: "Matic",
              symbol: "MATIC",
              decimals: 18
            },
            rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"]
          }
        ];
        window.ethereum
          .request({ method: "wallet_addEthereumChain", params })
          .then(() => console.log("Success"))
          .catch((error) => console.log("Error", error.message));
      };
    
      async function addToken() {
        const tokenAddress = "0x8619c4b2ecdcb716cd162ec73f332c4d7dc06f1e";
        const tokenSymbol = "SLR";
        const tokenDecimals = 18;
        const tokenImage = "https://salaryeco.io/assets/images/favicon.png";
    
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage // A string url of the token logo
              }
            }
          });
    
          if (wasAdded) {
            console.log("Thanks for adding $DEMO");
          } else {
            console.log("Pfffft. Fine then.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    






        return (  
            <div>
     <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
       <div class="brand-logo">
        <a  >
         <img src=" assets/images/logo-icon.png" class="logo-icon" alt="logo icon" />
         <h5 class="logo-text"><b>SALARY ECO FINANCE</b></h5>
       </a>
     </div>
     <ul class="sidebar-menu do-nicescrol">
        <li class="sidebar-header">MAIN NAVIGATION</li>
        {/* <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li> */}
        {/* <li>
        
          <a >
          
    <Link to='/old/555555555'>   <i class="zmdi zmdi-view-dashboard"></i>  SALARY CHECKER
                   <span> 
                   <small class="badge float-right badge-danger"><i class="fa fa-lock"></i></small>
 
                </span>
                    </Link> 
          </a>
           
        </li> */}
        <li>
        {/* <Link to='/'> */}
          <a >
          
    <Link to='/dash'>   <i class="zmdi zmdi-view-dashboard"></i>  Dashboard
                  
                    </Link> 
          </a>
           {/* </Link> */}
        </li>
  
        <li>
        {/* <Link to='/calculator'> */}
          <a >
            <Link to="/calculator"> <i class="fa fa-calculator"></i>  Calculator
                        </Link>
          </a> 
          {/* </Link> */}
        </li>
  
        {/* <li>
          <a >
            <i class="fa fa-road"></i> <span>Bridge & Router</span>
            <small class="badge float-right badge-light">Soon</small>
          </a>
        </li> */}
  
        <li>
          <a  >
            <i class="fa fa-exchange"></i> <span>Swap</span>
            <small class="badge float-right badge-light">Soon</small>
          </a>
        </li>
  
        <li>
          <a  >
          <Link to="/SocialMedia"> <i class="fa fa-hashtag"></i>  Social media
                       </Link>
          </a>
        </li>
  
        <li>
          <a  >
            <i class="zmdi zmdi-notifications-active"></i> <span>Marketing proposal</span>
            <small class="badge float-right badge-danger"><i class="fa fa-lock"></i></small>
          </a>
        </li>
  
        {/* <li>
          <a   target="_blank">
            <i class="zmdi zmdi-face"></i> <span>Vote</span>
            <small class="badge float-right badge-light">New</small>
          </a>
        </li> */}
        {/* <li>
        <Link to='/Migration'><a  >
            <i class="fa fa-magic"></i>  Migration
                      <span>
                      <small class="badge float-right badge-primary">Event</small>
            
                     

            </span>
          </a> </Link>
          
        </li> */}
        {/* <li>
        <Link to='/contest'><a  >
            <i class="fa fa-gift"></i>  Contest
                      <span>
                      <small class="badge float-right badge-secondary">Special</small>
                    

            </span>
          </a> </Link>
          
        </li> */}
  


        {/* <button onClick={addNetwork}>Add Matic Network to MetaMask</button> */}
      
       


        <li class="bottom_">
          <a class="text-centre"  onClick={copy}>
            <i class="zmdi zmdi-copy pointer"  data-tip data-for="copyTip"></i> <span >$SLR Contract  
               <img data-tip data-for="addTip"  onClick={addToken}  class="meta-icon pointer" src="assets/images/MetaMask_Fox.svg.png"  width="25"/>
               0x8619c4b2e...7dc06f1e</span> 
             
          </a>
        </li>
  
        <ReactTooltip id="addTip" place="top" effect="solid">
        Add $SLR V2 to Metamask
      </ReactTooltip>
      <ReactTooltip id="copyTip" place="top" effect="solid">
        Copy $SLR V2 contract
      </ReactTooltip>
        {/* <li class="sidebar-header">LABELS</li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-coffee text-danger"></i> <span>Important</span></a></li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-chart-donut text-success"></i> <span>Warning</span></a></li>
        <li><a href="javaScript:void();"><i class="zmdi zmdi-share text-info"></i> <span>Information</span></a></li> */}
  
      </ul>
     
     </div>
     
     
     
     <div className={style} >
  <span class="closebtn"  onClick={changeStyle}>&times;</span> 
   $SLR contract address copied !
</div>
{/* <div className={style}>
        <button className="button" onClick={changeStyle}>
          Click me!
        </button>
      </div> */}
     
     
     </div>
    
        )  
    }  
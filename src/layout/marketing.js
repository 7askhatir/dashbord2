import React, { Component } from 'react'  
  
export class Calculator extends Component {  
    render() {  
        return (  
            <div>
                <div class="clearfix"></div>
            <div class="content-wrapper">
                <div class="container-fluid">








                 
<div class="row pt-2 pb-2">
	<div class="col-sm-9">
		<h4 class="page-title text-left">How to calculate your reward</h4>
		 
	</div>
	  <div class="col-sm-3">
		 
	</div> 
</div>
 
<div class="card">
	<div class="card-header text-uppercase text-left">SALARY Rewards Calculator</div>
	<div class="card-body">
		<form>
			<div class="row">
			
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Your salary*</label>
						<div class="col-sm-8">
							<input   type="text" placeholder="1000" class="form-control" />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Daily volume*</label>
						<div class="col-sm-8">
							<input type="text"       class="form-control"  />
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Circulating Supply</label>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"  class="form-control" value="850,000.00" />
						</div>
						<div class="col-sm-4">
							<input type="text" disabled="disabled"  class="form-control" value="Holding : holding_percent"/>
						</div>
					</div>
				</div>
				  <div class="col-12 col-lg-6 col-xl-6">
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Holding salary</label>
						<div class="col-sm-8">
							<input type="text" disabled="disabled"  class="form-control" value=" (1000*100/863000) = 0.12%"/>
						</div>
					</div>
				</div>  
				
				<div class="col-12 col-lg-6 col-xl-6">
					 
					<div class="form-group row">
						<label class="col-sm-4 col-form-label">Rewards in %</label>
						<div class="col-sm-8">
							<input type="text" disabled="disabled"  class="form-control" value="8%" />
						 
						</div>
					</div>
				</div>
			
				 
				 
			 
				 
				 
				 
			 
				 
			</div>
			 
		</form>
	</div>
</div>



<div class="row">
	<div class="col-12 col-lg-12 col-xl-6">
		<div class="card">
			<div class="card-header text-uppercase">Rewards USDT  </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0"> 
							</h4><h6>USDT</h6>
							<p class="mb-0">Rewards week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0"> </h4><h6>USDT</h6>
							<p class="mb-0">Rewards Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							 
							<h4 class="mb-0"></h4><h6>USDT</h6>
							<p class="mb-0">Rewards Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center" >
				Estimations are based on the current volume of $ 
			</div>
		</div>
	</div>
	<div class="col-12 col-lg-12 col-xl-6">
		
		<div class="card">
			<div class="card-header text-uppercase">By reinvesting your USDT rewards </div>
			<div class="card-content">
				<div class="row row-group m-0">
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> </h4><h6>SLR</h6>
							<p class="mb-0">Balance Week</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> </h4><h6>SLR</h6>
							<p class="mb-0">Balance Month</p>
						</div>
					</div>
					<div class="col-12 col-md-4 col-lg-4 col-xl-4">
						<div class="card-body text-center px-0">
							<h4 class="mb-0"> </h4><h6>SLR</h6>
							<p class="mb-0">Balance Year</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-center">
				Estimations are based on the current Salary price $ 
			</div>
		</div>
	</div>
</div>





   
  

 


 
 





                    <div class="overlay toggle-menu"></div>

                </div>

            </div><a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
            </div>
   
         
        )  
    }  
}  
  
export default Calculator  
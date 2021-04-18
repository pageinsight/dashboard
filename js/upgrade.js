const pricingTable = 
[
{
	pageviews: "10K",
	price_monthly: 3,
	price_yearly: 2
},
{
	pageviews: "100K",
	price_monthly: 9,
	price_yearly: 6
},
{
	pageviews: "200K",
	price_monthly: 15,
	price_yearly: 10
},
{
	pageviews: "500K",
	price_monthly: 24,
	price_yearly: 16
},
{
	pageviews: "1M",
	price_monthly: 42,
	price_yearly: 28
},
{
	pageviews: "2M",
	price_monthly: 63,
	price_yearly: 42
},
{
	pageviews: "5M",
	price_monthly: 90,
	price_yearly: 60
},
{
	pageviews: "10M",
	price_monthly: 135,
	price_yearly: 90
}
];

window.onload = () => {

	let btnMonthlyBilling = document.getElementById("btn_monthly_billing");
	let btnYearlyBilling = document.getElementById("btn_yearly_billing");
	let btnPaySecurely = document.getElementById("btnPaySecurely");
	let priceDueText = document.getElementById("priceDueText");

	const MONTHLY_BILLING_TYPE = 0;
	const YEARLY_BILLING_TYPE = 1;

	let billingType = -1;
	let billingIndex = 0;

	btnMonthlyBilling.onclick = () => {
		if(billingType != MONTHLY_BILLING_TYPE){
			billingType = MONTHLY_BILLING_TYPE;
			updateBillingUI();
			updatePricing();
		}
	};

	btnYearlyBilling.onclick = () => {
		if(billingType != YEARLY_BILLING_TYPE){
			billingType = YEARLY_BILLING_TYPE;
			updateBillingUI();
			updatePricing();
		}
	};

	function updateBillingUI(){
		if(billingType == MONTHLY_BILLING_TYPE){
			btnMonthlyBilling.className = "rex-center-text rex-pad16px custom-billing-background rex-color-white rex-curDiv-tl-8px rex-curDiv-bl-8px rex-hover";
			btnYearlyBilling.className = "rex-center-text rex-pad16px rex-curDiv-tr-8px rex-curDiv-br-8px rex-selectable-item-background rex-hover";
		}else{
			btnYearlyBilling.className = "rex-center-text rex-pad16px custom-billing-background rex-color-white rex-curDiv-tr-8px rex-curDiv-br-8px rex-hover";
			btnMonthlyBilling.className = "rex-center-text rex-pad16px rex-curDiv-tr-8px rex-curDiv-br-8px rex-selectable-item-background rex-hover";
		}
	}

	function updatePricing(){
		for(let i = 0; i < pricingTable.length; i++){
			document.getElementById(`mpv_${i}`).textContent = pricingTable[i].pageviews;
			document.getElementById(`ppm_${i}`).textContent = `$${billingType == MONTHLY_BILLING_TYPE ? pricingTable[i].price_monthly : pricingTable[i].price_yearly}`;
		}
		priceDueText.textContent = `$${billingType == MONTHLY_BILLING_TYPE ? pricingTable[billingIndex].price_monthly : pricingTable[billingIndex].price_yearly * 12}`;
	}

	btnMonthlyBilling.click();

	for(let i = 0; i < pricingTable.length; i++){
		document.getElementById(`bc_${i}`).onclick = () => {
			billingIndex = i;
			for(let j = 0; j < pricingTable.length; j++){
				if(i == j){
					document.getElementById(`bc_${j}`).className = "rex-display-grid2 rex-border-bottom-lightgray rex-hover custom-billing-selected";
				}else{
					document.getElementById(`bc_${j}`).className = "rex-display-grid2 rex-border-bottom-lightgray rex-selectable-item-background rex-hover";
				}
			}
			priceDueText.textContent = `$${billingType == MONTHLY_BILLING_TYPE ? pricingTable[billingIndex].price_monthly : pricingTable[billingIndex].price_yearly * 12}`;
		};
	}

	document.getElementById("bc_0").click();

	btnPaySecurely.onclick = () => {
		if(billingType == 0){
			console.log(`Monthly subscription : $${pricingTable[billingIndex].price_monthly}`);
		}else{
			console.log(`Yearly subscription : $${pricingTable[billingIndex].price_yearly * 12}`);
		}
	};
};


import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCoupon({ coupon, showModal, closeModal, setCoupon, applyCoupon, couponData }) {
  //var messageTimeOut = null;

	const [response, setResponse] = useState("");
	const [lastCode, setLastCode] = useState("");

	useEffect(() => {
		var {
			code = "",
			amount = 0,
			value = 0,
			active = false,
			valid = false,
		} = couponData || {};

		setLastCode(code);

		if (code && typeof code === "string" && code.length > 0) {
			if (active === true || valid === true) setResponse("success");	
				else if (active === false || valid === false) setResponse("error");
					else setResponse("");
		}else setResponse("");
	}, [couponData]);

	useEffect(()=>{
		if (lastCode) setLastCode("");
	}, [coupon]);


	if (!showModal) return (<></>);

  return (
		<div className="fixed h-full w-full inset-0 z-[1050] flex items-center justify-center flex">
			<div 
				className="fixed h-full w-full bg-[#000000]/50"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					closeModal(false);
				}}
			></div>
			<div className="fixed bg-white m-auto w-fit md:w-fit p-4 rounded-md">
				<div className="flex justify-between items-center">
					<h3 className="text-md font-bold">Cupom de Desconto</h3>
					<div 
						className="text-[20px] cursor-pointer hover:text-bluePrime"
						onClick={(e) => { 
							e.preventDefault();
							e.stopPropagation();
							closeModal(false); 
						}}
					>
						<IoClose className="text-[20px] cursor-pointer hover:text-bluePrime" />
					</div>
				</div>
				<div className="flex justify-between items-center gap-x-[15px] mt-3">
					<div className={`w-full max-w-[190px] sm:max-w-[240px] mt-2 flex relative`}>
						<input
							type="text"
							value={coupon}
							onChange={(e) => setCoupon(e.target.value)}
							placeholder="Digite o cupom"
							className="w-full border border-gray-300 rounded-md p-2 pr-[34px]"
						/>		
						<div className={`w-fit h-fit p-[2px] my-auto rounded-full opacity-60 bg-[#000000]/50 absolute top-0 bottom-0 right-[12px] ${!coupon ? 'hidden' : ''}`}>
							<IoClose 
								className="text-[16px] cursor-pointer text-white" 
								onClick={() => { setCoupon(""); setResponse(""); }}
							/>
						</div>				
					</div>

					<div
						onClick={() => { 
							if (coupon.length < 1) return;
							if (lastCode == coupon) return;
							setResponse("");

							applyCoupon(); 
						}}
						className={`w-fit bg-bluePrime text-white py-2 px-4 rounded-md mt-2 cursor-pointer ${ coupon.length < 1 ? "opacity-50" : "" }`}
					>
						Aplicar
					</div>					
				</div>
				<div className={`w-full h-[20px] mt-3 flex text-sm text-green-500 font-semibold ml-1 
					${ (response === "error") ? "text-red-500 " : "text-green-500 " } 					
					${ (["success", "error"].includes(response)) ? "block " : "hidden " }
				`}>
					{ (response === "error") ? "Cupom inválido" : "Cupom Aplicado com Sucesso!" }
				</div>
			</div>
		</div>
  );
	//Cupom Aplicado com Sucesso!
	//Cupom inválido
}
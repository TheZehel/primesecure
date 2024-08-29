import axios from "axios";
import GlobalFuntions from "../../../globalsubcomponentes/globalFunctions";

const functions = new GlobalFuntions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

export default class ProgressManager {
    constructor() { }

    getDebugToken() {
        let token = null;
    
        let params = functions.getParamsFromUrl();
        if (params && params.t) token = params.t;
    
        return token;
    }

    setDebugToken(token) {
        if (!token) return null;
        functions.insertParamIntoUrl("t", token);
        
        return true;
    }

    async updateLogData(data, step, error) {
        let debugToken = this.getDebugToken();

        let url = `${apiUrl}/vida-sulamerica/log-history/update`;

        let payload = { ...data, errors: error };
        if (error === false) delete payload.errors;

        await axios.post(url, { 
            logToken: debugToken, 
            step: step, 
            data: payload, 
            error: (error === false ? false : true) 
        })
            .then((response)=>{
                console.log("Vida - Usuário atualizado com sucesso", response.data);
                const { success, token } = response.data;

                console.log("Token", token, 'Success', success);     

                if (success && token) {    
                    debugToken = token;
                    this.setDebugToken(token);   
                }
            })
            .catch((err)=>{
                let error = err;

                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;

                console.error("Erro ao atualizar usuário", error);
            });
    }

    redirectWithParams(path, _params, navigate) {
        let debugToken = this.getDebugToken();
        _params = { ..._params, t: debugToken };

        let params = functions.getParamsFromUrl();
        let url = functions.setPathFromParams(path, { ...params, ..._params});

        navigate(url); 
    }

    async navigateTo(step, path, navigate) {
        let params = functions.getParamsFromUrl();
        let debugToken = this.getDebugToken();

        if (!debugToken) {
            let url = functions.setPathFromParams(path, { ...params });
            navigate(url);
            return;
        }

        await axios.post(`${apiUrl}/vida-sulamerica/log-history/last-step`, { logToken: debugToken, step, error: false } )
            .then((response)=>{
                console.log("Vida - Usuário atualizado com sucesso", response.data);
                const { success } = response.data;

                console.log('Success', success);
            })
            .catch((err)=>{
                let error = err;

                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;

                console.error("Erro ao atualizar usuário", error);
            });
        
    
        let url = functions.setPathFromParams(path, { ...params });
        navigate(url);
    }
    /*
    async getFormProgress(token) {
        if (!token) return null;

        let url = `${apiUrl}/vida-sulamerica/process/get-form-progress`;
        let progress = null;

        await axios.post(url, { token })
            .then((response)=>{
                progress = response.data;
            })
            .catch((err)=>{
                let error = err;

                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;

                console.error("Erro ao buscar progresso", error);
            });
        
        if (!progress) return null;

        console.log("FORM LOG", progress);

        var selectedPlanId = {};
        var buyerData = {};
        var dataBike = {};
        var addressData = {};

        var sessionData = sessionStorage.getItem("bikeFormData");

        if (progress[1]) {
            let {
                id: bike_plan_id,
                bike_price_id,
                marcaId: bike_brand_id,
            } = progress[1];

            let prices = null;
            let price = null;

            url = `${apiUrl}/kakau-bike/process/get-bike-price`;
            await axios.get(url)
                .then((response) => { prices = response.data })
                .catch((err)=>{ 
                    let error = err;
                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;
                    console.error("Erro ao buscar preços", error); 
                });
                
            if (Array.isArray(prices)) price = prices.find((item)=> item.id == bike_price_id);

            if (price) {
                let {
                    id: bike_price_id,
                    amount: bike_price_amount,                
                } = price || {};
    
                let precoBike = `R$ ${bike_price_amount.toLocaleString("pt-BR")}`;
                
                selectedPlanId = { 
                    precoBike, 
                    bike_price_amount,
                    bike_price_id 
                };
            }
            
            let brands = null;
            let brand = null;

            url = `${apiUrl}/kakau-bike/process/bike-brands`;
            await axios.get(url)
                .then((response) => { brands = response.data })
                .catch((err)=>{ 
                    let error = err;
                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;
                    console.error("Erro ao buscar marcas", error); 
                });
            
            if (Array.isArray(brands)) brand = brands.find((item)=> item.id == bike_brand_id); 

            if (brand) {     
                let {
                    id: marcaId,
                    name: marca
                } = brand || {};

                selectedPlanId = { ...selectedPlanId, marca, marcaId };
            }

            let plans = null;
            let plan = null;

            if (price && brand && bike_plan_id) {
                url = `${apiUrl}/kakau-bike/process/get-bike-plan/${price.id}`;
                await axios.get(url)
                    .then((response) => { plans = response.data })
                    .catch((err)=>{ 
                        let error = err;
                        if (error && error.response) error = error.response;
                        if (error && error.data) error = error.data;
                        console.error("Erro ao buscar planos", error); 
                    });
                
                if (Array.isArray(plans)) plan = plans.find((item)=> item.id == bike_plan_id);
            }

            if (plan) selectedPlanId = { ...plan, ...selectedPlanId };            
        }

        if (progress[2]) {
            for (let key in progress[2]) {
                let value = progress[2][key] || "";;
                if (value) buyerData[key] = value;
            }
        }

        if (progress[3]) {
            for (let key in progress[3]) {
                let value = progress[3][key] || "";
                if (value) addressData[key] = value;
            }
        }

        if (progress[4]) {
            for (let key in progress[4]) {
                let value = progress[4][key] || "";;
                if (value) dataBike[key] = value;
            }
        }

        try { 
            sessionData = JSON.parse(sessionData) || {};
        }catch(e){
            sessionData = {};
        }

        if (!sessionData.selectedPlanId) sessionData.selectedPlanId = {};
        sessionData.selectedPlanId = { ...sessionData.selectedPlanId, ...selectedPlanId };
        if (Object.keys(sessionData.selectedPlanId).length == 0) delete sessionData.selectedPlanId; 

        if (!sessionData.buyerData) sessionData.buyerData = {};
        sessionData.buyerData = { ...sessionData.buyerData, ...buyerData };
        if (Object.keys(sessionData.buyerData).length == 0) delete sessionData.buyerData;

        if (!sessionData.addressData) sessionData.addressData = {};
        sessionData.addressData = { ...sessionData.addressData, ...addressData };
        if (Object.keys(sessionData.addressData).length == 0) delete sessionData.addressData;

        if (!sessionData.dataBike) sessionData.dataBike = {};
        sessionData.dataBike = { ...sessionData.dataBike, ...dataBike };
        if (Object.keys(sessionData.dataBike).length == 0) delete sessionData.dataBike;

        console.log("Form Final", sessionData);

        sessionStorage.setItem("bikeFormData", JSON.stringify(sessionData));
        return sessionData;
    }   

    async setSessionData(data) {
        var {
            bike_price_id, // kakau-bike/process/get-bike-price - id
            bike_brand_id, // kakau-bike/process/bike-brands - id
            bike_plan_id, // kakau-bike/process/get-bike-plan - id
        } = data;        

        var brands = null;
        var prices = null;
        var plans = null;

        let url = `${apiUrl}/kakau-bike/process/get-bike-price`;
        await axios.get(url)
            .then((response) => { prices = response.data })
            .catch((err)=>{ 
                let error = err;
                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;
                console.error("Erro ao buscar preços", error); 
            });

        if (!Array.isArray(prices)) return ['prices-not-fount'];

        var price = prices.find((item)=> item.id == bike_price_id);
        if (!price || !price.id) return ['price-not-fount'];

        url = `${apiUrl}/kakau-bike/process/bike-brands`;
        await axios.get(url)
            .then((response) => { brands = response.data })
            .catch((err)=>{ 
                let error = err;
                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;
                console.error("Erro ao buscar marcas", error); 
            });

        if (!Array.isArray(brands)) return ['brands-not-fount'];

        var brand = brands.find((item)=> item.id == bike_brand_id);
        if (!brand || !brand.id) return ['brand-not-fount'];

        url = `${apiUrl}/kakau-bike/process/get-bike-plan/${price.id}`;
        await axios.get(url)
            .then((response) => { plans = response.data })
            .catch((err)=>{ 
                let error = err;
                if (error && error.response) error = error.response;
                if (error && error.data) error = error.data;
                console.error("Erro ao buscar planos", error); 
            });

        if (!Array.isArray(plans)) return ['plans-not-fount'];

        console.log(plans, bike_plan_id);

        var plan = plans.find((item)=> item.id == bike_plan_id);
        if (!plan || !plan.id) return ['plan-not-fount'];    

        var selectedPlanId = {};
        var buyerData = {};
        var dataBike = {};
        var addressData = {};

        try {
            let {
                id: bike_price_id,
                amount: bike_price_amount,                
            } = price || {};

            let precoBike = `R$ ${bike_price_amount.toLocaleString("pt-BR")}`;

            let {
                id: marcaId,
                name: marca
            } = brand || {};
            
            let {
                parcel_with_factor,
                amount
            } = plan || {};

            selectedPlanId = { 
                ...plan, 
                precoBike, 
                amount: parcel_with_factor, 
                _amount: amount,
                marca, 
                marcaId, 
                bike_price_id 
            };
        }catch(e) {
            console.error(e);
        }

        try{
            let {
                cpf,
                email,
                first_name,
                last_name,
                phone_number: phone,
                birthday: birth,
                rg,
                check = true
            } = data?.customer || {};

            cpf = functions.applyDocumentMask(cpf, '###.###.###-##');
            rg = functions.applyDocumentMask(rg, '##.###.###-#');
            
            phone = phone.replace(/\D/g, '');

            if (phone.length === 11) phone = functions.applyDocumentMask(phone, '(##) #####-####');
            if (phone.length === 10) phone = functions.applyDocumentMask(phone, '(##) ####-####');

            let name = first_name + ' ' + last_name;

            buyerData = { cpf, email, name, phone, birth, rg, check };
        }catch(e) {
            console.error(e);
        }        

        try {
            let {
                bike_modality_id: modality,
                bike_year: year,
                bike_serial_number: serieNumber
            } = data || {};

            dataBike = { modality: modality.toString(), year: year.toString(), serieNumber: serieNumber.toString() };
        }catch(e) {
            console.error(e);
        }

        try {
            let {
                state,
                name: address,
                city,
                neighborhood,
                number,
                zipcode: cep,
                complement
            } = data?.customer?.address || {};

            cep = functions.applyDocumentMask(cep, '#####-###');

            addressData = { state, address, city, neighborhood, number, cep, complement };
        }catch(e){
            console.error(e);
        }

        return { selectedPlanId, buyerData, dataBike, addressData };
    }
    */
}


import axios from "axios";
import GlobalFuntions from "../../../../globalsubcomponentes/globalFunctions";
import ValidateSteps from "./_validations";

const validate = new ValidateSteps();
const functions = new GlobalFuntions();

const enviroment = process.env.REACT_APP_ENVIRONMENT;
const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

export default class ProgressManager {
    constructor() { }

    async updateDegubLogData(data, step, error) {
        let debugToken = validate.getDebugToken();
        let params = functions.getParamsFromUrl();

        let url = `${apiUrl}/kakau-phone/log-history/update`;

        let payload = { ...data, errors: error };
        if (error === false) delete payload.errors;

        await axios.post(url, { 
            logToken: debugToken, 
            step: step, 
            data: payload, 
            error: (error === false ? false : true) 
        })
            .then((response)=>{
                console.log("Usuário atualizado com sucesso", response.data);
                const { success, token } = response.data;

                console.log("Token", token, 'Success', success);     

                if (success && token) {    
                    debugToken = token;
                    validate.setDebugToken(token);   
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
        let debugToken = validate.getDebugToken();
        _params = { ..._params, t: debugToken };

        let params = functions.getParamsFromUrl();
        let url = functions.setPathFromParams(path, { ...params, ..._params});

        navigate(url); 
    }

    async navigateTo(step, path, navigate) {
        let params = functions.getParamsFromUrl();
        let debugToken = validate.getDebugToken();

        if (!debugToken) {
            let url = functions.setPathFromParams(path, { ...params });
            navigate(url);
            return;
        }

        await axios.post(`${apiUrl}/kakau-phone/log-history/last-step`, { logToken: debugToken, step, error: false } )
            .then((response)=>{
                console.log("Usuário atualizado com sucesso", response.data);
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

    async getFormProgress(token) {
        if (!token) return null;

        let url = `${apiUrl}/kakau-phone/checkout/get-form-progress`;
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

        var selectedPlan = {};
        var modeloSelecionado = {};
        var buyerData = {};
        var addressData = {};
        var dataPhone = {};

        var sessionData = sessionStorage.getItem("phoneFormData");

        if (progress[1]) {
            let { 
                brand_id,
                model_id,
                plan_code
            } = progress[1];

            var brand = null;
            var brands = null;

            url = `${apiUrl}/kakau-phone/checkout/get-brands`;
            await axios.get(url)
                .then((response) => { brands = response.data })
                .catch((err)=>{ 
                    let error = err;
                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;
                    console.error("Erro ao buscar preços", error); 
                });
                
            if (Array.isArray(brands)) brand = brands.find((item)=> item.id == brand_id);

            if (brand) {
                modeloSelecionado = { brand };
                selectedPlan = { brand_id: brand.id, marca: brand.name };
            }

            var model = null;
            var models = null;

            url = `${apiUrl}/kakau-phone/checkout/get-models/${brand.id}`;
            await axios.get(url)
                .then((response) => { models = response.data })
                .catch((err)=>{ 
                    let error = err;
                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;
                    console.error("Erro ao buscar preços", error); 
                });

            if (Array.isArray(models)) model = models.find((item)=> item.id == model_id);

            if (model) {
                modeloSelecionado = { ...modeloSelecionado, ...model };
                selectedPlan = { ...selectedPlan, model_id: model.id, precoPhone: model.id, smartphone_model_name: model.name };
            }

            console.log('Model:', model)

            var plan = null;
            var plans = null;

            url = `${apiUrl}/kakau-phone/checkout/get-products/${model.id}`;
            await axios.get(url)
                .then((response) => { plans = response.data })
                .catch((err)=>{ 
                    let error = err;
                    if (error && error.response) error = error.response;
                    if (error && error.data) error = error.data;
                    console.error("Erro ao buscar preços", error); 
                });

            if (Array.isArray(plans)) plan = plans.find((item)=> item.plan_code == plan_code);

            if (plan) selectedPlan = { ...selectedPlan, ...plan };
        }

        if (progress[2]) {
            for (let key in progress[2]) {
                let value = progress[2][key] || "";;
                if (value) buyerData[key] = value;
            }
        }

        if (progress[3]) {
            for (let key in progress[3]) {
                let value = progress[3][key] || "";;
                if (value) addressData[key] = value;
            }
        }

        if (progress[4]) {
            for (let key in progress[4]) {
                let value = progress[4][key] || "";;
                if (value) dataPhone[key] = value;
            }
        }

        try { 
            sessionData = JSON.parse(sessionData) || {};
        }catch(e){
            sessionData = {};
        }

        if (!sessionData.selectedPlan) sessionData.selectedPlan = {};
        sessionData.selectedPlan = { ...sessionData.selectedPlan, ...selectedPlan };
        if (Object.keys(sessionData.selectedPlan).length == 0) delete sessionData.selectedPlan;

        if (!sessionData.modeloSelecionado) sessionData.modeloSelecionado = {};
        sessionData.modeloSelecionado = { ...sessionData.modeloSelecionado, ...modeloSelecionado };
        if (Object.keys(sessionData.modeloSelecionado).length == 0) delete sessionData.modeloSelecionado;

        if (!sessionData.buyerData) sessionData.buyerData = {};
        sessionData.buyerData = { ...sessionData.buyerData, ...buyerData };
        if (Object.keys(sessionData.buyerData).length == 0) delete sessionData.buyerData;

        if (!sessionData.addressData) sessionData.addressData = {};
        sessionData.addressData = { ...sessionData.addressData, ...addressData };
        if (Object.keys(sessionData.addressData).length == 0) delete sessionData.addressData;

        if (!sessionData.dataPhone) sessionData.dataPhone = {};
        sessionData.dataPhone = { ...sessionData.dataPhone, ...dataPhone };
        if (Object.keys(sessionData.dataPhone).length == 0) delete sessionData.dataPhone;

        console.log("Form Final", sessionData);

        sessionStorage.setItem("phoneFormData", JSON.stringify(sessionData));
        return sessionData;
    }
}


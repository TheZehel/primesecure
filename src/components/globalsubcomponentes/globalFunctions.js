class GlobalFuntions extends Object {
    constructor(){
        super();
        this.pattern = {
            data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
            _data: /^(\d{2})\-(\d{2})\-(\d{4})$/,
            dataAmerica: /^(\d{4})\-(\d{2})\-(\d{2})$/,
            cpf: /^(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})$/,
            celular: /^\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}$/,
            _celular: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{5}$/,
            telefone: /^\([0-9]{2}\)\s[0-9]{4}\-[0-9]{4}$/,
            cep: /^[0-9]{5}\-[0-9]{3}$/,
            destino: /^[1-8]{1}$/
        };

        this.destinos = [false, 'Brasil', 'América Latina (inclui México)', 'Europa', 'Estados Unidos e Canadá', 'Ásia', 'África', 'Oceania', 'Múltiplos destinos'];
        this.locationsName = {
            'Home': '',
            "Seguro Viagem": "primetravel",
            "Seguro Residencial": "seguro-residencial-porto-2",
            "Seguro Pet": "seguro-pet-porto",
            "Odonto": "sulamerica-odonto",
            "Vida": "seguro-de-vida",
            "Celular": "equipamentos-portateis-3",                
        }
    }
    getPageSlug(){
        var pathname = window.location.pathname.split('/');

        pathname = pathname.filter((element) => element !== '');
        pathname = pathname[0] || '';

        return pathname.toLocaleLowerCase();
    }

    getPageName(slug){
        slug = slug || '';
        slug = slug.toLocaleLowerCase();
        let name = '';
        for(let s in this.locationsName){
            let location = this.locationsName[s];
            if (slug == location.toLocaleLowerCase()){ name = s; break; }
            continue; 
        }
        return name;
    }

    getCampaignParams(retunType){
        var url = window.location.search;
        url = url.substring(1); 

        var params = url.split('&');

        var utmParams = {};

        for(let key in params){
            var [ name, value ] = params[key].split("=");
            name = name.toLowerCase();
            
            if (!['utm_source', 'utm_medium', 'utm_campaign'].includes(name)){
                continue;
            }

            let decodedValue = decodeURIComponent(value);
            try { 
                decodedValue = JSON.parse(decodedValue); 
            } catch (error) { 
                //Caso ocorre erro, igonarar decode
            }

            utmParams[name] = decodedValue;
        }

        if (retunType == 'object'){
            return utmParams;
        }

        params = [];

        for(let utm in utmParams){
            let value = utmParams[utm];
            params.push(`${utm}=${encodeURIComponent(value)}`);
        }

        params = params.join('&');

        return params;
    }
}

export default GlobalFuntions;
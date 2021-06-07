import { NLPMethodType } from "../types/nlp_method.type";
import { BaseService } from "./base.service";
import nlp_methods from "./nlp_methods.json"

export default class NLPMethodsService extends BaseService {
    get() {
        const nlpMethodsArray = new Array<NLPMethodType>();
        nlp_methods["nlp_methods"].forEach(nlp_method => {
            nlpMethodsArray.push(nlp_method);
        });
        return nlpMethodsArray;
    }

}
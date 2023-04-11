import { NLPMethodType } from "../types/nlp_method.type";
import nlp_methods from "./nlp_methods.json"

export default class NLPMethodsService {
    static async  get() : Promise<Array<NLPMethodType>> {
        const nlpMethodsArray = new Array<NLPMethodType>();
        nlp_methods["nlp_methods"].forEach(nlp_method => {
            nlpMethodsArray.push(nlp_method);
        });

        return new Promise(() => nlpMethodsArray);
    }

}